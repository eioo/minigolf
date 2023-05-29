import { useLocation } from 'wouter';
import { LobbyType } from '../types';
import DualPlayerLobby from './DualPlayerLobby';
import MultiplayerLobby from './MultiplayerLobby';
import SinglePlayerLobby from './SinglePlayerLobby';

export interface LobbyProps {
  lobbyType: LobbyType;
}

export default function Lobby({ lobbyType }: LobbyProps) {
  const [, setLocation] = useLocation();

  if (lobbyType === 'single') {
    return <SinglePlayerLobby />;
  }

  if (lobbyType === 'dual') {
    return <DualPlayerLobby />;
  }

  if (lobbyType === 'multi') {
    return <MultiplayerLobby />;
  }

  setLocation('/');
  return null;
}
