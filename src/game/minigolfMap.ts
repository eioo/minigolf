import { MAP_HEIGHT, MAP_WIDTH } from "./contants";
import { Tile } from "./tile";

export interface MinigolfMap {
  height: number;
  width: number;
  tiles: Tile[][];
}

/**
 * Creates new minigolf map
 */
export function createMap(
  tiles: Tile[][],
  width = MAP_WIDTH,
  height = MAP_HEIGHT,
): MinigolfMap {
  if (tiles.length !== width || tiles.some((t) => t.length !== height)) {
    throw new Error("Invalid Map Size: must be 49*25");
  }

  return {
    width,
    height,
    tiles,
  };
}
