import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

const audioContext = createContext<AudioContext | undefined>(undefined);

export const AudioContextProvider: FunctionComponent<
  PropsWithChildren<{ enableAudio: boolean }>
> = ({ enableAudio, children }) => (
  <audioContext.Provider
    value={useMemo(
      () =>
        enableAudio && typeof AudioContext !== "undefined"
          ? new AudioContext()
          : undefined,
      [enableAudio]
    )}
  >
    {children}
  </audioContext.Provider>
);

export const useAudioContext = () => useContext(audioContext);
