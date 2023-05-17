import { rgbToLong } from '../utils/color';
import { log } from '../utils/logger';
import { GAME_HEIGHT, GAME_WIDTH, HALF_BALL, TILE_SIZE } from './constants';
import { drawDashedLine, drawLine } from './draw';
import { MinigolfMap } from './minigolfMap';
import { getPlayerPos, getStrokePower, setPlayerPosRel, setPlayerX, setPlayerY } from './physics';
import { spriteManager } from './spriteManager';

interface MapRenderResult {
  startPositions: number[][];
}

export function renderMap(map: MinigolfMap): MapRenderResult {
  const startPositions: number[][] = [];
  game.ctx.clearRect(0, 0, map.width * 15, map.height * 15);

  for (let tileY = 0; tileY < map.height; tileY++) {
    for (let tileX = 0; tileX < map.width; tileX++) {
      const tile = map.tiles[tileX][tileY];
      const { background, foreground, shape, isSpecial } = tile;

      const drawAtX = tileX * TILE_SIZE;
      const drawAtY = tileY * TILE_SIZE;

      if (isSpecial || shape === 0) {
        spriteManager.elements[background].draw(game.ctx, drawAtX, drawAtY);
        spriteManager.elements[foreground].draw(game.ctx, drawAtX, drawAtY);

        if (isSpecial && shape !== 4 && shape !== 6) {
          // 4 and 6 are mines
          const foregroundPixels = game.ctx.getImageData(drawAtX, drawAtY, 15, 15).data;

          if (shape === 0 || (shape >= 24 && shape <= 27)) {
            // Is starting position
            startPositions.push([drawAtX, drawAtY]);
            continue;
            // const playerId = shape === 0 ? 0 : shape - 24;
          } else {
            // Draw specials (Holes, teleports...)
            spriteManager.special[shape].draw(game.ctx, drawAtX, drawAtY);
          }

          const tileImageData = game.ctx.getImageData(drawAtX, drawAtY, 15, 15);
          const tilePixels = tileImageData.data;
          for (let i = 0; i < tilePixels.length; i += 4) {
            if (rgbToLong(tilePixels[i], tilePixels[i + 1], tilePixels[i + 2]) == 0xccccff || tilePixels[i + 3] == 0) {
              tileImageData.data[i] = foregroundPixels[i];
              tileImageData.data[i + 1] = foregroundPixels[i + 1];
              tileImageData.data[i + 2] = foregroundPixels[i + 2];
              tileImageData.data[i + 3] = foregroundPixels[i + 3];
            }
          }

          game.ctx.putImageData(tileImageData, drawAtX, drawAtY);
        }
      } else if (!isSpecial && shape > 0) {
        const sw = spriteManager.shapes[shape].width;
        const sh = spriteManager.shapes[shape].height;

        spriteManager.elements[background].draw(game.ctx, drawAtX, drawAtY);
        const pixelsBg = game.ctx.getImageData(drawAtX, drawAtY, sw, sh).data;

        spriteManager.elements[foreground].draw(game.ctx, drawAtX, drawAtY);
        const pixelsFg = game.ctx.getImageData(drawAtX, drawAtY, sw, sh).data;

        spriteManager.shapes[shape].draw(game.ctx, drawAtX, drawAtY);

        const tileImageData = game.ctx.getImageData(drawAtX, drawAtY, sw, sh);
        const tilePixels = tileImageData.data;

        for (let i = 0; i < tilePixels.length; i += 4) {
          const colour = rgbToLong(tilePixels[i], tilePixels[i + 1], tilePixels[i + 2]);
          if (colour == 0xccccff) {
            tileImageData.data[i] = pixelsFg[i];
            tileImageData.data[i + 1] = pixelsFg[i + 1];
            tileImageData.data[i + 2] = pixelsFg[i + 2];
            tileImageData.data[i + 3] = pixelsFg[i + 3];
          } else if (colour == 0) {
            tileImageData.data[i] = pixelsBg[i];
            tileImageData.data[i + 1] = pixelsBg[i + 1];
            tileImageData.data[i + 2] = pixelsBg[i + 2];
            tileImageData.data[i + 3] = pixelsBg[i + 3];
          }
        }
        game.ctx.putImageData(tileImageData, drawAtX, drawAtY);
      }
    }
  }

  return {
    startPositions,
  };
}

export const tileToDrawPosition = (tileX: number, tileY: number) =>
  [Math.floor(tileX * TILE_SIZE), Math.floor(tileY * TILE_SIZE)] as const;

export const drawBall = (playerId: number): void => {
  const [playerDrawX, playerDrawY] = getPlayerPos(playerId);
  const foregroundPixels = game.cursorCtx.getImageData(...getPlayerPos(playerId), 15, 15).data;
  spriteManager.balls[playerId].draw(game.cursorCtx, playerDrawX + 1, playerDrawY + 1);

  const tileImageData = game.cursorCtx.getImageData(playerDrawX, playerDrawY, 15, 15);
  const tilePixels = tileImageData.data;
  for (let i = 0; i < tilePixels.length; i += 4) {
    if (rgbToLong(tilePixels[i], tilePixels[i + 1], tilePixels[i + 2]) == 0xccccff || tilePixels[i + 3] == 0) {
      tileImageData.data[i] = foregroundPixels[i];
      tileImageData.data[i + 1] = foregroundPixels[i + 1];
      tileImageData.data[i + 2] = foregroundPixels[i + 2];
      tileImageData.data[i + 3] = foregroundPixels[i + 3];
    }
  }

  game.cursorCtx.putImageData(tileImageData, playerDrawX, playerDrawY);
};

