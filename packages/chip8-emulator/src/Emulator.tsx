import { screenHeight, screenWidth } from "./emulator";
import React, { useEffect, useRef, useState } from "react";
import { c8 } from "./c8";

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
    let looping = true;
    const drawScreen = () => {
      if (!looping) {
        return;
      }
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
    };
    requestAnimationFrame(drawScreen);
    return () => {
      looping = false;
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
