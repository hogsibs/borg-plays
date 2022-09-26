import { registerSet } from "../../registerSet";
import { addCycles } from "../sub/addCycles";

export const timed =
  (operation: () => void, cycles = 1) =>
  () => {
    operation();
    addCycles(registerSet, cycles);
  };
