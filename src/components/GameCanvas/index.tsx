import React, { useEffect, useRef, useState } from "react";
import { Game, startGame } from "../../game";
import { GAME_WIDTH, GAME_HEIGHT } from "../../game/constants";
import "./styles.scss";

function GameCanvas() {
  const [game, setGame] = useState<Game>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    startGame(canvas).then(setGame);
  }, [canvasRef]);

  useEffect(() => {
    return () => game?.cleanUp();
  }, [game]);

  return (
    <canvas ref={canvasRef} className="game-canvas" width={GAME_WIDTH} height={GAME_HEIGHT} />
  );
}

export default GameCanvas;
