import robot from 'robotjs';
import Jimp from 'jimp';

export const moveDown = (y: number): void => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x, mouse.y + y);
};

export const moveUp = (y: number): void => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x, mouse.y - y);
};

export const moveLeft = (x: number): void => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x - x, mouse.y);
};

export const moveRight = (x: number): void => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x + x, mouse.y);
};

export const mousePos = (): { x: number; y: number; } => robot.getMousePos();

export const drawRect = (x: number, y: number): void => {
  const mouse = robot.getMousePos();

  robot.mouseToggle('down');

  for (let i = 0; i < x; i += 1) {
    robot.dragMouse(mouse.x + i, mouse.y);
  }

  for (let i = 0; i < y; i += 1) {
    robot.dragMouse(mouse.x + x, mouse.y + i);
  }

  for (let i = 0; i < x; i += 1) {
    robot.dragMouse(mouse.x + x - i, mouse.y + y);
  }

  for (let i = 0; i < y; i += 1) {
    robot.dragMouse(mouse.x, mouse.y + y - i);
  }

  robot.mouseToggle('up');
};

export const drawCircle = (r: number): void => {
  const mouse = robot.getMousePos();

  robot.mouseToggle('down');

  for (let i = 0; i < r; i += 1) {
    const x = mouse.x + i;
    const y = (-1) * Math.sqrt(r ** 2 - (x - mouse.x) ** 2) + mouse.y + r;
    robot.dragMouse(x, y);
  }

  for (let i = 0; i < r; i += 1) {
    const x = mouse.x + r - i;
    const y = Math.sqrt(r ** 2 - (x - mouse.x) ** 2) + mouse.y + r;
    robot.dragMouse(x, y);
  }

  for (let i = 0; i < r; i += 1) {
    const x = mouse.x - i;
    const y = Math.sqrt(r ** 2 - (x - mouse.x) ** 2) + mouse.y + r;
    robot.dragMouse(x, y);
  }

  for (let i = 0; i < r; i += 1) {
    const x = mouse.x - r + i;
    const y = (-1) * Math.sqrt(r ** 2 - (x - mouse.x) ** 2) + mouse.y + r;
    robot.dragMouse(x, y);
  }

  robot.mouseToggle('up');
};

export const makeCapture = async (): Promise<string> => {
  const width = 200;
  const mouse = robot.getMousePos();

  const bitMapImg = robot.screen.capture(mouse.x - width / 2, mouse.y - width / 2, width, width);
  const jimpImg = new Jimp(width, width);

  jimpImg.bitmap.data = bitMapImg.image;

  jimpImg.scan(0, 0, jimpImg.bitmap.width, jimpImg.bitmap.height, (x, y, idx) => {
    const red = jimpImg.bitmap.data[idx + 0];
    const blue = jimpImg.bitmap.data[idx + 2];
    jimpImg.bitmap.data[idx + 0] = blue;
    jimpImg.bitmap.data[idx + 2] = red;
  });

  const buffer = await jimpImg.getBufferAsync(Jimp.MIME_PNG);

  return buffer.toString('base64');
};
