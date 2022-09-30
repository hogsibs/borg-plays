import C8 from "../types/c8.js";
import { getNn, getX } from "./common.js";

export default function setVxToRandomNumberAndNn(c8: C8, code: number) {
  c8.registers[getX(code)] = Math.floor(Math.random() * 0xff) & getNn(code);
}
