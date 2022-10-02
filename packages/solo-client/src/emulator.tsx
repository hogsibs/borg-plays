import { FunctionComponent } from "react";
import useChip8 from "./use-chip8";
import type { Rom } from "chip8-emulator";
import Canvas2d, { useCanvas2dContext } from "./canvas-2d";

export const screenWidth = 64;
export const screenHeight = 32;

const Emulator: FunctionComponent<{
  rom: Rom | undefined;
}> = ({ rom }) => (
  <Canvas2d
    width={screenWidth}
    height={screenHeight}
    style={{
      border: "10px ridge gray",
      boxSizing: "border-box",
      imageRendering: "pixelated",
      width: "40em",
    }}
  >
    <EmulatorController rom={rom} />
  </Canvas2d>
);

const EmulatorController: FunctionComponent<{
  rom: Rom | undefined;
}> = ({ rom }) => {
  const canvasContext = useCanvas2dContext();
  useChip8(canvasContext, rom);
  return null;
};

export default Emulator;
