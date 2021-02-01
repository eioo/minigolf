class Tile {
  shapeIndex: number;
  backgroundElementIndex: number;
  foregroundElementIndex: number;
  isSpecialNum: number;

  constructor(
    shape: number,
    background: number,
    foreground: number,
    isSpecialNum: number,
  ) {
    this.shapeIndex = shape;
    this.backgroundElementIndex = background;
    this.foregroundElementIndex = foreground;
    this.isSpecialNum = isSpecialNum;
  }

  public isSpecial(): boolean {
    return this.isSpecialNum == 2;
  }

  public isStartPosition(): boolean {
    return (
      this.isSpecial() &&
      (this.shapeIndex == 0 || (this.shapeIndex >= 21 && this.shapeIndex <= 24))
    );
  }

  public isHole(): boolean {
    return this.isSpecial() && this.shapeIndex == 1;
  }

  public isPassable(): boolean {
    return !(
      !this.isSpecial() &&
      (this.backgroundElementIndex == 12 ||
        this.backgroundElementIndex == 13 ||
        (this.backgroundElementIndex >= 16 &&
          this.backgroundElementIndex <= 18))
    );
  }

  public getTileCode(): number {
    return (
      (this.isSpecialNum << 24) |
      (this.shapeIndex << 16) |
      (this.backgroundElementIndex << 8) |
      this.foregroundElementIndex
    );
  }
}

export default Tile;
