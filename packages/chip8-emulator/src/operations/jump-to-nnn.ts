import C8 from "../types/c8.js";
import { getNnn } from "./common.js";

export default function jumpToNnn(c8: C8, code: number) {
  c8.programCounter = getNnn(code);
}
