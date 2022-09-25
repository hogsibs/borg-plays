import { Gameboy } from "@borg-plays/gameboy-emulator";
import { RemoteImageData } from "@borg-plays/gameboy-emulator/dist/gpu/RemoteImageData";
import express from "express";
import { readFile } from "fs/promises";
import { createServer } from "http";
import { join } from "path";
import { Server, Socket } from "socket.io";
import { getRelativePath } from "./getRelativePath.js";

const app = express();
const server = createServer(app);

const gameboy = new Gameboy();
(async () => {
  const cartridgePath = join(getRelativePath(import.meta.url, "../tic-tac.gb"));
  const cartridge = (await readFile(cartridgePath)).buffer;
  gameboy.loadGame(cartridge);
  gameboy.run();
  let sendFrame = true;
  let first = true;
  gameboy.onFrameFinished((imageData: RemoteImageData) => {
    if (first && imageData.data.filter((_) => _ > 0 && _ < 255).length > 0) {
      console.log(imageData.data);
      first = false;
    }
    if (sendFrame) {
      io.emit("frame", imageData.data);
    }
    sendFrame = !sendFrame;
  });
})().catch(console.error);

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const port = 8001;
server.listen(port, () => console.log(`listening on port ${port}`));
