import { useState } from "react";

const useAudioContext = () => useState(new AudioContext())[0];
export default useAudioContext;
