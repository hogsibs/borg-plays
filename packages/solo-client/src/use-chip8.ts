import beep from "./beep";
import {
  C8,
  getX,
  initializeC8,
  loadRom,
  pong,
  startEmulator,
} from "chip8-emulator";
import { MutableRefObject, useEffect, useMemo, useState } from "react";
import useKeyPad from "./use-key-pad";
import { drawScreen } from "./draw-screen";

const useChip8 = (
  audioContextRef: MutableRefObject<AudioContext | undefined>,
  canvasContext: CanvasRenderingContext2D | undefined
) => {
  const [chip8, setChip8] = useState<C8>();
  useEffect(() => {
    if (!canvasContext) {
      return;
    }

    const c8 = initializeC8({
      drawSprite: (base, c8, code) => {
        base(c8, code);
        drawScreen(canvasContext, c8.graphics);
      },
      setSoundTimerToVx: (_, c8, code) => {
        if (audioContextRef.current) {
          beep(audioContextRef.current, c8.registers[getX(code)] / 60);
        }
      },
    });
    loadRom(c8, pong.data);
    const stopEmulator = startEmulator(c8);
    setChip8(c8);
    return stopEmulator;
  }, [canvasContext]);
  useKeyPad(chip8);
  return chip8;
};
export default useChip8;
