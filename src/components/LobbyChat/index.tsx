import React, { useState } from 'react';
import styles from './LobbyChat.module.scss';

interface LobbyChatProps {
  players: string[];
}

function LobbyChat({ players }: LobbyChatProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string>();
  const [membersSortMode, setMembersSortMode] = useState<'registered' | 'nickname'>('registered');

  return (
    <div className={styles.root}>
      <div className={styles['chat-header']}>
        <button
          className={membersSortMode === 'registered' ? styles.active : ''}
          onClick={() => setMembersSortMode('registered')}
        >
          R
        </button>
        <button
          className={membersSortMode === 'nickname' ? styles.active : ''}
          onClick={() => setMembersSortMode('nickname')}
          style={{
            flexGrow: 1,
          }}
        >
          Nickname
        </button>
      </div>
      <ul className={styles['chat-members']}>
        {players.map((player) => (
          <li
            key={player}
            className={`${styles['chat-member']} ${selectedPlayer === player ? styles['selected'] : ''}`}
            onClick={() => setSelectedPlayer((old) => (old === player ? undefined : player))}
          >
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LobbyChat;
