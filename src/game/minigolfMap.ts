import Tile from "./tile";

const mapHeight = 25;
const mapWidth = 49;

class MinigolfMap {
  tiles: Tile[][];

  constructor(tiles: Tile[][]) {
    if (
      tiles.length !== mapWidth ||
      tiles.some((t) => t.length !== mapHeight)
    ) {
      throw new Error("Invalid Map Size: must be 49*25");
    }

    this.tiles = tiles;
  }

  printMap(): void {
    for (let y = 0; y < this.tiles[0].length; y++) {
      for (let x = 0; x < this.tiles.length; x++) {
        console.log(this.tiles[x][y].getTileCode().toString(16) + " | ");
      }
      console.log("");
    }
  }
}

export default MinigolfMap;
