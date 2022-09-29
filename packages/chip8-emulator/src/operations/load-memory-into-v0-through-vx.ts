import C8 from "../types/c8";
import { getX } from "./common";

export default function loadMemoryIntoV0ThroughVx(c8: C8, code: number) {
  const x = getX(code);
  for (let i = 0; i <= x; i++) {
    c8.registers[i] = c8.memory[c8.addressRegister + i];
  }
}
