import { readByte, writeByte } from "../../../mmu";
import { registerSet } from "../../registerSet";
import type { Register } from "../../types/Register";
import { getCombinedAddress } from "../sub/getCombinedAddress";
import { loadMemoryAtProgramCounter } from "../sub/loadMemoryAtProgramCounter";
import { timed } from "./timed";

export const loadMemory = {
  at: (address1: Register, address2: Register) => ({
    intoRegister: (register: Register) =>
      timed(
        () =>
          (registerSet[register] = readByte(
            getCombinedAddress(address1, address2)
          )),
        2
      ),
  }),
  atProgramCounter: {
    intoMemoryAt: (address1: Register, address2: Register) =>
      timed(
        () =>
          writeByte(
            getCombinedAddress(address1, address2),
            readByte(registerSet.programCounter)
          ),
        3
      ),
    intoRegister: (destination: Register) =>
      timed(() => (registerSet[destination] = loadMemoryAtProgramCounter()), 2),
    intoRegisters: (destination1: Register, destination2: Register) =>
      timed(() => {
        registerSet[destination1] = loadMemoryAtProgramCounter();
        registerSet[destination2] = loadMemoryAtProgramCounter();
      }, 3),
  },
};
