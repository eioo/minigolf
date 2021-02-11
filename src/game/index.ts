import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import { drawDashedLine, drawLine } from "./draw";
import { decompressMap, MinigolfMap } from "./mapParser";
import { renderMap } from "./renderer";
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

  let currentMap: MinigolfMap;

  const loadTrack = async (mapName: string) => {
    const res = await fetch(`/assets/tracks/${mapName}.track`);
    const trackStr = await res.text();
    const track = parseTrack(trackStr);
    currentMap = decompressMap(track.mapData);
    await renderMap(ctx, currentMap);
  };

  await loadSpritesheets(ctx, [
    ["balls", 8, 4, 13, 13],
    ["elements", 24, 4, 15, 15],
    ["shapes", 28, 4, 15, 15],
    ["special", 28, 4, 15, 15],
  ]);

  let trackChangeInterval: number;

  fetch("/assets/tracks/tracks.json")
    .then((r) => r.json())
    .then(async (tracks: string[]) => {
      const sortedTracks = tracks.sort();
      /* let currentIndex = 0; */
      loadTrack(sortedTracks[0]);

      /*  const nextTrack = () => {
        loadTrack(sortedTracks[currentIndex]);
        currentIndex++;
      };
      trackChangeInterval = setInterval(() => nextTrack(), 750);
      nextTrack(); */
    });

  const midX = Math.floor(GAME_WIDTH / 2);
  const midY = Math.floor(GAME_HEIGHT / 2);

  const cursorImgData = cursorCtx.getImageData(
    0,
    0,
    cursorCanvas.width,
    cursorCanvas.height,
  );

  cursorCanvas.addEventListener("mousemove", (e) => {
    cursorImgData.data.fill(0);
    drawLine(cursorImgData, midX, midY, e.offsetX, e.offsetY);
    drawDashedLine(
      cursorImgData,
      midX,
      midY,
      -(e.offsetX - midX),
      -(e.offsetY - midY),
    );
    cursorCtx.putImageData(cursorImgData, 0, 0);
  });

  return {
    loadTrack,
    cleanUp: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clearInterval(trackChangeInterval);
    },
  };
}
