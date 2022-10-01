import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { drawScreen } from "./drawScreen";
import { playBeeps } from "./playBeeps";

const usePeripherals = (
  canvasContext: CanvasRenderingContext2D | undefined,
  audioContext: AudioContext | undefined,
  socket: Socket | undefined
) => {
  useEffect(() => {
    if (socket) {
      let stopBeeps: (() => void) | undefined = undefined;
      if (audioContext) {
        stopBeeps = playBeeps(socket, audioContext);
      }

      let stopDrawing: (() => void) | undefined = undefined;
      if (canvasContext) {
        stopDrawing = drawScreen(socket, canvasContext);
      }

      return () => {
        stopBeeps && stopBeeps();
        stopDrawing && stopDrawing();
      };
    }
  }, [canvasContext, audioContext, socket]);
};
export default usePeripherals;
