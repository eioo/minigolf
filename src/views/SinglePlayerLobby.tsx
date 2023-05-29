import { useEffect } from 'react';
import LobbyChat from '../components/LobbyChat';
import LobbyNavigation from '../components/LobbyNavigation';
import LobbyTitle from '../components/LobbyTitle';
import Stack from '../components/Stack';
import { socket } from '../socket';

function SinglePlayerLobby() {
  useEffect(() => {
    socket.emit('joinLobby', 'single');

    return () => {
      socket.emit('leaveLobby');
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <img src="/assets/sprites/bg-lobby-single.gif" draggable="false" />

      <LobbyTitle lobbyType="single" />

      <Stack direction="row" justifyContent="space-between" gap="10px">
        <LobbyChat />
        <LobbyNavigation lobbyType="single" />
      </Stack>
    </div>
  );
}

export default SinglePlayerLobby;
