import React, { FunctionComponent } from "react";
import useAudioContext from "./useAudioContext";
import useSocket from "./use-socket";
import useCanvasContext from "./use-canvas-context";
import usePeripherals from "./use-peripherals";
import useKeyPad from "./use-key-pad";

export const screenWidth = 64;
export const screenHeight = 32;

export const Connector: FunctionComponent = () => {
  const audioContext = useAudioContext();
  const [socket, connect] = useSocket();
  const [canvasContext, canvasRef] = useCanvasContext(socket);
  useKeyPad(socket);
  usePeripherals(canvasContext, audioContext, socket);

  return socket ? (
    <>
      <canvas
        ref={canvasRef}
        width={screenWidth}
        height={screenHeight}
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
