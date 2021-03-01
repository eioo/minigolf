import { HALF_BALL } from "./constants";

export function getStrokePower(
  playerX: number,
  playerY: number,
  mouseX: number,
  mouseY: number,
) {
  const subX = playerX - mouseX;
  const subY = playerY - mouseY;
  const distance = Math.sqrt(subX * subX + subY * subY);
  let scale = (distance - 5.0) / 30.0;

  // Minimum stroke force
  if (scale < 0.075) {
    scale = 0.075;
  }

  // Maximum stroke force
  if (scale > 6.5) {
    scale = 6.5;
  }

  const var12 = scale / distance; // TODO
  const xy = [(mouseX - playerX) * var12, (mouseY - playerY) * var12];
  return xy;
}

export function isPosInsideBall(
  x: number,
  y: number,
  playerX: number,
  playerY: number,
) {
  const subX = playerX + HALF_BALL - x;
  const subY = playerY + HALF_BALL - y;
  return Math.sqrt(subX * subX + subY * subY) < HALF_BALL;
}
