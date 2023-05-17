import React from 'react';
import { LobbyProps } from '../../views/Lobby';
import Button from '../Button';
import styles from './GameModeCard.module.scss';

interface GameModeCardProps {
  gameMode: 'Single player' | 'Dual player' | 'Multiplayer';
}

const GAME_MODE_TO_URL_MAP: Record<GameModeCardProps['gameMode'], LobbyProps['gameMode']> = {
  'Single player': 'single',
  'Dual player': 'dual',
  Multiplayer: 'multi',
};

function GameModeCard({ gameMode }: GameModeCardProps) {
  return (
    <div className={styles['game-mode-card']}>
      <h2>{gameMode}</h2>
      <Button href={`/lobby/${GAME_MODE_TO_URL_MAP[gameMode]}`}>{gameMode}</Button>
    </div>
  );
}

export default GameModeCard;
