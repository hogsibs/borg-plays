import type { HeadFC, PageProps } from "gatsby";
import React, {
  Children,
  FunctionComponent,
  useCallback,
  useReducer,
  useState,
} from "react";
import { io } from "socket.io-client";

export const Head: HeadFC = () => <title>Borg Plays - Home</title>;

const Connector: FunctionComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, addMessage] = useReducer(
    (messages: string[], message: string) => [...messages, message],
    []
  );
  const connect = useCallback(() => {
    setIsConnected(true);
    const socket = io("http://localhost:8001/");
    socket.on("message", (message) => addMessage(message));
  }, []);
  return isConnected ? (
    <>
      {Children.map(messages, (message) => (
        <p>{message}</p>
      ))}
    </>
  ) : (
    <button onClick={connect}>Connect</button>
  );
};

const IndexPage: FunctionComponent<PageProps> = () => {
  return (
    <main>
      <h1>Borg Plays</h1>
      <section>
        <p>Game will display here.</p>
        <Connector />
      </section>
    </main>
  );
};

export default IndexPage;
