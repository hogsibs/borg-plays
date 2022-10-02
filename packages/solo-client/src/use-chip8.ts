import beep from "./beep";
import {
  getX,
  initializeC8,
  loadRom,
  Rom,
  startEmulator,
} from "chip8-emulator";
import { useEffect, useMemo, useRef } from "react";
import useKeyPad from "./use-key-pad";
import { drawScreen } from "./draw-screen";
import { useAudioContext } from "./audio-context";

const useChip8 = (
  canvasContext: CanvasRenderingContext2D,
  rom: Rom | undefined
) => {
  const audioContextRef = useRef<AudioContext | undefined>();
  audioContextRef.current = useAudioContext();

  const c8 = useMemo(
    () =>
      initializeC8({
        drawSprite: (base, c8, code) => {
          base(c8, code);
          drawScreen(canvasContext, c8.graphics);
        },
        setSoundTimerToVx: (_, c8, code) => {
          if (audioContextRef.current) {
            beep(audioContextRef.current, c8.registers[getX(code)] / 60);
          }
        },
      }),
    [canvasContext]
  );
  useKeyPad(c8);
  useEffect(() => {
    if (!(c8 && rom)) {
      return;
    }
    loadRom(c8, rom.data);
    return startEmulator(c8);
  }, [c8, rom]);

  return c8;
};
export default useChip8;
