import { useState, Ref, useCallback } from "react";

const useCanvasContext = (): [
  CanvasRenderingContext2D | undefined,
  Ref<HTMLCanvasElement>
] => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D>();
  const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
    if (canvas) {
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Could not resolve context from canvas");
      }
      setCanvasContext(context);
    }
  }, []);
  return [canvasContext, canvasRef];
};
export default useCanvasContext;
