import { useState } from "react";

const useAudioContext = () =>
  useState(typeof AudioContext !== "undefined" && new AudioContext())[0];
export default useAudioContext;
