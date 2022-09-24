import { RemoteAudioContext } from "../RemoteAudioContext.js";
import { RemoteAudioNode } from "./RemoteAudioNode.js";
import { RemoteAudioParam } from "./RemoteAudioParam.js";

export class RemoteAudioWorkletNode {
  constructor(
    audioContext: RemoteAudioContext,
    name: string,
    options: { processorOptions: {} }
  ) {}

  connect(destination: RemoteAudioNode | RemoteAudioParam) {}
}
