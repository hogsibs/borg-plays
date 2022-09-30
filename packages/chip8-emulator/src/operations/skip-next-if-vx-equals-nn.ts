import goToNextInstruction from "../go-to-next-instruction.js";
import C8 from "../types/c8.js";
import { getNn, getX } from "./common.js";

export default function skipNextIfVxEqualsNn(c8: C8, code: number) {
  if (c8.registers[getX(code)] === getNn(code)) {
    goToNextInstruction(c8);
  }
}
