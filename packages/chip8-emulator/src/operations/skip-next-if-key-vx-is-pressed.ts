import goToNextInstruction from "../go-to-next-instruction.js";
import C8 from "../types/c8.js";
import { getX } from "./common.js";

export default function (c8: C8, code: number) {
  const key = 1 << c8.registers[getX(code)];
  if ((key & c8.keyPad) === key) {
    goToNextInstruction(c8);
  }
}
