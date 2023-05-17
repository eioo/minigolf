import React from 'react';
import { GameMode, GameModePath } from '../../types';
import Button from '../Button';
import styles from './GameModeCard.module.scss';

interface GameModeCardProps {
  gameMode: GameMode;
}

const GAME_MODE_TO_URL_MAP: Record<GameMode, GameModePath> = {
  'Single player': 'single',
  'Dual player': 'dual',
  Multiplayer: 'multi',
};

function GameModeCard({ gameMode }: GameModeCardProps) {
  return (
    <div className={styles['game-mode-card']}>
      <h1>{gameMode}</h1>
      <Button href={`/lobby/${GAME_MODE_TO_URL_MAP[gameMode]}`}>{gameMode}</Button>
    </div>
  );
}

export default GameModeCard;
