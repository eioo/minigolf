import React from 'react';
import { useT } from 'talkr';
import { LobbyType } from '../../types';

interface LobbyTitleProps {
  lobbyType: LobbyType;
}

/**
 * @todo Dual & multiplayer titles
 */
function LobbyTitle({ lobbyType }: LobbyTitleProps) {
  const { T } = useT();

  if (lobbyType === 'single') {
    return (
      <div
        style={{
          position: 'absolute',
          top: '3px',
          left: '163px',
          height: '50px',
          width: '405px',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <h1>{T('LobbySelect_SinglePlayer')}</h1>
      </div>
    );
  }

  return null;
}

export default LobbyTitle;
