import { createMap, MinigolfMap } from "./minigolfMap";
import { createTile, Tile } from "./tile";

const mapChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function parseExpandedData(expandedMapData: string) {
  const tileCodes: number[][] = [];
  let cursorIndex = 0;

  for (let tileY = 0; tileY < 25; tileY++) {
    for (let tileX = 0; tileX < 49; tileX++) {
      let currentMapIndex = mapChars.indexOf(
        expandedMapData.charAt(cursorIndex),
      );

      if (!tileCodes[tileX]) {
        tileCodes[tileX] = [];
      }

      if (currentMapIndex <= 2) {
        let shape;
        let background;
        let foreground;

        shape = mapChars.indexOf(expandedMapData.charAt(cursorIndex + 1));
        background = mapChars.indexOf(expandedMapData.charAt(cursorIndex + 2));

        if (currentMapIndex == 1) {
          foreground = mapChars.indexOf(
            expandedMapData.charAt(cursorIndex + 3),
          );
          cursorIndex += 4;
        } else {
          foreground = 0;
          cursorIndex += 3;
        }

        tileCodes[tileX][tileY] =
          currentMapIndex * 256 * 256 * 256 +
          shape * 256 * 256 +
          background * 256 +
          foreground;
      } else {
        if (currentMapIndex == 3) {
          // tile to west is same as current
          tileCodes[tileX][tileY] = tileCodes[tileX - 1][tileY];
        } else if (currentMapIndex == 4) {
          // tile to the north is same as current
          tileCodes[tileX][tileY] = tileCodes[tileX][tileY - 1];
        } else if (currentMapIndex == 5) {
          // tile to the northwest is same as current
          tileCodes[tileX][tileY] = tileCodes[tileX - 1][tileY - 1];
        } else if (currentMapIndex == 6) {
          // 2 tiles west is same as current (skip a tile to the left)
          tileCodes[tileX][tileY] = tileCodes[tileX - 2][tileY];
        } else if (currentMapIndex == 7) {
          // 2 tiles north is same as current (skip the tile above)
          tileCodes[tileX][tileY] = tileCodes[tileX][tileY - 2];
        } else if (currentMapIndex == 8) {
          // 2 tiles northwest is same as current (skip the diagonal)
          tileCodes[tileX][tileY] = tileCodes[tileX - 2][tileY - 2];
        }

        cursorIndex++;
      }
    }
  }
  return tileCodes;
}

function getExpandAmount(input: string, cursor: number): number {
  let buffer = "";

  while (true) {
    const char = input.charAt(cursor);
    const isNumber = !isNaN(Number(char));

    if (!isNumber) {
      return buffer === "" ? 1 : Number(buffer);
    }

    buffer += char;
    cursor++;
  }
}

function expandData(mapData: string) {
  // Use array for performance
  let buffer: string[] = [];

  for (let charIndex = 0; charIndex < mapData.length; charIndex++) {
    const expandAmount = getExpandAmount(mapData, charIndex);

    if (expandAmount >= 2) charIndex++;
    if (expandAmount >= 10) charIndex++;
    if (expandAmount >= 100) charIndex++;
    if (expandAmount >= 1000) charIndex++;

    const character = mapData.charAt(charIndex);

    for (let i = 0; i < expandAmount; ++i) {
      buffer.push(character);
    }
  }

  return buffer.join("");
}

function convertToTiles(mapCodes: number[][]) {
  const result: Tile[][] = [];

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 49; x++) {
      const tileCode = mapCodes[x][y];
      const isSpecialNum = Math.floor(tileCode / 16777216);
      const shapeIndex = Math.floor(tileCode / 65536) % 256; // Becomes the SpecialIndex if isSpecialNum==2
      const foregroundIndex = Math.floor(tileCode / 256) % 256;
      const backgroundIndex = Math.floor(tileCode % 256);

      if (!result[x]) {
        result[x] = [];
      }

      result[x][y] = createTile(
        shapeIndex,
        foregroundIndex,
        backgroundIndex,
        isSpecialNum,
      );
    }
  }

  return result;
}

export function decompressMap(mapData: string): MinigolfMap {
  // Old maps have categories appended after map data divided by ,
  const expandedMapData = expandData(mapData.split(",")[0]);
  const tileCodes = parseExpandedData(expandedMapData);
  const tiles = convertToTiles(tileCodes);
  return createMap(tiles);
}
