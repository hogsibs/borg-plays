import { useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (): [Socket | undefined, () => void] => {
  const [socket, setSocket] = useState<Socket>();
  const connect = useCallback(() => {
    const socket = io(`${process.env.GATSBY_HOST_URL}`);
    setSocket(socket);
  }, []);
  return [socket, connect];
};
export default useSocket;
