import { base64ToByteArray } from "./base64ToByteArray";
import { c8 } from "./c8";
import { copy } from "./copy";
import { executeOperation } from "./executeOperation";
import { fontSet } from "./fontSet";
import pong from "./pong";

const memorySize = 4096;
const registerCount = 16;
const stackSize = 16;
export const screenWidth = 64;
export const screenHeight = 32;

initialize();
loadGame();
const gameLoop = setInterval(() => {
  emulateCycle();
  if (c8.drawFlag) {
    drawGraphics();
    c8.drawFlag = false;
  }
  setKeys();
});

setInterval(() => {
  c8.drawFlag = true;
}, 500);

function initialize() {
  c8.programCounter = 0x200;
  c8.operationCode = 0;
  c8.indexRegister = 0;
  c8.stackPointer = 0;

  c8.stack = new Uint16Array(stackSize);
  c8.memory = new Uint8Array(memorySize);
  c8.registers = new Uint8Array(registerCount);
  c8.delayTimer = 0;
  c8.soundTimer = 0;
  c8.keyPad = 0x0;
  c8.drawFlag = false;
  c8.graphics = Array.from({ length: screenWidth * screenHeight }, () => false);

  copy(fontSet, c8.memory);
}

function loadGame() {
  copy(base64ToByteArray(pong), c8.memory, 0x200);
}

function emulateCycle() {
  fetchOperationCode();
  try {
    executeOperation();
  } catch (error) {
    console.error(error);
    clearInterval(gameLoop);
  }
  updateTimers();
}

function fetchOperationCode() {
  c8.operationCode =
    (c8.memory[c8.programCounter] << 8) | c8.memory[c8.programCounter + 1];
  c8.programCounter = (c8.programCounter + 2) % memorySize;
}

function drawGraphics() {}

function setKeys() {}

function updateTimers() {
  if (c8.delayTimer > 0) {
    c8.delayTimer--;
  }
  if (c8.soundTimer > 0) {
    if (c8.soundTimer === 1) {
      console.log("BEEP");
    }
    c8.soundTimer--;
  }
}
