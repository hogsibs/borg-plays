import React, { useEffect, useRef, useState } from "react";
import { screenHeight, screenWidth } from "./constants";
import executeNextOperation from "./execute-next-operation";
import initializeC8 from "./initialize-c8";
import loadRom from "./load-rom";
import pong from "./pong";

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
    const gameLoop = setInterval(() => {
      try {
        executeNextOperation(c8);
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

        if (c8.delayTimer > 0) {
          c8.delayTimer--;
        }

        if (c8.soundTimer > 0) {
          if (c8.soundTimer === 1) {
            console.log("BEEP");
          }
          c8.soundTimer--;
        }
      } catch (error) {
        console.error(error);
        clearInterval(gameLoop);
      }
    }, 1000 / 60);
    return () => {
      clearInterval(gameLoop);
    };
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
