import { HALF_TILE, TILE_SIZE } from './constants';

class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }
  sub(other: Point): Point {
    return new Point(this.x - other.x, this.y - other.y);
  }
  div(other: Point): Point {
    return new Point(this.x / other.x, this.y / other.y);
  }
  mul(other: Point): Point {
    return new Point(this.x * other.x, this.y * other.y);
  }
  toScreen(): Point {
    return new Point(this.x * TILE_SIZE + HALF_TILE, this.y * TILE_SIZE + HALF_TILE);
  }
  toMap(): Point {
    return new Point(this.x / TILE_SIZE, this.y / TILE_SIZE);
  }
}

export default Point;
