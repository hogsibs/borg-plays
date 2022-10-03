import C8 from "../types/c8";
import { getX } from "./common.js";

const waitForAnyKey = (c8: C8, code: number) => {
  if (c8.keyPad === 0) {
    c8.programCounter -= 2;
  } else {
    c8.registers[getX(code)] = Math.floor(Math.log2(c8.keyPad));
  }
};
export default waitForAnyKey;
