import { MAP_HEIGHT, MAP_WIDTH } from './constants';
import { Tile } from './tile';

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
  height = MAP_HEIGHT
): MinigolfMap {
  if (tiles.length !== width || tiles.some((t) => t.length !== height)) {
    throw new Error(
      `Invalid Map Size: ${tiles.length}x${tiles[0].length} expected: ${width}x${height}`
    );
  }

  return {
    width,
    height,
    tiles,
  };
}
