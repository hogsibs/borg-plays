export type HigherOrderOperation<Parameters extends unknown[]> = (
  ...params: Parameters
) => () => void;
