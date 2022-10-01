import { useRef, useState, useEffect, RefObject } from "react";

const useCanvasContext = (): [
  CanvasRenderingContext2D | undefined,
  RefObject<HTMLCanvasElement>
] => {
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
  }, []);
  return [canvasContext, canvasRef];
};
export default useCanvasContext;
