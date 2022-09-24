import { RemoteAudioContext } from "../RemoteAudioContext";
import { RemoteAudioNode } from "./RemoteAudioNode";
import { RemoteAudioParam } from "./RemoteAudioParam";

export class RemoteAudioWorkletNode {
  constructor(
    audioContext: RemoteAudioContext,
    name: string,
    options: { processorOptions: {} }
  ) {}

  connect(destination: RemoteAudioNode | RemoteAudioParam) {}
}
