import C8 from "../types/c8.js";
import { getNnn } from "./common.js";

export default function callSubroutineAtNnn(c8: C8, code: number) {
  c8.stack.push(c8.programCounter);
  c8.programCounter = getNnn(code);
}
