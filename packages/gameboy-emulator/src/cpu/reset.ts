import { cpuClock } from "./cpuClock";
import { registerSet } from "./registerSet";

export function reset() {
  cpuClock.clockCycles = 0;
  cpuClock.machineCycles = 0;

  registerSet.a = 0;
  registerSet.b = 0;
  registerSet.c = 0;
  registerSet.d = 0;
  registerSet.e = 0;
  registerSet.h = 0;
  registerSet.l = 0;
  registerSet.flags = 0;

  registerSet.clockCycles = 0;
  registerSet.machineCycles = 0;
}
