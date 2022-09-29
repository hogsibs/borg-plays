import goToNextInstruction from "../go-to-next-instruction";
import C8 from "../types/c8";
import { getNn, getX } from "./common";

export default function skipNextIfVxEqualsNn(c8: C8, code: number) {
  if (c8.registers[getX(code)] === getNn(code)) {
    goToNextInstruction(c8);
  }
}
