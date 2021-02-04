import * as PIXI from "pixi.js";
import React, { useEffect, useRef, useState } from "react";
import { startGame } from "../../game";
import { GAME_HEIGHT, GAME_WIDTH } from "../../game/contants";
import "./styles.scss";

function GameCanvas() {
  const [app, setApp] = useState<PIXI.Application>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const app = new PIXI.Application({
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      view: canvasRef.current,
      backgroundColor: 0x16aa16,
    });
    startGame(app);
    setApp(app);

    return () => {
      app.stop();
    };
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef} className="game-canvas" width={735} height={375} />
  );
}

export default GameCanvas;
