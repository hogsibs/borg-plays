import C8 from "../types/c8";

const clearScreen = (c8: C8) => {
  c8.graphics.fill(false, 0, c8.graphics.length);
};
export default clearScreen;
