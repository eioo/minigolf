declare var game: {
  canvas: HTMLCanvasElement;
  canvasRect: DOMRect;
  ctx: CanvasRenderingContext2D;
  cursorCanvas: HTMLCanvasElement;
  cursorCtx: CanvasRenderingContext2D;
  playerX: number[];
  playerY: number[];
  speedX: number[];
  speedY: number[];
  mouseX: number;
  mouseY: number;
  currentPlayerId: number;
  shootingMode: number; // Varies from 0-4
  gameBusy: boolean;
  cursorImgData: ImageData;
  mod: 0 | 1 | 2 | 3;
  currentMap: import('./minigolfMap').MinigolfMap | null;
};
