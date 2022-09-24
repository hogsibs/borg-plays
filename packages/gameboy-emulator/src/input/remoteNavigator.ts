export const remoteNavigator: {
  getGamepads: () => Array<{
    axes: [number, number];
    buttons: Array<{ pressed: boolean }>;
  }>;
} = {
  getGamepads: () => [
    {
      axes: [0, 0],
      buttons: Array.from({ length: 16 }, () => ({ pressed: false })),
    },
  ],
};
