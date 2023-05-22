import React from 'react';
import { useT } from 'talkr';

function LoadingScreen() {
  const { T } = useT();

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        fontFamily: 'Arial',
        fontSize: '16px',
        fontWeight: 100,
      }}
    >
      {T('Message_WaitWhile')}
    </div>
  );
}

export default LoadingScreen;
