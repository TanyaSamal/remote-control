import WebSocket, { createWebSocketStream } from 'ws';
import { parseCommand } from './utils';
import { WsEvents, Commands } from './consts';
import * as Robot from './robot';

export const startServer = (ws: WebSocket) => {
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', async (chunk: Buffer) => {
    const { command, param1, param2 } = parseCommand(chunk.toString());

    console.log(`Recieved: ${chunk.toString()}`);

    if (command) {
      switch (command) {
        case Commands.mouseDown:
          Robot.moveDown(+param1);
          duplex.write(`${command} \0`);
          break;
        case Commands.mouseUp:
          Robot.moveUp(+param1);
          duplex.write(`${command} \0`);
          break;
        case Commands.mouseLeft:
          Robot.moveLeft(+param1);
          duplex.write(`${command} \0`);
          break;
        case Commands.mouseRight:
          Robot.moveRight(+param1);
          duplex.write(`${command} \0`);
          break;
        case Commands.mousePosition: {
          const { x, y } = Robot.mousePos();

          duplex.write(`${command} ${x},${y} \0`);
          break;
        }
        case Commands.drawSquare:
          Robot.drawRect(+param1, +param1);
          duplex.write(`${command} \0`);
          break;
        case Commands.drawRectangle:
          Robot.drawRect(+param1, +param2);
          duplex.write(`${command} \0`);
          break;
        case Commands.drawCircle:
          Robot.drawCircle(+param1);
          duplex.write(`${command} \0`);
          break;
        case Commands.prntScrn: {
          const buf = await Robot.makeCapture();

          duplex.write(`${command} ${buf} \0`);
          break;
        }
        default:
          duplex.write('Invalid request \0');
          break;
      }
    }
  });

  ws.on(WsEvents.CLOSE, () => {
    duplex.destroy();
    process.exit();
  });
};
