import { useRef, useState, useEffect, RefObject } from "react";
import type { Socket } from "socket.io-client";

const useCanvasContext = (
  socket: Socket | undefined
): [CanvasRenderingContext2D | undefined, RefObject<HTMLCanvasElement>] => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D>();
  useEffect(() => {
    if (!canvasContext && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (!context) {
        throw new Error("Could not resolve context from canvas");
      }
      setCanvasContext(context);
    }
  }, [socket]);
  return [canvasContext, canvasRef];
};
export default useCanvasContext;
