import * as PIXI from "pixi.js";
import { loadSpritesheet } from "./spritesheets";

export async function gameLoop(app: PIXI.Application) {
  const elementsTexture = await loadSpritesheet("assets/sprites/elements.json");

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const spr = PIXI.Sprite.from(elementsTexture?.textures["hill-e"]);
      spr.x += x * 15;
      spr.y += y * 15;
      app.stage.addChild(spr);
    }
  }

  console.log("hello");
}
