import React from 'react';

function Loading() {
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
      One moment please...
    </div>
  );
}

export default Loading;
