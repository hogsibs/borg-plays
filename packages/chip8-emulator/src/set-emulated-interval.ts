export default function setEmulatedInterval(callback: () => void, hz: number) {
  const ms = 1000 / hz;
  let lastExecution = Date.now();
  const interval = setInterval(() => {
    const now = Date.now();
    while (now > lastExecution + ms) {
      callback();
      lastExecution += ms;
    }
  });
  return () => clearInterval(interval);
}
