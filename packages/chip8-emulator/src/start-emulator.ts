import executeNextOperation from "./execute-next-operation.js";
import setEmulatedInterval from "./set-emulated-interval.js";
import C8 from "./types/c8.js";

const startEmulator = (c8: C8) => {
  const stopGameLoop = setEmulatedInterval(() => {
    try {
      executeNextOperation(c8);
    } catch (error) {
      abort();
      throw error;
    }
  }, 500);
  const stopTimers = setEmulatedInterval(() => {
    if (c8.delayTimer > 0) {
      c8.delayTimer--;
    }
  }, 60);

  return abort;

  function abort() {
    stopGameLoop();
    stopTimers();
  }
};
export default startEmulator;
