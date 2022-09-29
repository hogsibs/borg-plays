import C8 from "../types/c8";
import { getX } from "./common";

export default function addVxToAddressRegister(c8: C8, code: number) {
  c8.addressRegister += c8.registers[getX(code)];
}
