import C8 from "../types/c8.js";
import { getNn, getX } from "./common.js";

export default function setVxToNn(c8: C8, code: number) {
  c8.registers[getX(code)] = getNn(code);
}
