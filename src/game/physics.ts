import { HALF_BALL } from "./constants";
import { shootDrawLoop } from "./renderer";

/**
 * Sets player X position (px)
 * @param playerId
 * @param px
 */
export function setPlayerX(playerId: number, px: number) {
  globalThis.game.playerX[playerId] = px;
}

/**
 * Sets player Y position (px)
 * @param playerId
 * @param px
 */
export function setPlayerY(playerId: number, px: number) {
  globalThis.game.playerY[playerId] = px;
}

/**
 * Sets player position (px)
 * @param playerId
 * @param x
 * @param y
 */
export function setPlayerPos(playerId: number, x: number, y: number) {
  setPlayerX(playerId, x);
  setPlayerY(playerId, y);
}

/**
 * Sets player position relatively (px)
 * @param playerId
 * @param x
 * @param y
 */
export function setPlayerPosRel(playerId: number, x: number, y: number) {
  const [oldX, oldY] = getPlayerPos(playerId);
  setPlayerX(playerId, oldX + x);
  setPlayerY(playerId, oldY + y);
}

/**
 * @param playerId
 * @returns Player X position
 */
export function getPlayerX(playerId: number) {
  return game.playerX[playerId];
}

/**
 * @param playerId
 * @returns Player Y position
 */
export function getPlayerY(playerId: number) {
  return game.playerY[playerId];
}

/**
 * @param playerId
 * @returns `[number, number]` array of player position (pixels)
 */
export const getPlayerPos = (playerId: number) =>
  [getPlayerX(playerId), getPlayerY(playerId)] as const;

/**
 * Sets X speed of player
 * @param playerId
 * @param speed
 */
export function setPlayerSpeedX(playerId: number, speed: number) {
  globalThis.game.speedX[playerId] = speed;
}

/**
 * Sets Y speed of player
 * @param playerId
 * @param speed
 */
export function setPlayerSpeedY(playerId: number, speed: number) {
  globalThis.game.speedY[playerId] = speed;
}

/**
 * Sets player speed
 * @param playerId
 * @param speedX
 * @param speedY
 */
export function setPlayerSpeed(
  playerId: number,
  speedX: number,
  speedY: number,
) {
  setPlayerSpeedX(playerId, speedX);
  setPlayerSpeedY(playerId, speedY);
}

/**
 * Sets player speed relatively
 * @param playerId
 * @param speedX
 * @param speedY
 */
export function setPlayerSpeedRel(
  playerId: number,
  speedX: number,
  speedY: number,
) {
  const [oldSpeedX, oldSpeedY] = getPlayerSpeed(playerId);
  setPlayerSpeed(playerId, oldSpeedX + speedX, oldSpeedY + speedY);
}

/**
 * @param playerId
 * @returns Player X speed
 */
export function getPlayerSpeedX(playerId: number) {
  return game.speedX[playerId];
}

/**
 * @param playerId
 * @returns Player Y speed
 */
export function getPlayerSpeedY(playerId: number) {
  return game.speedY[playerId];
}

/**
 * @param playerId
 * @returns `[number, number]` array of player speed
 */
export function getPlayerSpeed(playerId: number) {
  return [getPlayerSpeedX(playerId), getPlayerSpeedY(playerId)] as const;
}

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

export function isMouseInsideBall(playerId: number) {
  const playerDrawX = game.playerX[playerId];
  const playerDrawY = game.playerY[playerId];

  const subX = playerDrawX + HALF_BALL - game.mouseX;
  const subY = playerDrawY + HALF_BALL - game.mouseY;
  return Math.sqrt(subX * subX + subY * subY) < HALF_BALL;
}

export function doStroke(playerId: number) {
  const { mouseX, mouseY, mod, speedX, speedY } = game;
  console.debug(`Doing stroke @ (${mouseX}, ${mouseY})`);

  const [powerX, powerY] = getStrokePower(
    ...getPlayerPos(playerId),
    mouseX,
    mouseY,
  );
  setPlayerSpeed(playerId, powerX, powerY);

  if (mod == 1) {
    setPlayerPos(playerId, -speedX[playerId], -speedY[playerId]);
  }

  if (mod == 2) {
    setPlayerPos(playerId, speedY[playerId], -speedX[playerId]);
  }

  if (mod == 3) {
    setPlayerPos(playerId, speedY[playerId], -speedX[playerId]);
  }

  const speed = Math.sqrt(
    speedX[playerId] * speedX[playerId] + speedY[playerId] * speedY[playerId],
  );
  let scaledSpeed = speed / 6.5; // Some scaling? Not sure
  scaledSpeed *= scaledSpeed; // ?

  // This is the part where you add randomness to the shot, currently disabled
  setPlayerSpeedRel(
    playerId,
    scaledSpeed / 100000.0 - 0.25,
    scaledSpeed / 100000.0 - 0.25,
  );

  /*
  isLocalPlayer = isLocalPlayer;
  gameState = 2;
  Boolean2843 = false;
  */

  globalThis.game.gameBusy = true;
  shootDrawLoop();
}
