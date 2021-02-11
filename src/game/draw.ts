import { GAME_WIDTH } from "./contants";

export function setPixel(imageData: Uint8ClampedArray, x: number, y: number) {
  const n = Math.floor((y * GAME_WIDTH + x) * 4);
  imageData[n] = 255;
  imageData[n + 1] = 0;
  imageData[n + 2] = 0;
  imageData[n + 3] = 255;
}

export function drawLine(
  { data }: ImageData,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const dx = Math.abs(x2 - x1),
    sx = x1 < x2 ? 1 : -1;
  const dy = Math.abs(y2 - y1),
    sy = y1 < y2 ? 1 : -1;
  let err = (dx > dy ? dx : -dy) / 2;

  while (true) {
    setPixel(data, x1, y1);
    if (x1 === x2 && y1 === y2) break;
    const e2 = err;
    if (e2 > -dx) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dy) {
      err += dx;
      y1 += sy;
    }
  }
}

export function drawDashedLine(
  imgData: ImageData,
  x1: number,
  x2: number,
  deltaX: number,
  deltaY: number,
) {
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
      Math.floor(dx1),
      Math.floor(dx2),
      Math.floor(dx1) + Math.floor(dashX),
      Math.floor(dx2) + Math.floor(dashY),
    );
    dx1 += dashX * 2.0;
    dx2 += dashY * 2.0;
  }
}
