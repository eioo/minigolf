import React, { useEffect } from 'react';
import { useT } from 'talkr';
import Button, { ButtonProps } from '../components/Button';
import LobbyChat from '../components/LobbyChat';
import Stack from '../components/Stack';
import { socket } from '../socket';

const SIDE_BUTTON_PROPS: Partial<ButtonProps> = {
  size: 'small',
  style: {
    width: '90px',
  },
};

function SinglePlayerLobby() {
  const { T } = useT();

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

      <Stack direction="row" justifyContent="space-between" gap="10px">
        <LobbyChat />

        <Stack justifyContent="space-between">
          <Button variant="yellow" href="/" {...SIDE_BUTTON_PROPS}>
            {T('LobbyControl_Main')}
          </Button>
          <Stack gap="7px">
            <Button href="/lobby/dual" {...SIDE_BUTTON_PROPS}>
              {T('LobbySelect_DualPlayer')}
            </Button>
            <Button href="/lobby/multi" {...SIDE_BUTTON_PROPS}>
              {T('LobbySelect_MultiPlayer')}
            </Button>
            <Button variant="red" href="/" {...SIDE_BUTTON_PROPS}>
              {T('LobbySelect_Quit')}
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
          {T('LobbySelect_SinglePlayer')}
        </h1>
      </div>
    </div>
  );
}

export default SinglePlayerLobby;
