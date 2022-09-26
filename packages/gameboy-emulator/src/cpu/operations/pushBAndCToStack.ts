import { timed } from "./higherOrder/timed";
import { pushRegisterToStack } from "./sub/pushRegisterToStack";

export const pushBAndCToStack = timed(() => {
  pushRegisterToStack("b");
  pushRegisterToStack("c");
}, 3);
