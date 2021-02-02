import * as PIXI from "pixi.js";
import { decompressMap } from "./mapParser";
import { loadSpritesheet } from "./spriteManager";
import { parseTrack } from "./track";

export async function gameLoop(app: PIXI.Application) {
  const res = await fetch("/assets/tracks/1shot.track");
  const trackStr = await res.text();
  const track = parseTrack(trackStr);
  const map = decompressMap(track.mapData);

  const elementSpritesheet = await loadSpritesheet(
    "/assets/sprites/elements.json",
  );
  const elementTextures: PIXI.Texture[] =
    Object.values(elementSpritesheet?.textures) || [];

  const shapeSpritesheet = await loadSpritesheet("/assets/sprites/shapes.json");
  const shapeTextures: PIXI.Texture[] =
    Object.values(shapeSpritesheet?.textures) || [];

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tile = map.tiles[x][y];

      if (tile.background) {
        const bgSprite = PIXI.Sprite.from(elementTextures[tile.background]);
        bgSprite.x += x * 15;
        bgSprite.y += y * 15;
        app.stage.addChild(bgSprite);
      }

      if (tile.foreground) {
        const bgSprite = PIXI.Sprite.from(elementTextures[tile.foreground]);
        bgSprite.x += x * 15;
        bgSprite.y += y * 15;
        app.stage.addChild(bgSprite);
      }

      if (tile.background) {
        const fgSprite = PIXI.Sprite.from(shapeTextures[tile.shape]);

        fgSprite.x += x * 15;
        fgSprite.y += y * 15;
        app.stage.addChild(fgSprite);
      }
    }
  }
}
