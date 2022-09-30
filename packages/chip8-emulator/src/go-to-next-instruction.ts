import C8 from "./types/c8.js";

export default function goToNextInstruction(c8: C8) {
  c8.programCounter += 2;
}
