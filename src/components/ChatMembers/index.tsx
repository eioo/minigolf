import React, { useState } from 'react';
import styles from './ChatMembers.module.scss';

interface ChatMembersProps {
  players: string[];
}

function ChatMembers({ players }: ChatMembersProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string>();
  const [membersSortMode, setMembersSortMode] = useState<
    'registered' | 'nickname'
  >('registered');

  return (
    <div className={styles['chat-members-container']}>
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
            className={`${styles['chat-member']} ${
              selectedPlayer === player ? styles['selected'] : ''
            }`}
            onClick={() =>
              setSelectedPlayer((old) => (old === player ? undefined : player))
            }
          >
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatMembers;
