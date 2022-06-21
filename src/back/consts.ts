export enum Constants {
   PORT = 8080,
}

export enum WsEvents {
  CONNECTION = 'connection',
  MESSAGE = 'message',
  CLOSE = 'close',
}

export enum Commands {
  mouse_up = 'mouse_up',
  mouse_down = 'mouse_down',
  mouse_left = 'mouse_left',
  mouse_right = 'mouse_right',
  mouse_position = 'mouse_position',
  draw_circle = 'draw_circle',
  draw_rectangle = 'draw_rectangle',
  draw_square = 'draw_square',
  prnt_scrn = 'prnt_scrn',
}
