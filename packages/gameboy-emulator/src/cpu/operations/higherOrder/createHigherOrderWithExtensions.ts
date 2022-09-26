import { HigherOrderOperation } from "../../types/HigherOrderOperation";

export function createHigherOrderWithExtensions<
  Extensions extends { [extension: string]: HigherOrderOperation<never[]> }
>(main: () => void, extensions: Extensions): typeof main & Extensions {
  Object.assign(main, extensions);
  return main as typeof main & Extensions;
}
