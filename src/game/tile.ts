import { Shape1, Shape2 } from './constants';

/**
 * Represents one map tile
 */
export class Tile {
  public shape: number;

  /**
   * `Tile.shape` is set depending on what the special value is.
   * @param special Special element type index
   * @param shape Shape element index
   * @param foreground  Foreground element index
   * @param background  Background element index
   */
  constructor(public special: number, shape: number, public foreground: number, public background: number) {
    this.shape = Number(special === 2 ? Shape1[shape] : Shape2[shape]);
  }

  get tileCode(): number {
    return (this.special << 24) | (this.shape << 16) | (this.foreground << 8) | this.background;
  }

  static newFromTileCode(tileCode: number): Tile {
    const special = tileCode >> 24;
    const shape = (tileCode >> 16) % 256;
    const foreground = (tileCode >> 8) % 256;
    const background = tileCode % 256;
    return new Tile(special, shape, foreground, background);
  }
}
