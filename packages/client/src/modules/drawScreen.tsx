import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { screenWidth, screenHeight } from "../pages/index";

export function drawScreen(
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  canvasContext: CanvasRenderingContext2D | undefined
) {
  socket.on("screen", draw);
  return () => socket.off("screen", draw);

  function draw(graphics: boolean[]) {
    if (!canvasContext) {
      return;
    }
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
}
