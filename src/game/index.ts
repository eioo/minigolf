import { HALF_BALL } from "./constants";
import { decompressMap } from "./mapParser";
import { MinigolfMap } from "./minigolfMap";
import { getStrokePower, isPosInsideBall } from "./physics";
import { drawAimLine, drawBall, renderMap } from "./renderer";
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

  let playerX: number[] = [];
  let playerY: number[] = [];
  let speedX: number[] = [];
  let speedY: number[] = [];
  let mouseX: number;
  let mouseY: number;
  let currentPlayerId = 0;
  let shootingMode = 0; // Varies from 0-4

  if (!ctx || !cursorCtx) {
    throw new Error("Could not get canvas drawing context");
  }

  let currentMap: MinigolfMap;

  const cursorImgData = cursorCtx.getImageData(
    0,
    0,
    cursorCanvas.width,
    cursorCanvas.height,
  );

  const canvasRect = canvas.getBoundingClientRect();
  const mouseEventToPos = (evt: MouseEvent) => {
    return [evt.clientX - canvasRect.left, evt.clientY - canvasRect.top];
  };

  const draw = () => {
    drawAimLine(
      cursorCtx,
      cursorImgData,
      playerX[currentPlayerId],
      playerY[currentPlayerId],
      mouseX,
      mouseY,
      shootingMode,
    );
    drawBall(
      cursorCtx,
      currentPlayerId,
      playerX[currentPlayerId],
      playerY[currentPlayerId],
    );
  };

  const onMouseMove = (evt: MouseEvent) => {
    const pos = mouseEventToPos(evt);
    mouseX = pos[0];
    mouseY = pos[1];
    draw();
  };

  const getBallPos = (playerId = currentPlayerId) =>
    [playerX[playerId] + HALF_BALL, playerY[playerId] + HALF_BALL] as const;

  const getPlayerPos = (playerId = currentPlayerId) =>
    [playerX[playerId], playerY[playerId]] as const;

  function doStroke(playerId: number, mouseX: number, mouseY: number, mod = 0) {
    const [powerX, powerY] = getStrokePower(...getPlayerPos(), mouseX, mouseY);
    speedX[playerId] = powerX;
    speedY[playerId] = powerY;

    if (mod == 1) {
      speedX[playerId] = -speedX[playerId];
      speedY[playerId] = -speedY[playerId];
    }

    if (mod == 2) {
      speedX[playerId] = speedY[playerId];
      speedY[playerId] = -speedX[playerId];
    }

    if (mod == 3) {
      speedX[playerId] = -speedY[playerId];
      speedY[playerId] = speedX[playerId];
    }

    const speed = Math.sqrt(
      speedX[playerId] * speedX[playerId] + speedY[playerId] * speedY[playerId],
    );
    let scaledSpeed = speed / 6.5; // Some scaling? Not sure
    scaledSpeed *= scaledSpeed; // ?

    // Apply random from seed. Disabled currently
    speedX[playerId] += scaledSpeed / 100000.0 - 0.25; //* ((double) (this.aSeed_2836.next() % '\uc351') / 100000.0D - 0.25D);
    speedY[playerId] += scaledSpeed / 100000.0 - 0.25; //* ((double) (this.aSeed_2836.next() % '\uc351') / 100000.0D - 0.25D);

    /*
    isLocalPlayer = isLocalPlayer;
    gameState = 2;
    Boolean2843 = false;

    strokeThread = new Thread(this);
    strokeThread.start();
    */
  }

  const onMouseDown = (evt: MouseEvent) => {
    const pos = mouseEventToPos(evt);
    mouseX = pos[0];
    mouseY = pos[1];

    if ([1, 2].includes(evt.button)) {
      if (shootingMode < 3) {
        shootingMode += 1;
      } else {
        shootingMode = 0;
      }

      draw();
      console.log("Switched shooting mode to", shootingMode);
      return;
    }

    console.log({
      mouseX,
      mouseY,
      playerX: playerX[currentPlayerId],
      playerY: playerY[currentPlayerId],
    });
    if (
      isPosInsideBall(
        mouseX,
        mouseY,
        playerX[currentPlayerId],
        playerY[currentPlayerId],
      )
    ) {
      return;
    }

    doStroke(currentPlayerId, mouseX, mouseY, 0);
    console.log(`Doing stroke @ (${mouseX}, ${mouseY})`);
  };

  const loadTrack = async (mapName: string) => {
    console.log(`Loading track "${mapName}""`);

    // Fetch map
    const res = await fetch(`/assets/tracks/${mapName}.track`);
    const trackStr = await res.text();
    const track = parseTrack(trackStr);
    currentMap = decompressMap(track.mapData);

    // Render map
    const { startPositions } = await renderMap(ctx, currentMap);
    playerX = startPositions.map((p) => p[0]);
    playerY = startPositions.map((p) => p[1]);

    // Listen mouse events
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    draw();
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
