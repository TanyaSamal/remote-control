import robot from 'robotjs';

export const moveDown = (y: number) => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x, mouse.y + y);
};

export const moveUp = (y: number) => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x, mouse.y - y);
};

export const moveLeft = (x: number) => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x - x, mouse.y);
};

export const moveRight = (x: number) => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x + x, mouse.y);
};

export const mousePos = () => robot.getMousePos();
