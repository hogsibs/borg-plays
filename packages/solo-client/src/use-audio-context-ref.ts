import { useMemo, useRef } from "react";

const useAudioContextRef = (enableAudio: boolean) => {
  const audioContextRef = useRef<AudioContext>();
  useMemo(() => {
    if (enableAudio && typeof AudioContext !== "undefined") {
      audioContextRef.current = new AudioContext();
    }
  }, [enableAudio]);
  return audioContextRef;
};
export default useAudioContextRef;
