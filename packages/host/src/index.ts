import {
  getX,
  initializeC8,
  loadRom,
  pong,
  startEmulator,
} from "chip8-emulator";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server);
const c8 = initializeC8({
  setSoundTimerToVx: (_, c8, code) => {
    io.emit("beep", c8.registers[getX(code)] / 60);
  },
});
loadRom(c8, pong);
startEmulator(c8);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const port = 8001;
server.listen(port, () => console.log(`listening on port ${port}`));
