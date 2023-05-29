import { useT } from 'talkr';
import { LobbyType } from '~/types';

export function useLobbyName(lobbyType: LobbyType) {
  const { T } = useT();

  switch (lobbyType) {
    case 'single':
      return T('LobbySelect_SinglePlayer');
    case 'dual':
      return T('LobbySelect_DualPlayer');
    case 'multi':
      return T('LobbySelect_MultiPlayer');
  }
}
