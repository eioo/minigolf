import { useEffect } from 'react';
import LobbyNavigation from '~/components/LobbyNavigation';
import Stack from '~/components/Stack';
import { socket } from '~/socket';

function MultiplayerLobby() {
  useEffect(() => {
    socket.emit('joinLobby', 'multi');
  }, []);

  return (
    <div>
      <img src="/assets/sprites/bg-lobby-multi.gif" />
      <Stack direction="row" justifyContent="flex-end">
        <LobbyNavigation lobbyType="multi" />
      </Stack>
    </div>
  );
}

export default MultiplayerLobby;
