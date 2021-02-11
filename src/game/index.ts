import { decompressMap, MinigolfMap } from "./mapParser";
import { renderMap } from "./renderer";
import { loadSpritesheets } from "./spriteManager";
import { parseTrack } from "./track";

export interface Game {
  loadTrack: (mapName: string) => void;
  cleanUp: () => void;
}

export async function startGame(canvas: HTMLCanvasElement): Promise<Game> {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
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
      let currentIndex = 0;
      const nextTrack = () => {
        loadTrack(sortedTracks[currentIndex]);
        currentIndex++;
      };
      trackChangeInterval = setInterval(() => nextTrack(), 750);
      nextTrack();
    });

  return {
    loadTrack,
    cleanUp: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clearInterval(trackChangeInterval);
    },
  };
}
