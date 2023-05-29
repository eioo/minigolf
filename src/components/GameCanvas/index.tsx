import { useEffect, useRef } from 'react';
import { Game, startGame } from '../../game';
import GameCanvasLayer from './CanvasLayer';
import './styles.scss';

function GameCanvas() {
  const gameRef = useRef<Game>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (gameRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const cursorCanvas = cursorCanvasRef.current;

    if (!canvas || !cursorCanvas) {
      return;
    }

    startGame(canvas, cursorCanvas).then((game) => (gameRef.current = game));
  }, [canvasRef]);

  useEffect(() => {
    return () => gameRef.current?.cleanUp();
  }, []);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <GameCanvasLayer ref={canvasRef} />
      <GameCanvasLayer ref={cursorCanvasRef} />
    </div>
  );
}

export default GameCanvas;
