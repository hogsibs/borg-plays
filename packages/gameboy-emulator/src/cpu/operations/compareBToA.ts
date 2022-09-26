import { carry, subtraction, zero } from "../flags";
import { registerSet } from "../registerSet";
import { timed } from "./higherOrder/timed";
import { flag } from "./sub/flag";
import { isZero } from "./sub/isZero";

export const compareBToA = timed(() => {
  const result = registerSet.a - registerSet.b;
  flag(subtraction);
  if (isZero(result)) {
    flag(zero);
  } else if (result < 0) {
    flag(carry);
  }
});
