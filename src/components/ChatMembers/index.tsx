import React, { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { Player } from '../../types';
import { classNames } from '../../utils/classNames';
import styles from './ChatMembers.module.scss';

function ChatMembers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>();
  const [membersSortMode, setMembersSortMode] = useState<'registered' | 'nickname'>('registered');

  useEffect(() => {
    const onPlayers = (players: Player[]) => {
      setPlayers(players);
    };

    const onUserJoin = (username: string) => {
      setPlayers((old) => [...old, { username }]);
    };

    const onUserLeft = (username: string) => {
      setPlayers((old) => old.filter((p) => p.username !== username));
    };

    socket.on('players', onPlayers);
    socket.on('userJoined', onUserJoin);
    socket.on('userLeft', onUserLeft);

    return () => {
      socket.off('players', onPlayers);
      socket.off('userJoined', onUserJoin);
      socket.off('userLeft', onUserLeft);
    };
  }, []);

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
            key={player.username}
            className={classNames(styles['chat-member'], {
              [styles['selected']]: selectedPlayer === player.username,
              [styles['self']]: player.username === `User-${socket.id.substring(0, 3)}`,
            })}
            onClick={() => setSelectedPlayer(selectedPlayer === player.username ? undefined : player.username)}
          >
            {player.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatMembers;
