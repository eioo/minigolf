import { ElementEnum, ShapeEnum, SpecialTypeEnum } from './constants';

/**
 * Represents one map tile
 */
export class Tile {
  public shape: number;

  /**
   * `Tile.shape` is set depending on what the special value is.
   *
   * @param special Special element type index
   * @param shape Shape index
   *
   * @param foreground  Foreground element index
   * @param background  Background element index
   */
  constructor(
    public special: SpecialTypeEnum,
    shape: ShapeEnum,
    public foreground: ElementEnum,
    public background: ElementEnum,
  ) {
    this.shape = Number(ShapeEnum[special === 2 ? shape : shape + 24]);
  }

  /**
   * Returns tile code of tile
   */
  get tileCode(): number {
    return (this.special << 24) | (this.shape << 16) | (this.foreground << 8) | this.background;
  }

  /**
   * Creates new `Tile` object from tile code
   * @param tileCode
   * @returns
   */
  static newFromTileCode(tileCode: number): Tile {
    const special = tileCode >> 24;
    const shape = (tileCode >> 16) % 256;
    const foreground = (tileCode >> 8) % 256;
    const background = tileCode % 256;
    return new Tile(special, shape, foreground, background);
  }
}
