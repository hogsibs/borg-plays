import { screenHeight, screenWidth } from "./emulator";

export function drawScreen(
  canvasContext: CanvasRenderingContext2D,
  graphics: boolean[]
) {
  const screen = new ImageData(screenWidth, screenHeight);
  graphics.forEach((isWhite, index) => {
    const offset = 15;
    const shade = isWhite ? 0xff - offset : offset;
    screen.data[index * 4] = shade;
    screen.data[index * 4 + 1] = shade;
    screen.data[index * 4 + 2] = shade;
    screen.data[index * 4 + 3] = 255;
  });
  canvasContext.putImageData(screen, 0, 0);
}
