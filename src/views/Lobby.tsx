import React from 'react';
import { useLocation } from 'wouter';
import { GameModePath } from '../types';
import DualPlayerLobby from './DualPlayerLobby';
import MultiplayerLobby from './MultiplayerLobby';
import SinglePlayerLobby from './SinglePlayerLobby';

export interface LobbyProps {
  gameMode: GameModePath;
}

export default function Lobby({ gameMode }: LobbyProps) {
  const [, setLocation] = useLocation();

  if (gameMode === 'single') {
    return <SinglePlayerLobby />;
  }

  if (gameMode === 'dual') {
    return <DualPlayerLobby />;
  }

  if (gameMode === 'multi') {
    return <MultiplayerLobby />;
  }

  setLocation('/');
  return null;
}
