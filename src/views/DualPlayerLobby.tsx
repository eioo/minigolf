import React, { useEffect } from 'react';
import LobbyNavigation from '../components/LobbyNavigation';
import Stack from '../components/Stack';
import { socket } from '../socket';

function DualPlayerLobby() {
  useEffect(() => {
    socket.emit('joinLobby', 'dual');
  }, []);

  return (
    <div>
      <img src="/assets/sprites/bg-lobby-dual.gif" />
      <Stack direction="row" justifyContent="flex-end" height="100%" alignItems="flex-end">
        <LobbyNavigation lobbyType="dual" />
      </Stack>
    </div>
  );
}

export default DualPlayerLobby;
