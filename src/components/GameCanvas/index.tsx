import * as PIXI from "pixi.js";
import React, { useEffect, useRef, useState } from "react";
import { gameLoop } from "../../game";
import "./styles.scss";

function GameCanvas() {
  const [app, setApp] = useState<PIXI.Application>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const app = new PIXI.Application({
      height: 375,
      width: 735,
      view: canvasRef.current,
      backgroundColor: 0x16aa16,
    });
    gameLoop(app);
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
