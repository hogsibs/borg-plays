import { c8 } from "./c8";
import { screenHeight, screenWidth } from "./emulator";

export function debugGraphics() {
  let graphicsString = "";
  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      graphicsString += c8.graphics[y * screenWidth + x] ? "1" : "0";
    }
    graphicsString += "\n";
  }
  return graphicsString;
}
