import C8 from "../types/c8";
import { getNnn } from "./common";

export default function callSubroutineAtNnn(c8: C8, code: number) {
  c8.stack.push(c8.programCounter);
  c8.programCounter = getNnn(code);
}
