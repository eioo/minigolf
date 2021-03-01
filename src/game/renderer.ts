import { rgbToLong } from "../utils/color";
import { HALF_BALL, TILE_SIZE } from "./constants";
import { drawDashedLine, drawLine } from "./draw";
import { MinigolfMap } from "./minigolfMap";
import { getStrokePower } from "./physics";
import { spriteManager } from "./spriteManager";

export async function renderMap(
  ctx: CanvasRenderingContext2D,
  map: MinigolfMap,
) {
  let startPositions: number[][] = [];

  ctx.clearRect(0, 0, map.width * 15, map.height * 15);

  for (let tileY = 0; tileY < map.height; tileY++) {
    for (let tileX = 0; tileX < map.width; tileX++) {
      const tile = map.tiles[tileX][tileY];
      const { background, foreground, shape, isSpecial } = tile;

      const drawAtX = tileX * TILE_SIZE;
      const drawAtY = tileY * TILE_SIZE;

      if (isSpecial || shape === 0) {
        spriteManager.elements[background].draw(ctx, drawAtX, drawAtY);
        spriteManager.elements[foreground].draw(ctx, drawAtX, drawAtY);

        if (isSpecial && shape !== 4 && shape !== 6) {
          // 4 and 6 are mines
          const foregroundPixels = ctx.getImageData(drawAtX, drawAtY, 15, 15)
            .data;

          if (shape === 0 || (shape >= 24 && shape <= 27)) {
            // Is starting position
            startPositions.push([drawAtX, drawAtY]);
            continue;
            // const playerId = shape === 0 ? 0 : shape - 24;
          } else {
            // Draw specials (Holes, teleports...)
            spriteManager.special[shape].draw(ctx, drawAtX, drawAtY);
          }

          const tileImageData = ctx.getImageData(drawAtX, drawAtY, 15, 15);
          const tilePixels = tileImageData.data;
          for (let i = 0; i < tilePixels.length; i += 4) {
            if (
              rgbToLong(tilePixels[i], tilePixels[i + 1], tilePixels[i + 2]) ==
                0xccccff ||
              tilePixels[i + 3] == 0
            ) {
              tileImageData.data[i] = foregroundPixels[i];
              tileImageData.data[i + 1] = foregroundPixels[i + 1];
              tileImageData.data[i + 2] = foregroundPixels[i + 2];
              tileImageData.data[i + 3] = foregroundPixels[i + 3];
            }
          }

          ctx.putImageData(tileImageData, drawAtX, drawAtY);
        }
      } else if (!isSpecial && shape > 0) {
        const sw = spriteManager.shapes[shape].width;
        const sh = spriteManager.shapes[shape].height;

        spriteManager.elements[background].draw(ctx, drawAtX, drawAtY);
        const pixelsBg = ctx.getImageData(drawAtX, drawAtY, sw, sh).data;

        spriteManager.elements[foreground].draw(ctx, drawAtX, drawAtY);
        const pixelsFg = ctx.getImageData(drawAtX, drawAtY, sw, sh).data;

        spriteManager.shapes[shape].draw(ctx, drawAtX, drawAtY);

        const tileImageData = ctx.getImageData(drawAtX, drawAtY, sw, sh);
        const tilePixels = tileImageData.data;

        for (let i = 0; i < tilePixels.length; i += 4) {
          const colour = rgbToLong(
            tilePixels[i],
            tilePixels[i + 1],
            tilePixels[i + 2],
          );
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
        ctx.putImageData(tileImageData, drawAtX, drawAtY);
      }
    }
  }

  return {
    startPositions,
  };
}

export const tileToDrawPosition = (tileX: number, tileY: number) =>
  [Math.floor(tileX * TILE_SIZE), Math.floor(tileY * TILE_SIZE)] as const;

export const drawBall = (
  ctx: CanvasRenderingContext2D,
  playerId: number,
  playerX: number,
  playerY: number,
) => {
  const foregroundPixels = ctx.getImageData(playerX, playerY, 15, 15).data;
  spriteManager.balls[playerId].draw(ctx, playerX + 1, playerY + 1);

  const tileImageData = ctx.getImageData(playerX, playerY, 15, 15);
  const tilePixels = tileImageData.data;
  for (let i = 0; i < tilePixels.length; i += 4) {
    if (
      rgbToLong(tilePixels[i], tilePixels[i + 1], tilePixels[i + 2]) ==
        0xccccff ||
      tilePixels[i + 3] == 0
    ) {
      tileImageData.data[i] = foregroundPixels[i];
      tileImageData.data[i + 1] = foregroundPixels[i + 1];
      tileImageData.data[i + 2] = foregroundPixels[i + 2];
      tileImageData.data[i + 3] = foregroundPixels[i + 3];
    }
  }

  ctx.putImageData(tileImageData, playerX, playerY);
};

export function drawAimLine(
  ctx: CanvasRenderingContext2D,
  imgData: ImageData,
  playerX: number,
  playerY: number,
  mouseX: number,
  mouseY: number,
  shootingMode: number,
) {
  if (
    playerX === undefined ||
    playerY === undefined ||
    mouseX === undefined ||
    mouseY === undefined
  ) {
    return console.warn("No data for drawing aim line", {
      playerX,
      playerY,
      mouseX,
      mouseY,
    });
  }

  imgData.data.fill(0);
  const power = getStrokePower(playerX, playerY, mouseX, mouseY);

  //ball
  const x1 = playerX + HALF_BALL + 0.5;
  const y1 = playerY + HALF_BALL + 0.5;

  //stroke power
  const x2 = playerX + (power[0] * 200.0) / 6.5 + 0.5;
  const y2 = playerY + (power[1] * 200.0) / 6.5 + 0.5;

  if (shootingMode === 0) {
    drawLine(
      imgData,
      Math.round(x1),
      Math.round(y1),
      Math.round(x2),
      Math.round(y2),
    );
  } else {
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    drawDashedLine(imgData, x1, y1, deltaX, deltaY);

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

    drawLine(
      imgData,
      Math.round(x1),
      Math.round(y1),
      Math.round(x1 + deltaX),
      Math.round(y1 + deltaY),
    );
  }
  ctx.putImageData(imgData, 0, 0);
}
