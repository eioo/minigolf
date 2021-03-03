import { onMouseDown, onMouseMove } from "./input";
import { decompressMap } from "./mapParser";
import { drawAimLine, renderMap } from "./renderer";
import { loadSpritesheets } from "./spriteManager";
import { parseTrack } from "./track";

export interface Game {
  loadTrack: (mapName: string) => void;
  cleanUp: () => void;
}

export async function startGame(
  canvas: HTMLCanvasElement,
  cursorCanvas: HTMLCanvasElement,
): Promise<Game> {
  const ctx = canvas.getContext("2d");
  const cursorCtx = cursorCanvas.getContext("2d");

  if (!ctx || !cursorCtx) {
    throw new Error("Could not get canvas drawing context");
  }

  globalThis.game = {
    canvas,
    canvasRect: canvas.getBoundingClientRect(),
    cursorCanvas,
    ctx,
    cursorCtx,
    playerX: [],
    playerY: [],
    speedX: [],
    speedY: [],
    mouseX: -1,
    mouseY: -1,
    currentPlayerId: 0,
    shootingMode: 0,
    mod: 0,
    gameBusy: false,
    cursorImgData: cursorCtx.getImageData(
      0,
      0,
      cursorCanvas.width,
      cursorCanvas.height,
    ),
    currentMap: null,
  };

  const loadTrack = async (mapName: string) => {
    console.log(`Loading track "${mapName}""`);

    // Fetch map
    const res = await fetch(`/assets/tracks/${mapName}.track`);
    const trackStr = await res.text();
    const track = parseTrack(trackStr);
    const map = decompressMap(track.mapData);
    globalThis.game.currentMap = map;

    // Render map
    const { startPositions } = await renderMap(map);
    game.playerX = startPositions.map((p) => p[0]);
    game.playerY = startPositions.map((p) => p[1]);

    // Listen mouse events
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    drawAimLine();
  };

  await loadSpritesheets(ctx, [
    ["balls", 8, 4, 13, 13],
    ["elements", 24, 4, 15, 15],
    ["shapes", 28, 4, 15, 15],
    ["special", 28, 4, 15, 15],
  ]);

  fetch("/assets/tracks/tracks.json")
    .then((r) => r.json())
    .then(async (tracks: string[]) => {
      const sortedTracks = tracks.sort();
      const randIndex = Math.floor(Math.random() * sortedTracks.length);
      loadTrack(sortedTracks[randIndex]);
    });

  return {
    loadTrack,
    cleanUp: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cursorCtx.clearRect(0, 0, canvas.width, canvas.height);
      cursorCanvas.removeEventListener("mousedown", onMouseDown);
      cursorCanvas.removeEventListener("mousemove", onMouseMove);
    },
  };
}
