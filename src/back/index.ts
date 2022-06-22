import WebSocket, { WebSocketServer } from 'ws';
import { WsEvents, Constants, Commands } from './consts';
import { parseCommand } from './utils';
import * as Robot from './robot';

export const startBack = () => {
  const wsServer = new WebSocketServer({ port: Constants.PORT });

  wsServer.on(WsEvents.CONNECTION, (ws: WebSocket.WebSocket) => {
    ws.on(WsEvents.MESSAGE, async (data: WebSocket.RawData) => {
      console.log('recieved: %s', data);

      const { command, param1, param2 } = parseCommand(data.toString());
      if (command) {
        switch (command) {
          case Commands.mouse_down:
            Robot.moveDown(+param1);
            ws.send(command);
            break;
          case Commands.mouse_up:
            Robot.moveUp(+param1);
            ws.send(command);
            break;
          case Commands.mouse_left:
            Robot.moveLeft(+param1);
            ws.send(command);
            break;
          case Commands.mouse_right:
            Robot.moveRight(+param1);
            ws.send(command);
            break;
          case Commands.mouse_position: {
            const { x, y } = Robot.mousePos();

            ws.send(`${command} ${x},${y}`);
            break;
          }
          case Commands.draw_square:
            Robot.drawRect(+param1, +param1);
            ws.send(command);
            break;
          case Commands.draw_rectangle:
            Robot.drawRect(+param1, +param2);
            ws.send(command);
            break;
          case Commands.draw_circle:
            Robot.drawCircle(+param1);
            ws.send(command);
            break;
          case Commands.prnt_scrn: {
            const buf = await Robot.makeCapture();

            ws.send(`${command} ${buf}`);
            break;
          }
          default:
            break;
        }
      }
    });

    process.on('exit', () => {
      ws.close();
      process.exit();
    });
  });

  wsServer.on(WsEvents.CLOSE, () => {
    console.log('WebSocket connection is closed');
  });
};
