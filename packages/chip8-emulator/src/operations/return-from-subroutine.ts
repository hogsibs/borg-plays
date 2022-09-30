import C8 from "../types/c8.js";

export default function returnFromSubroutine(c8: C8) {
  const returnLocation = c8.stack.pop();
  if (returnLocation === undefined) {
    throw new Error(`Could not return from subroutine`);
  }
  c8.programCounter = returnLocation;
}
