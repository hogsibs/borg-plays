import {
  getX,
  initializeC8,
  loadRom,
  pong,
  startEmulator,
} from "chip8-emulator";
import express from "express";
import { createServer } from "http";
import { env } from "process";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server);
const keyPads: { [id: string]: { [key: string]: boolean } } = {};
const votes = {
  left: { up: 0, hold: 0, down: 0 },
  right: { up: 0, hold: 0, down: 0 },
};
const voteMap = {
  "1": {
    on: () => {
      votes.left.up++;
    },
    off: () => {
      votes.left.up--;
    },
  },
  q: {
    on: () => {
      votes.left.hold++;
    },
    off: () => {
      votes.left.hold--;
    },
  },
  a: {
    on: () => {
      votes.left.down++;
    },
    off: () => {
      votes.left.down--;
    },
  },
  "3": {
    on: () => {
      votes.right.up++;
    },
    off: () => {
      votes.right.up--;
    },
  },
  e: {
    on: () => {
      votes.right.hold++;
    },
    off: () => {
      votes.right.hold--;
    },
  },
  d: {
    on: () => {
      votes.right.down++;
    },
    off: () => {
      votes.right.down--;
    },
  },
};

const c8 = initializeC8({
  drawSprite: (base, c8, code) => {
    base(c8, code);
    io.emit("screen", c8.graphics);
  },
  setSoundTimerToVx: (_, c8, code) => {
    io.emit("beep", c8.registers[getX(code)] / 60);
  },
});
const game = pong;
loadRom(c8, game.data);
startEmulator(c8);
io.on("connection", (socket) => {
  keyPads[socket.id] = {};
  const keyPad = keyPads[socket.id];
  console.log("a user connected");
  socket.on("keyPad", (receivedKeys: { [key: string]: boolean }) => {
    let switchDetected = false;
    Object.keys(keyPad).forEach((key: string) => {
      const voteKey = key as keyof typeof voteMap;
      if (keyPad[key] && !receivedKeys[key]) {
        keyPad[key] = false;
        voteMap[voteKey].off();
        switchDetected = true;
      }
    });
    Object.entries(receivedKeys).forEach(([key, isPressed]) => {
      const voteKey = key as keyof typeof voteMap;
      if (isPressed && !keyPad[key]) {
        keyPad[key] = true;
        voteMap[voteKey].on();
        switchDetected = true;
      }
    });
    if (switchDetected) {
      processKeyPads();
    }
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const port = env.PORT ?? 8080;
server.listen(port, () => console.log(`listening on port ${port}`));

function processKeyPads() {
  let keyPad = 0;
  Object.entries(game.controlGroups).forEach(([name, group]) => {
    const voteGroup = votes[name as keyof typeof votes];
    const count = voteGroup.up + voteGroup.hold + voteGroup.down;
    if (!count) {
      return;
    }
    const value = (voteGroup.up - voteGroup.down) / count;
    if (value >= 1 / 3) {
      keyPad |= 1 << group.up.flag;
    } else if (value <= -1 / 3) {
      keyPad |= 1 << group.down.flag;
    }
  });
  c8.keyPad = keyPad;
}
