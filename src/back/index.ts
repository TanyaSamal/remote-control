import WebSocket, { WebSocketServer } from 'ws';
import { WsEvents, Constants, Commands } from './consts';
import { parseCommand } from './utils';
import * as Robot from './robot';

export const startBack = () => {
  const wsServer = new WebSocketServer({ port: Constants.PORT });

  wsServer.on(WsEvents.CONNECTION, (ws: WebSocket.WebSocket) => {
    ws.on(WsEvents.MESSAGE, (data: WebSocket.RawData) => {
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
          default:
            break;
        }
      }
    });
  });

  wsServer.on(WsEvents.CLOSE, () => {
    //
  });
};
