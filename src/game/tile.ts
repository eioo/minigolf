class Tile {
  /**
   * Shape element index
   */
  shape: number;
  /**
   * Foreground element index
   */
  foreground: number;
  /**
   * Background element index
   */
  background: number;
  /**
   * Is special tile?
   */
  isSpecial: boolean;
  /**
   * Not sure what this is, but it decides what `isSpecial` will become
   */
  isSpecialNum: number;

  constructor(
    shape: number,
    background: number,
    foreground: number,
    isSpecialNum: number,
  ) {
    this.shape = shape;
    this.foreground = background;
    this.background = foreground;
    this.isSpecial = isSpecialNum === 2;
    this.isSpecialNum = isSpecialNum;
  }

  public isStartPosition(): boolean {
    return (
      this.isSpecial &&
      (this.shape == 0 || (this.shape >= 21 && this.shape <= 24))
    );
  }

  public isHole(): boolean {
    return this.isSpecial && this.shape == 1;
  }

  public isPassable(): boolean {
    return !(
      !this.isSpecial &&
      (this.foreground == 12 ||
        this.foreground == 13 ||
        (this.foreground >= 16 && this.foreground <= 18))
    );
  }

  public getTileCode(): number {
    return (
      (this.isSpecialNum << 24) |
      (this.shape << 16) |
      (this.foreground << 8) |
      this.background
    );
  }
}

export default Tile;
