import { FunctionComponent } from "react";
import useCanvasContext from "./use-canvas-context";
import useChip8 from "./use-chip8";
import type { Rom } from "chip8-emulator";

export const screenWidth = 64;
export const screenHeight = 32;

const Emulator: FunctionComponent<{
  rom: Rom | undefined;
}> = ({ rom }) => {
  const [canvasContext, canvasRef] = useCanvasContext();
  useChip8(canvasContext, rom);
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
