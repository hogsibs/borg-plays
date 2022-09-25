import type { HeadFC, PageProps } from "gatsby";
import React, {
  Children,
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

export const Head: HeadFC = () => <title>Borg Plays - Home</title>;

const Connector: FunctionComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D>();
  useEffect(() => {
    if (!canvasContext && canvasRef.current) {
      setCanvasContext(canvasRef.current.getContext("2d")!);
    }
  }, []);
  const connect = useCallback(() => {
    setIsConnected(true);
    const socket = io("http://localhost:8001/");
    socket.on("frame", (data: ArrayBuffer) => {
      console.log(data);
      canvasContext?.putImageData(
        new ImageData(new Uint8ClampedArray(data), 160, 144),
        0,
        0
      );
    });
  }, []);
  return isConnected ? (
    <>
      <canvas ref={canvasRef} width={160} height={144} />
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
