import React from 'react';
import { useT } from 'talkr';
import { LobbyType } from '../../types';
import Button from '../Button';
import styles from './GameModeCard.module.scss';

interface GameModeCardProps {
  lobbyType: LobbyType;
}

function GameModeCard({ lobbyType }: GameModeCardProps) {
  const { T } = useT();

  const lobbyName = ((): string => {
    switch (lobbyType) {
      case 'single':
        return T('LobbySelect_SinglePlayer');
      case 'dual':
        return T('LobbySelect_DualPlayer');
      case 'multi':
        return T('LobbySelect_MultiPlayer');
    }
  })();

  return (
    <div className={styles['game-mode-card']}>
      <h1>{lobbyName}</h1>
      <Button href={`/lobby/${lobbyType}`}>{lobbyName}</Button>
    </div>
  );
}

export default GameModeCard;
