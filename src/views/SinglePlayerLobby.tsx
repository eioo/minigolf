import React, { useEffect } from 'react';
import Button from '../components/Button';
import LobbyChat from '../components/LobbyChat';
import Stack from '../components/Stack';
import { socket } from '../socket';

function SinglePlayerLobby() {
  useEffect(() => {
    socket.emit('joinLobby', 'Single player');
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

      <Stack direction="row" justifyContent="space-between" gap="10px">
        <LobbyChat />

        <Stack justifyContent="space-between">
          {/* TODO: This "≪" doesn't look like correct character */}
          <Button
            variant="yellow"
            size="small"
            href="/"
            style={{
              width: '90px',
            }}
          >
            ≪ Back
          </Button>
          <Stack gap="7px">
            {/* <Button size="small" style={{}}>
            Single player
            </Button> */}
            <Button
              size="small"
              href="/lobby/dual"
              style={{
                width: '90px',
              }}
            >
              Dual player
            </Button>
            <Button
              size="small"
              href="/lobby/multi"
              style={{
                width: '90px',
              }}
            >
              Multiplayer
            </Button>
            <Button
              size="small"
              variant="red"
              href="/"
              style={{
                width: '90px',
              }}
            >
              Quit
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        <h1
          style={{
            position: 'absolute',
            left: '278px',
            top: '-8px',
          }}
        >
          Single player
        </h1>
      </div>
    </div>
  );
}

export default SinglePlayerLobby;
