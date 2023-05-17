import React from 'react';
import Button from '../components/Button';
import LobbyChat from '../components/LobbyChat';
import Stack from '../components/Stack';

function SinglePlayerLobby() {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <img src="/assets/sprites/bg-lobby-single.gif" draggable="false" />

      <Stack direction="row" justifyContent="space-between" gap="10px">
        <LobbyChat players={['kalle']} />

        <Stack justifyContent="space-between">
          {/* TODO: This "≪" doesn't look like correct character */}
          <Button variant="yellow" size="small" href="/">
            ≪ Back
          </Button>
          <Stack gap="7px">
            {/* <Button size="small" style={{}}>
            Single player
            </Button> */}
            <Button size="small" href="/lobby/dual">
              Dual player
            </Button>
            <Button size="small" href="/lobby/multi">
              Multiplayer
            </Button>
            <Button size="small" variant="red" href="/">
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
            top: '-15px',
          }}
        >
          Single player
        </h1>
      </div>
    </div>
  );
}

export default SinglePlayerLobby;
