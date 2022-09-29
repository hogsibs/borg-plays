import C8 from "../types/c8";
import { getNn, getX } from "./common";

export default function addNnToVx(c8: C8, code: number) {
  const x = getX(code);
  c8.registers[x] = (c8.registers[x] + getNn(code)) & 0xff;
}
