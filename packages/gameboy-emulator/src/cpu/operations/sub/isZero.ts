import { maxByte } from "../../constants";

export function isZero(input: number) {
  return !(input & maxByte);
}
