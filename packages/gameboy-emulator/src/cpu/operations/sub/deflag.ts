import { registerSet } from "../../registerSet";
import type { Flag } from "../../types/Flag";

export const deflag = (flag: Flag) => (registerSet.flags &= ~flag);
