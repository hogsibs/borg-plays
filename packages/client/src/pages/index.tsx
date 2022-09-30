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

  const [audioContext] = useState(new AudioContext());

  const connect = useCallback(() => {
    setIsConnected(true);
    const socket = io("http://localhost:8001/");
    socket.on("beep", (time: number) => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime);

      const maxLevel = 0.5;
      const attackTime = time * 0.1;
      const decayTime = time * 0.3;
      const sustainLevel = 0.7;
      const releaseTime = time * 0.2;

      const now = audioContext.currentTime;
      const beepGain = audioContext.createGain();
      beepGain.connect(audioContext.destination);
      beepGain.gain.setValueAtTime(0, 0);
      beepGain.gain.linearRampToValueAtTime(maxLevel, now + attackTime);
      beepGain.gain.linearRampToValueAtTime(
        maxLevel * sustainLevel,
        now + attackTime + decayTime
      );
      beepGain.gain.setValueAtTime(
        maxLevel * sustainLevel,
        now + (1 - releaseTime) * time
      );
      beepGain.gain.linearRampToValueAtTime(0, now + time);
      oscillator.connect(beepGain);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + time);
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
