import goToNextInstruction from "../go-to-next-instruction.js";
import C8 from "../types/c8.js";
import { getX, getY } from "./common.js";

export default function skipNextIfVxEqualVy(c8: C8, code: number) {
  if (c8.registers[getX(code)] === c8.registers[getY(code)]) {
    goToNextInstruction(c8);
  }
}
