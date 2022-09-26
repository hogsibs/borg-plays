import { registerSet } from "../../registerSet";
import type { Flag } from "../../types/Flag";

export const flag = (flag: Flag) => (registerSet.flags |= flag);
