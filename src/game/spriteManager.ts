import * as PIXI from "pixi.js";

export async function loadSpritesheet(
  resource: string,
): Promise<PIXI.Spritesheet | undefined> {
  return new Promise((resolve) => {
    if (resource in PIXI.Loader.shared.resources) {
      return resolve(PIXI.Loader.shared.resources[resource].spritesheet);
    }

    PIXI.Loader.shared.add(resource).load(() => {
      resolve(PIXI.Loader.shared.resources[resource].spritesheet);
    });
  });
}
export const spriteManager = {
  preload: () => {},
};
