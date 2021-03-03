import { rgbToLong } from '../utils/color';
import { TILE_SIZE } from './constants';
import { MinigolfMap } from './mapParser';
import { spriteManager } from './spriteManager';

export async function renderMap(ctx: CanvasRenderingContext2D, map: MinigolfMap) {
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
          const foregroundPixels = ctx.getImageData(drawAtX, drawAtY, 15, 15).data;

          if (shape === 0 || (shape >= 24 && shape <= 27)) {
            // Draw ball
            spriteManager.balls[shape === 0 ? 0 : shape - 24].draw(ctx, drawAtX + 1, drawAtY + 1);
          } else {
            // Draw specials (Holes, teleports...)
            spriteManager.special[shape].draw(ctx, drawAtX, drawAtY);
          }

          const tileImageData = ctx.getImageData(drawAtX, drawAtY, 15, 15);
          const tilePixels = tileImageData.data;
          for (let i = 0; i < tilePixels.length; i += 4) {
            if (rgbToLong(tilePixels[i], tilePixels[i + 1], tilePixels[i + 2]) == 0xccccff || tilePixels[i + 3] == 0) {
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
        ctx.putImageData(tileImageData, drawAtX, drawAtY);
      }
    }
  }
}
