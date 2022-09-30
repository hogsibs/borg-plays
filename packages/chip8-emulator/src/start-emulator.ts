import executeNextOperation from "./execute-next-operation";
import setEmulatedInterval from "./set-emulated-interval";
import C8 from "./types/c8";

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
