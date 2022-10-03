FROM node:18-alpine as base
WORKDIR /app

COPY package*.json ./
COPY lerna.json ./
COPY tsconfig.json ./
COPY ./packages/chip8-emulator/package.json ./packages/chip8-emulator/
COPY ./package.json ./packages/host/

COPY ./packages/chip8-emulator/ ./packages/chip8-emulator/
COPY ./packages/host ./packages/host/
RUN npm install
RUN npx lerna run build --scope=chip8-emulator
RUN npx lerna run build --scope=@borg-plays/host

FROM node:18-alpine
WORKDIR /app

COPY ./package*.json ./
COPY ./packages/chip8-emulator/package.json ./packages/chip8-emulator/
COPY ./packages/host/package.json ./packages/host/

RUN npm install --production

COPY --from=base /app/packages/chip8-emulator/dist /app/packages/chip8-emulator/dist
COPY --from=base /app/packages/host/dist /app/packages/host/dist

WORKDIR /app/packages/host/
EXPOSE $PORT
CMD ["npm", "start"]
