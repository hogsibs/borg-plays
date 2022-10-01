import { useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (): [Socket | undefined, () => void] => {
  const [socket, setSocket] = useState<Socket>();
  const connect = useCallback(() => {
    const socket = io("http://localhost:8001/");
    setSocket(socket);
  }, []);
  return [socket, connect];
};
export default useSocket;