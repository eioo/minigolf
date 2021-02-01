import MinigolfMap from "./minigolfMap";
import Tile from "./tile";

const mapChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function parseMap(mapData: string) {
  const mapTiles: number[][] = [];
  let cursorIndex = 0;

  for (let tileY = 0; tileY < 25; ++tileY) {
    for (let tileX = 0; tileX < 49; ++tileX) {
      let currentMapIndex = mapChars.indexOf(mapData.charAt(cursorIndex));

      if (!mapTiles[tileX]) {
        mapTiles[tileX] = [];
      }
      if (!mapTiles[tileX]) {
        mapTiles[tileX] = [];
      }

      if (currentMapIndex <= 2) {
        // if input= A,B or C
        let mapcursor_one_ahead;
        let mapcursor_two_ahead;
        let mapcursor_three_ahead;

        if (currentMapIndex == 1) {
          // if input = B.
          mapcursor_one_ahead = mapChars.indexOf(
            mapData.charAt(cursorIndex + 1),
          );
          mapcursor_two_ahead = mapChars.indexOf(
            mapData.charAt(cursorIndex + 2),
          );
          mapcursor_three_ahead = mapChars.indexOf(
            mapData.charAt(cursorIndex + 3),
          );
          cursorIndex += 4;
        } else {
          // if input = A or C
          mapcursor_one_ahead = mapChars.indexOf(
            mapData.charAt(cursorIndex + 1),
          );
          mapcursor_two_ahead = mapChars.indexOf(
            mapData.charAt(cursorIndex + 2),
          );
          mapcursor_three_ahead = 0;
          cursorIndex += 3;
        }

        // (currentMapIndex << 24) + (mapcursor_one_ahead << 16) + (mapcursor_two_ahead << 8) + mapcursor_three_ahead;
        mapTiles[tileX][tileY] =
          currentMapIndex * 256 * 256 * 256 +
          mapcursor_one_ahead * 256 * 256 +
          mapcursor_two_ahead * 256 +
          mapcursor_three_ahead;
      } else {
        if (currentMapIndex == 3) {
          // if input = D
          mapTiles[tileX][tileY] = mapTiles[tileX - 1][tileY]; // tile to west is same as current
        }

        if (currentMapIndex == 4) {
          // if input = E;
          mapTiles[tileX][tileY] = mapTiles[tileX][tileY - 1]; // tile to the north is same as current
        }

        if (currentMapIndex == 5) {
          // if input = F;
          mapTiles[tileX][tileY] = mapTiles[tileX - 1][tileY - 1]; // tile to the northwest is same as current
        }

        if (currentMapIndex == 6) {
          // if input = G;
          mapTiles[tileX][tileY] = mapTiles[tileX - 2][tileY]; // 2 tiles west is same as current (skip a tile to the left)
        }

        if (currentMapIndex == 7) {
          // if input = H
          mapTiles[tileX][tileY] = mapTiles[tileX][tileY - 2]; // 2 tiles north is same as current (skip the tile above)
        }

        if (currentMapIndex == 8) {
          // if input= I
          mapTiles[tileX][tileY] = mapTiles[tileX - 2][tileY - 2]; // 2 tiles northwest is same as current (skip the diagonal)
        }

        ++cursorIndex;
      }
    }
  }
  return mapTiles;
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

function expandMap(mapString: string) {
  let buffer = "";
  let loopCount = 0;

  for (let charIndex = 0; charIndex < mapString.length; charIndex++) {
    const expandAmount = getExpandAmount(mapString, charIndex);

    if (loopCount > 10000) {
      return "";
    }

    loopCount++;

    if (expandAmount >= 2) charIndex++;
    if (expandAmount >= 10) charIndex++;
    if (expandAmount >= 100) charIndex++;
    if (expandAmount >= 1000) charIndex++;

    const character = mapString.charAt(charIndex);

    for (let i = 0; i < expandAmount; ++i) {
      buffer += character;
    }
  }

  return buffer;
}

function convertCodesToTiles(mapCodes: number[][]) {
  const result: Tile[][] = [];

  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 49; x++) {
      const tileCode = mapCodes[x][y];
      const isNoSpecial = Math.floor(tileCode / 16777216);
      const shapeIndex = Math.floor(tileCode / 65536) % 256; // Becomes the SpecialIndex if isNoSpecial==2
      const foregroundElementIndex = Math.floor(tileCode / 256) % 256;
      const backgroundElementIndex = Math.floor(tileCode % 256);
      if (!result[x]) {
        result[x] = [];
      }
      result[x][y] = new Tile(
        shapeIndex,
        foregroundElementIndex,
        backgroundElementIndex,
        isNoSpecial,
      );
    }
  }

  return result;
}

export function decompressMap(mapData: string) {
  const expandData = expandMap(mapData);
  const mapCodes = parseMap(expandData);
  const mapTiles = convertCodesToTiles(mapCodes);
  return new MinigolfMap(mapTiles);
}
