const beep = (audioContext: AudioContext, seconds: number) => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime);

  const maxLevel = 0.5;
  const attackTime = seconds * 0.1;
  const decayTime = seconds * 0.3;
  const sustainLevel = 0.7;
  const releaseTime = seconds * 0.2;

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
    now + (1 - releaseTime) * seconds
  );
  beepGain.gain.linearRampToValueAtTime(0, now + seconds);
  oscillator.connect(beepGain);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + seconds);
};
export default beep;
