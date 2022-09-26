import { writeByte } from "../../../mmu";
import { registerSet } from "../../registerSet";
import type { Register } from "../../types/Register";
import { getCombinedAddress } from "../sub/getCombinedAddress";
import { timed } from "./timed";

export const loadRegister = (source: Register) => ({
  intoMemoryAt: (address1: Register, address2: Register) =>
    timed(
      () =>
        writeByte(getCombinedAddress(address1, address2), registerSet[source]),
      2
    ),
  intoRegister: (destination: Register) =>
    timed(() => (registerSet[destination] = registerSet[source])),
});
