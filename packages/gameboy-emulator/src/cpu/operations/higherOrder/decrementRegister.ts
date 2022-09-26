import { Register } from "../../types/Register";
import { checkZeroFlag } from "../sub/checkZeroFlag";
import { timed } from "./timed";

export const decrementRegister = (target: Register) =>
  timed(() => {
    decrementRegister(target);
    checkZeroFlag(target);
  });
