import React, { useEffect } from 'react';
import { socket } from '../socket';

function DualPlayerLobby() {
  useEffect(() => {
    socket.emit('joinLobby', 'dual');
  }, []);

  return (
    <div>
      <img src="/assets/sprites/bg-lobby-dual.gif" />
    </div>
  );
}

export default DualPlayerLobby;
