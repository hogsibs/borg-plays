import { carry, halfCarry, subtraction, zero } from "../flags";

export type Flag =
  | typeof carry
  | typeof halfCarry
  | typeof subtraction
  | typeof zero;
