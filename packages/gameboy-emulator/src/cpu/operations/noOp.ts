import { timed } from "./higherOrder/timed";

export const noOp = timed(() => {
  // do nothing
});
