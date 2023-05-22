import React, { useEffect } from 'react';
import { socket } from '../socket';

function MultiplayerLobby() {
  useEffect(() => {
    socket.emit('joinLobby', 'multi');
  }, []);

  return (
    <div>
      <img src="/assets/sprites/bg-lobby-multi.gif" />
    </div>
  );
}

export default MultiplayerLobby;
