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

export async function loadAllTextures() {
  const load = async (texture: string): Promise<PIXI.Texture[]> => {
    const spritesheet = await loadSpritesheet(
      `/assets/sprites/${texture}.json`,
    );
    return Object.values(spritesheet?.textures) || [];
  };

  const textures = {
    shapes: await load("shapes"),
    elements: await load("elements"),
    balls: await load("balls"),
    special: await load("special"),
  } as const;

  return textures;
}
