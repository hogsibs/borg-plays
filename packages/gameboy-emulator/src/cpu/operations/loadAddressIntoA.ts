import { readByte, readWord } from "../../mmu";
import { registerSet } from "../registerSet";
import { timed } from "./higherOrder/timed";

export const loadAddressIntoA = timed(() => {
  const address = readWord(registerSet.programCounter);
  registerSet.programCounter += 2;
  registerSet.a = readByte(address);
}, 4);