export function drawAimLine(): void {
  const { playerX, playerY, currentPlayerId, mouseX, mouseY, shootingMode, cursorCtx, cursorImgData } = game;

  if (playerX === undefined || playerY === undefined || mouseX === undefined || mouseY === undefined) {
    log.warn('No data for drawing aim line', {
      playerX,
      playerY,
      mouseX,
      mouseY,
    });
    return;
  }

  cursorImgData.data.fill(0);
  const [playerDrawX, playerDrawY] = getPlayerPos(game.currentPlayerId);
  const power = getStrokePower(playerDrawX, playerDrawY, mouseX, mouseY);

  //ball
  const x1 = playerDrawX + HALF_BALL + 0.5;
  const y1 = playerDrawY + HALF_BALL + 0.5;

  //stroke power
  const x2 = playerDrawX + (power[0] * 200.0) / 6.5 + 0.5;
  const y2 = playerDrawY + (power[1] * 200.0) / 6.5 + 0.5;

  if (shootingMode === 0) {
    drawLine(cursorImgData, Math.round(x1), Math.round(y1), Math.round(x2), Math.round(y2));
  } else {
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    drawDashedLine(cursorImgData, x1, y1, deltaX, deltaY);

    if (shootingMode == 1) {
      deltaX = -deltaX;
      deltaY = -deltaY;
    }

    let oldX;

    if (shootingMode == 2) {
      oldX = deltaX;
      deltaX = deltaY;
      deltaY = -oldX;
    }

    if (shootingMode == 3) {
      oldX = deltaX;
      deltaX = -deltaY;
      deltaY = oldX;
    }

    drawLine(cursorImgData, Math.round(x1), Math.round(y1), Math.round(x1 + deltaX), Math.round(y1 + deltaY));
  }
  cursorCtx.putImageData(cursorImgData, 0, 0);
  drawBall(currentPlayerId);
}

export function shootDrawLoop() {
  const playerCount = 1; // TODO

  /* let loopStuckCounter = 0; */
  const magnetStuckCounter: number[] = [];
  const downHillStuckCounter: number[] = [];
  const tempCoordX: number[] = [];
  const tempCoordY: number[] = [];
  /* const var10: number[] = []; */
  const tempCoord1X: number[] = [];
  const tempCoord1Y: number[] = [];
  /* const var13: number[] = [];
  const var14: number[] = []; */
  const onHole: boolean[] = [];
  const onLiquidOrGrassLiquid: boolean[] = [];
  const teleported: boolean[] = [];
  const spinningStuckCounter = [];

  for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
    magnetStuckCounter[playerIndex] = downHillStuckCounter[playerIndex] = 0;
    tempCoordX[playerIndex] = tempCoord1X[playerIndex] = game.playerX[playerIndex];
    tempCoordY[playerIndex] = tempCoord1Y[playerIndex] = game.playerY[playerIndex];
    onHole[playerIndex] = onLiquidOrGrassLiquid[playerIndex] = false;
    // var10[playerIndex] = this.aSynchronizedBoolArray2831[playerIndex].get() ? 2.1666666666666665D : 0.0D;
    teleported[playerIndex] = false;
    spinningStuckCounter[playerIndex] = 0;
  }
  /*
boolean shouldSpinAroundHole = false;
boolean onLiquid = false;
boolean var22 = false;
boolean var23 = super.gameContainer.synchronizedTrackTestMode.get();
if (var23) {
    var22 = super.gameContainer.gamePanel.maxFps();
}

int var24 = -1;
byte topLeft = 0;
byte left = 0;
byte bottomLeft = 0;
byte bottom = 0;
byte bottomRight = 0;
byte right = 0;
byte topRight = 0;
byte top = 0;
byte center = 0;
int y = 0;
int x = 0;
double speed = 0.0D;
this.bouncyWallBounciness = this.speedThing2 = 1.0D;
int var38 = 0;
*/

  for (let i = 0; i < playerCount; ++i) {
    setPlayerPosRel(i, game.speedX[i] * 0.1, game.speedY[i] * 0.1);

    if (game.playerX[i] < 6.6) {
      setPlayerX(i, 6.6);
    }

    if (game.playerX[i] >= 727.9) {
      setPlayerX(i, 727.9);
    }

    if (game.playerY[i] < 6.6) {
      setPlayerY(i, 6.6);
    }

    if (game.playerY[i] >= 367.9) {
      setPlayerY(i, 367.9);
    }
  }
  game.cursorCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  drawBall(game.currentPlayerId);
  requestAnimationFrame(shootDrawLoop);
}
