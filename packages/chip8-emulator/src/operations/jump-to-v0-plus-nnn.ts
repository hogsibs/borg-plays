import C8 from "../types/c8";
import { getNnn } from "./common";

export default function jumpToV0PlusNnn(c8: C8, code: number) {
  c8.programCounter = c8.registers[0] + getNnn(code);
}
