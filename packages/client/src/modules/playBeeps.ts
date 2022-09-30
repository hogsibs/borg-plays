import { Socket } from "socket.io-client";

export function playBeeps(socket: Socket, audioContext: AudioContext) {
  socket.on("beep", beep);
  return () => socket.off("beep");

  function beep(time: number) {
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
  }
}
