import * as PIXI from "pixi.js";
import { TILE_SIZE } from "./contants";
import { MinigolfMap } from "./mapParser";
import { loadAllTextures } from "./spriteManager";

export async function renderMap(app: PIXI.Application, map: MinigolfMap) {
  const textures = await loadAllTextures();

  const drawAt = (texture: PIXI.Texture, x: number, y: number) => {
    const sprite = PIXI.Sprite.from(texture);
    sprite.x += x;
    sprite.y += y;
    app.stage.addChild(sprite);
  };

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tile = map.tiles[x][y];
      const { background, foreground, shape, isSpecial } = tile;

      const drawAtX = x * TILE_SIZE;
      const drawAtY = y * TILE_SIZE;

      if (isSpecial || shape === 0) {
        drawAt(textures.elements[background], drawAtX, drawAtY);
        drawAt(textures.elements[foreground], drawAtX, drawAtY);

        if (isSpecial && shape !== 4 && shape !== 6) {
          // 4 and 6 are mines
          if (shape === 0 || (shape >= 24 && shape <= 27)) {
            // Draw ball
            drawAt(
              textures.balls[shape === 0 ? 0 : shape - 24],
              drawAtX + 1, // Balls are 13x13
              drawAtY + 1,
            );
          } else {
            // Draw specials (Holes, teleports...)
            drawAt(textures.special[shape], drawAtX, drawAtY);
          }
        }
      } else if (!isSpecial && shape > 0) {
        // Render background
        const bgSprite = PIXI.Sprite.from(textures.elements[background]);
        bgSprite.x = drawAtX;
        bgSprite.y = drawAtY;
        app.stage.addChild(bgSprite);

        // Render
        const fgContainer = new PIXI.Container();
        const fgSprite = PIXI.Sprite.from(textures.elements[foreground]);
        fgContainer.addChild(fgSprite);
        fgContainer.x = drawAtX;
        fgContainer.y = drawAtY;

        const shapeMask = PIXI.Sprite.from(textures.shapes[shape]);
        shapeMask.x = drawAtX;
        shapeMask.y = drawAtY;
        fgContainer.mask = shapeMask;
        app.stage.addChild(shapeMask);
        app.stage.addChild(fgContainer);
      }
    }
  }
}
