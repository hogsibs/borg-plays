import React, { useEffect, useRef, useState } from "react";
import { screenHeight, screenWidth } from "./constants";
import executeNextOperation from "./execute-next-operation";
import initializeC8 from "./initialize-c8";
import loadRom from "./load-rom";
import pong from "./pong";
import setEmulatedInterval from "./set-emulated-interval";

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasRef.current !== null && !canvasContext) {
      setCanvasContext(canvasRef.current.getContext("2d"));
    }
  }, []);
  useEffect(() => {
    if (!canvasContext) return;

    const c8 = initializeC8();
    loadRom(c8, pong);

    const stopGameLoop = setEmulatedInterval(() => {
      try {
        executeNextOperation(c8);
      } catch (error) {
        console.error(error);
        abort();
      }
    }, 500);

    let keepDrawing = true;
    requestAnimationFrame(drawScreen);

    const stopTimers = setEmulatedInterval(() => {
      if (c8.delayTimer > 0) {
        c8.delayTimer--;
      }

      if (c8.soundTimer > 0) {
        console.log("BEEP");
        c8.soundTimer--;
      }
    }, 60);

    return abort;

    function drawScreen() {
      if (!canvasContext || !keepDrawing) return;

      const screen = new ImageData(screenWidth, screenHeight);
      c8.graphics.forEach((isWhite, index) => {
        const offset = 15;
        const shade = isWhite ? 0xff - offset : offset;
        screen.data[index * 4] = shade;
        screen.data[index * 4 + 1] = shade;
        screen.data[index * 4 + 2] = shade;
        screen.data[index * 4 + 3] = 255;
      });
      canvasContext.putImageData(screen, 0, 0);

      requestAnimationFrame(drawScreen);
    }

    function abort() {
      keepDrawing = false;
      stopGameLoop();
      stopTimers();
    }
  }, [canvasContext]);

  return (
    <canvas
      ref={canvasRef}
      width={screenWidth}
      height={screenHeight}
      style={{
        border: "10px ridge gray",
        boxSizing: "border-box",
        imageRendering: "pixelated",
        width: "40em",
      }}
    />
  );
};
