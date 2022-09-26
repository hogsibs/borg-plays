import { maxByte } from "../constants";
import { carry, zero } from "../flags";
import { registerSet } from "../registerSet";
import { timed } from "./higherOrder/timed";
import { flag } from "./sub/flag";
import { isOverflow } from "./sub/isOverflow";
import { isZero } from "./sub/isZero";

export const addEToA = timed(() => {
  registerSet.a += registerSet.e;
  registerSet.flags = 0;
  if (isZero(registerSet.a)) {
    flag(zero);
  }
  if (isOverflow(registerSet.a)) {
    flag(carry);
    registerSet.a &= maxByte;
  }
});
