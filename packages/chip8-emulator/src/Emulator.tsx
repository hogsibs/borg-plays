import React, { useCallback, useEffect, useRef, useState } from "react";
import bindKeyboard from "./bind-keyboard.js";
import { screenHeight, screenWidth } from "./constants.js";
import initializeC8 from "./initialize-c8.js";
import loadRom from "./load-rom.js";
import { getX } from "./operations/common.js";
import pong from "./pong.js";
import startEmulator from "./start-emulator.js";

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioContext] = useState(new AudioContext());

  const beep = useCallback(
    (time: number) => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime);

      const maxLevel = 0.5;
      const attackTime = time * 0.1;
      const decayTime = time * 0.3;
      const sustainLevel = 0.7;
      const releaseTime = time * 0.2;

      const now = audioContext.currentTime;
      const beepGain = audioContext.createGain();
      beepGain.connect(audioContext.destination);
      beepGain.gain.setValueAtTime(0, 0);
      beepGain.gain.linearRampToValueAtTime(maxLevel, now + attackTime);
      beepGain.gain.linearRampToValueAtTime(
        maxLevel * sustainLevel,
        now + attackTime + decayTime
      );
      beepGain.gain.setValueAtTime(
        maxLevel * sustainLevel,
        now + (1 - releaseTime) * time
      );
      beepGain.gain.linearRampToValueAtTime(0, now + time);
      oscillator.connect(beepGain);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + time);
    },
    [audioContext]
  );
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current !== null && !canvasContext) {
      setCanvasContext(canvasRef.current.getContext("2d"));
    }
  }, []);

  useEffect(() => {
    if (!canvasContext) return;

    const c8 = initializeC8({
      setSoundTimerToVx: (_, c8, code) => {
        beep(c8.registers[getX(code)] / 60);
      },
    });
    const unbindKeyboard = bindKeyboard(c8);
    loadRom(c8, pong);

    const stopEmulator = startEmulator(c8);

    let keepDrawing = true;
    requestAnimationFrame(drawScreen);

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
      stopEmulator();
      unbindKeyboard();
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
