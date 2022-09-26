import { readByte } from "../mmu";
import { maxWord } from "./constants";
import { cpuClock } from "./cpuClock";
import { map } from "./operations";
import { registerSet } from "./registerSet";

export const run = () => {
  while (true) {
    const operation = map[readByte(registerSet.programCounter)];
    operation();
    registerSet.programCounter = (registerSet.programCounter + 1) & maxWord;
    cpuClock.clockCycles += registerSet.clockCycles;
    cpuClock.machineCycles += registerSet.clockCycles;
  }
};
