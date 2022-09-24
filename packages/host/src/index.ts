import { Gameboy } from "@borg-plays/gameboy-emulator";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const gameboy = new Gameboy();

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  for (const operation of gameboy.cpu.operationMap.values()) {
    socket.send(operation.instruction);
  }
  socket.on("disconnect", () => console.log("a user disconnected"));
});

const port = 8001;
server.listen(port, () => console.log(`listening on port ${port}`));
