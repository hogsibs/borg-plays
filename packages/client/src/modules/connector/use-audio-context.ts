import { useState } from "react";

const useAudioContext = () =>
  useState(
    typeof AudioContext === "undefined" ? undefined : new AudioContext()
  )[0];
export default useAudioContext;
