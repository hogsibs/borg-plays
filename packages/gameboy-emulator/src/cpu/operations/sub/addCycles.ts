import type { Clock } from "../../types/Clock";

export function addCycles(clock: Clock, cycles = 1) {
  clock.machineCycles += cycles;
  clock.clockCycles += cycles * 4;
}
