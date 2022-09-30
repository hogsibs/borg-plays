import type { HeadFC, PageProps } from "gatsby";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { playBeeps } from "../modules/playBeeps";

export const Head: HeadFC = () => <title>Borg Plays - Home</title>;

const Connector: FunctionComponent = () => {
  const [isConnected, setIsConnected] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D>();
  useEffect(() => {
    if (!canvasContext && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (!context) {
        throw new Error("Could not resolve context from canvas");
      }
      setCanvasContext(context);
    }
  }, []);

  const [audioContext] = useState(new AudioContext());

  const connect = useCallback(() => {
    setIsConnected(true);
    const socket = io("http://localhost:8001/");
    playBeeps(socket, audioContext);
  }, []);
  return isConnected ? (
    <>
      <canvas
        ref={canvasRef}
        width={64}
        height={32}
        style={{
          border: "10px ridge gray",
          boxSizing: "border-box",
          imageRendering: "pixelated",
          width: "40em",
        }}
      />
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
