import base64ToByteArray from "./base64-to-byte-array";
import { programCounterStartingPosition } from "./constants";
import { copy } from "./copy";
import C8 from "./types/c8";

const loadRom = (c8: C8, rom: string) =>
  copy(base64ToByteArray(rom), c8.memory, programCounterStartingPosition);

export default loadRom;
