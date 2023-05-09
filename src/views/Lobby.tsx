import React from 'react';
import { useLocation } from 'wouter';
import DualPlayerLobby from './DualPlayerLobby';
import MultiplayerLobby from './MultiplayerLobby';
import SinglePlayerLobby from './SinglePlayerLobby';

export interface LobbyProps {
  gameMode: 'single' | 'dual' | 'multi';
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
