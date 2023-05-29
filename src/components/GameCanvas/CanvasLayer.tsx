import { CanvasHTMLAttributes, forwardRef } from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from '../../game/constants';

type GameCanvasLayerProps = CanvasHTMLAttributes<HTMLCanvasElement>;

const GameCanvasLayer = forwardRef<HTMLCanvasElement, GameCanvasLayerProps>((props, ref) => (
  <canvas ref={ref} className="game-canvas" width={GAME_WIDTH} height={GAME_HEIGHT} {...props} />
));

GameCanvasLayer.displayName = 'GameCanvasLayer';
export default GameCanvasLayer;
