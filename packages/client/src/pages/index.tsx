import type { HeadFC, PageProps } from "gatsby";
import React, { FunctionComponent, useCallback } from "react";
import { io } from "socket.io-client";

export const Head: HeadFC = () => <title>Borg Plays - Home</title>;

const Connector: FunctionComponent = () => {
  const connect = useCallback(() => {
    io("http://localhost:8001/");
  }, []);
  return <button onClick={connect}>Connect</button>;
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
