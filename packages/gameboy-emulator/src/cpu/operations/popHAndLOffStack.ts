import { timed } from "./higherOrder/timed";
import { popRegisterOffStack } from "./sub/popRegisterOffStack";

export const popHAndLOffStack = timed(() => {
  popRegisterOffStack("h");
  popRegisterOffStack("l");
}, 3);
