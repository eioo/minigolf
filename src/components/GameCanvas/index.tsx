import React, { useEffect, useRef, useState } from "react";
import { Game, startGame } from "../../game";
import { GAME_HEIGHT, GAME_WIDTH } from "../../game/constants";
import "./styles.scss";

function GameCanvas() {
  const [game, setGame] = useState<Game>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursorCanvas = cursorCanvasRef.current;
    if (!canvas || !cursorCanvas) return;
    startGame(canvas, cursorCanvas).then(setGame);
  }, [canvasRef]);

  useEffect(() => {
    return () => game?.cleanUp();
  }, [game]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="game-canvas"
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
      <canvas
        ref={cursorCanvasRef}
        className="game-canvas"
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
    </>
  );
}

export default GameCanvas;
