import * as PIXI from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from "./contants";
import { decompressMap, MinigolfMap } from "./mapParser";
import { renderMap } from "./renderer";
import { parseTrack } from "./track";

export async function startGame(app: PIXI.Application) {
  let currentMap: MinigolfMap;

  const loadTrack = async (mapName: string) => {
    app.stage.removeChildren();
    const res = await fetch(`/assets/tracks/${mapName}.track`);
    const trackStr = await res.text();
    const track = parseTrack(trackStr);
    currentMap = decompressMap(track.mapData);
    await renderMap(app, currentMap);
  };

  const debugText = new PIXI.Text("", {
    fontFamily: "Arial",
    fontSize: 15,
    fontWeight: "bold",
    fill: 0xff1010,
  });
  app.stage.addChild(debugText);

  app.ticker.add(() => {
    if (!currentMap) {
      return;
    }

    const globalMouse = app.renderer.plugins.interaction.mouse.global;
    const mouseX = globalMouse.x;
    const mouseY = globalMouse.y;

    if (
      mouseX > 0 &&
      mouseX < GAME_WIDTH &&
      mouseY > 0 &&
      mouseY < GAME_HEIGHT
    ) {
      const tileX = Math.floor(mouseX / TILE_SIZE);
      const tileY = Math.floor(mouseY / TILE_SIZE);
      const tile = currentMap.tiles[tileX][tileY];
      debugText.visible = true;
      debugText.x = mouseX + 15;
      debugText.y = mouseY - 50;
      const debugData = [
        [tileX, tileY],
        ["BG:", tile.background],
        ["FG:", tile.foreground],
        ["Special:", tile.isSpecial],
        ["Passable:", tile.isPassable],
        ["isStartPos:", tile.isStartPosition],
      ];

      debugText.text = debugData.map((n) => n.join(" ")).join("\n");
    } else {
      debugText.visible = false;
    }
  });

  fetch("/assets/tracks/tracks.json")
    .then((r) => r.json())
    .then(async (tracks: string[]) => {
      const sortedTracks = tracks.sort();
      let currentIndex = 0;

      setInterval(() => {
        loadTrack(sortedTracks[currentIndex]);
        currentIndex++;
      }, 750);
    });

  return {
    loadTrack,
  };
}
