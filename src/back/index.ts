import { WebSocketServer } from 'ws';
import { WsEvents, Constants } from './consts';
import { startServer } from './server';

export const startBack = () => {
  const wsServer = new WebSocketServer({ port: Constants.PORT });

  wsServer.on(WsEvents.CONNECTION, startServer);

  wsServer.on(WsEvents.LISTENING, () => {
    console.info(`Websocket server is running on port ${Constants.PORT}`);
  });

  wsServer.on(WsEvents.CLOSE, () => {
    console.log('WebSocket connection is closed');
  });
};
