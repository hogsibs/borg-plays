import base64ToByteArray from "./base64-to-byte-array.js";
import { programCounterStartingPosition } from "./constants.js";
import { copy } from "./copy.js";
import C8 from "./types/c8.js";

const loadRom = (c8: C8, rom: string) =>
  copy(base64ToByteArray(rom), c8.memory, programCounterStartingPosition);

export default loadRom;
