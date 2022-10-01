import { FunctionComponent, useRef, useState } from "react";
import useCanvasContext from "./use-canvas-context";
import useAudioContextRef from "./use-audio-context-ref";
import useChip8 from "./use-chip8";

export const screenWidth = 64;
export const screenHeight = 32;

const Emulator: FunctionComponent<{ enableAudio: boolean }> = ({
  enableAudio,
}) => {
  const audioContextRef = useAudioContextRef(enableAudio);
  const [canvasContext, canvasRef] = useCanvasContext();
  useChip8(audioContextRef, canvasContext);
  return (
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
  );
};
export default Emulator;