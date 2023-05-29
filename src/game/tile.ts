export interface Tile {
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
  isStartPosition: boolean;
  isHole: boolean;
  isPassable: boolean;
  tileCode: number;
}

export function createTile(
  /**
   * Shape element index
   */ shape: number,
  /**
   * Foreground element index
   */
  foreground: number,
  /**
   * Background element index
   */
  background: number,
  /**
   * Is special tile?
   */
  isSpecialNum: number,
): Tile {
  const isSpecial = isSpecialNum === 2;

  return {
    shape,
    foreground,
    background,
    isSpecial,
    get isStartPosition(): boolean {
      return isSpecial && (shape == 0 || (shape >= 21 && shape <= 24));
    },
    get tileCode(): number {
      return (isSpecialNum << 24) | (shape << 16) | (foreground << 8) | background;
    },
    get isHole(): boolean {
      return isSpecial && shape == 1;
    },
    get isPassable(): boolean {
      return !(!isSpecial && (foreground === 12 || foreground === 13 || (foreground >= 16 && foreground <= 18)));
    },
  };
}
