export const BALL_SIZE = 13;
export const HALF_BALL = 6.5;
export const GAME_WIDTH = 735;
export const GAME_HEIGHT = 375;
export const TILE_SIZE = 15;
export const HALF_TILE = 7.5;
export const MAP_WIDTH = 49;
export const MAP_HEIGHT = 25;

export const DOWNHILLSPEED = 0.025;
export const MAGIC = 0.70710678118; // sin(π/4)
export const DIAGINDEX = 6.0 * MAGIC + 0.5;

export enum SpecialType {
  Normal = 1,
  Special = 2,
}

export enum Shape1 {
  StartPosition, // 24 0
  Hole, // 25 1
  FakeHole, // 26 2
  MoveableBlock, // 27 3
  Mine, // 28 4
  BlownMine, // 29 5
  BigMine, // 30 6
  BlownBigMine, // 31 7
  BlueTeleportStart, // 32 8
  BlueTeleportExit, // 33 9
  RedTeleportStart, // 34 10
  RedTeleportExit, // 35 11
  YellowTeleportStart, // 36 12
  YellowTeleportExit, // 37 13
  GreenTeleportStart, // 38 14
  GreenTeleportExit, // 39 15
  FullBreakable, // 40 16
  ThreeQuaterBreakable, // 41 17
  HalfBreakable, // 42 18
  QuaterBreakable, // 43 19
  MagnetAttract, // 44 20
  MagnetRepel, // 45 21
  MoveableBlock2, // 46 22
  SunkMoveableBlock, // 47 23
  StartPositionBlue, // 48 24
  StartPositionRed, // 49 25
  StartPositionYellow, // 50 26
  StartPositionGreen, // 51 27
}

export enum Element {
  Grass, // 0
  Dirt, // 1
  Mud, // 2
  Ice, // 3
  SpeedN, // 4
  SpeedNE, // 5
  SpeedE, // 6
  SpeedSE, // 7
  SpeedS, // 8
  SpeedSW, // 9
  SpeedW, // 10
  SpeedNW, // 11
  Water, // 12
  Acid, // 13
  WaterSwamp, // 14
  AcidSwamp, // 15
  Block, // 16
  StickyBlock, // 17
  BouncyBlock, // 18
  FakeBlock, // 19
  OnewayN, // 20
  OnewayE, // 21
  OnewayS, // 22
  OnewayW, // 23
}
export enum Shape2 {
  Blank,
  BigCircle,
  SmallCircle,
  Diamond,
  TriangleSE,
  TriangleSW,
  TriangleNW,
  TriangleNE,
  RoundedSE,
  RoundedSW,
  RoundedNW,
  RoundedNE,

  RoundedS,
  RoundedE,
  RoundedN,
  RoundedW,

  TriangleN,
  TriangleE,
  TriangleS,
  TriangleW,

  TriangleNS,
  TriangleWE,
  HalfW,
  HalfS,
  QuaterNE,
  QuaterSE,
  QuaterSW,
  QuaterNW,
}
