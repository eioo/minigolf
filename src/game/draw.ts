import { GAME_HEIGHT, GAME_WIDTH } from './constants';

export function setPixel(imageData: Uint8ClampedArray, x: number, y: number): void {
  const n = Math.floor((y * GAME_WIDTH + x) * 4);
  imageData[n] = 128;
  imageData[n + 1] = 0;
  imageData[n + 2] = 32;
  imageData[n + 3] = 255;
}

/**
 * How far in px can we draw from canvas bounds?
 */
const DRAW_OFFSET = 220;

export function drawLine({ data }: ImageData, x1: number, y1: number, x2: number, y2: number): void {
  const dx = Math.abs(x2 - x1),
    sx = x1 < x2 ? 1 : -1;
  const dy = Math.abs(y2 - y1),
    sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    setPixel(data, Math.floor(x1), Math.floor(y1));

    // TODO: Probably not the most efficient way to do this
    // if (Math.abs(x1 - x2) < 0.0001 && Math.abs(y1 - y2) < 0.0001) break;
    if (
      (x1 === x2 && y1 === y2) ||
      x1 < -DRAW_OFFSET ||
      x2 < -DRAW_OFFSET ||
      y1 < -DRAW_OFFSET ||
      y2 < -DRAW_OFFSET ||
      x1 > GAME_WIDTH + DRAW_OFFSET ||
      x2 > GAME_WIDTH + DRAW_OFFSET ||
      y1 > GAME_HEIGHT + DRAW_OFFSET ||
      y2 > GAME_HEIGHT + DRAW_OFFSET
    ) {
      break;
    }
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
}

export function drawDashedLine(imgData: ImageData, x1: number, x2: number, deltaX: number, deltaY: number): void {
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);
  const dashCount = Math.max(absDeltaX, absDeltaY) / 10;
  let dx1 = x1;
  let dx2 = x2;
  const dashX = deltaX / (dashCount * 2.0);
  const dashY = deltaY / (dashCount * 2.0);
  dx1 += dashX;
  dx2 += dashY;

  for (let i = 0; i < dashCount; i++) {
    drawLine(
      imgData,
      Math.round(dx1),
      Math.round(dx2),
      Math.round(dx1) + Math.round(dashX),
      Math.round(dx2) + Math.round(dashY),
    );
    dx1 += dashX * 2.0;
    dx2 += dashY * 2.0;
  }
}
