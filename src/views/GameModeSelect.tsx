import React from 'react';
import Button from '../components/Button';
import GameModeCard from '../components/GameModeCard';
import styles from './GameModeSelect.module.scss';

export function GameModeSelect() {
  return (
    <div className={styles.container}>
      <img src="assets/sprites/bg-lobbyselect.gif" />
      <div className={styles['card-container']}>
        <GameModeCard gameMode="Single player" />
        <GameModeCard gameMode="Dual player" />
        <GameModeCard gameMode="Multiplayer" />
      </div>

      <Button className={styles['quick-start-button']} variant="blue" size="small">
        Quick start
      </Button>
    </div>
  );
}
