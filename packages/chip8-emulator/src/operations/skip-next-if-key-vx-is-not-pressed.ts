import C8 from "../types/c8";
import { getX } from "./common";

export default function skipNextIfKeyVxIsNotPressed(c8: C8, code: number) {
  if (c8.registers[getX(code)] & c8.keyPad) {
    c8.programCounter += 2;
  }
}
