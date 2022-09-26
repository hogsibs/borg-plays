import { maxByte } from "../../constants";

export function isOverflow(input: number) {
  return input > maxByte;
}
