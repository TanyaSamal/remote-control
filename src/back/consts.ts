export enum Constants {
   PORT = 8080,
}

export enum WsEvents {
  CONNECTION = 'connection',
  MESSAGE = 'message',
  CLOSE = 'close',
  LISTENING = 'listening',
}

export enum Commands {
  mouseUp = 'mouse_up',
  mouseDown = 'mouse_down',
  mouseLeft = 'mouse_left',
  mouseRight = 'mouse_right',
  mousePosition = 'mouse_position',
  drawCircle = 'draw_circle',
  drawRectangle = 'draw_rectangle',
  drawSquare = 'draw_square',
  prntScrn = 'prnt_scrn',
}
