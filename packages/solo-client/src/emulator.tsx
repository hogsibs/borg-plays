import { FunctionComponent } from "react";
import type { Rom } from "chip8-emulator";
import Canvas2d from "./canvas-2d";
import EmulatorController from "./emulator-controller";

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

export default Emulator;
