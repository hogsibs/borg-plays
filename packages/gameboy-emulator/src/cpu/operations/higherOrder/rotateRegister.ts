import { bit7, maxByte } from "../../constants";
import { carry } from "../../flags";
import { registerSet } from "../../registerSet";
import type { Register } from "../../types/Register";
import { deflag } from "../sub/deflag";
import { flag } from "../sub/flag";
import { timed } from "./timed";

export const rotateRegister = (target: Register) =>
  timed(() => {
    const carry7 = registerSet[target] & bit7;
    registerSet[target] =
      ((registerSet[target] << 1) & maxByte) + (carry7 ? 1 : 0);
    if (carry7) {
      flag(carry);
    } else {
      deflag(carry);
    }
  });
