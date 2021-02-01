import * as PIXI from "pixi.js";
import { decompressMap } from "./mapLoader";
import { loadSpritesheet } from "./spritesheet";
import { parseTrack } from "./track";

export async function gameLoop(app: PIXI.Application) {
  const res = await fetch("/assets/tracks/1shot.track");
  const trackStr = await res.text();
  const track = parseTrack(trackStr);
  const map = decompressMap(track.mapData);

  const elementsTexture = await loadSpritesheet(
    "/assets/sprites/elements.json",
  );
  const shapesTexture = await loadSpritesheet("/assets/sprites/shapes.json");
  const elementTextures: PIXI.Texture[] =
    Object.values(elementsTexture?.textures) || [];
  const shapeTextures: PIXI.Texture[] =
    Object.values(elementsTexture?.textures) || [];

  console.log({ tiles: map.tiles });
  map.tiles.forEach((rowTiles, x) => {
    rowTiles.forEach((tile, i) => {
      if (tile.backgroundElementIndex) {
        const bgSprite = PIXI.Sprite.from(
          elementTextures[tile.backgroundElementIndex],
        );
        bgSprite.x += x * 15;
        bgSprite.y += i * 15;
        app.stage.addChild(bgSprite);
      }

      if (tile.foregroundElementIndex) {
        const fgSprite = PIXI.Sprite.from(
          elementTextures[tile.foregroundElementIndex],
        );
        fgSprite.x += x * 15;
        fgSprite.y += i * 15;
        app.stage.addChild(fgSprite);
      }
    });
  });
}
