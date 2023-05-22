import React, { useEffect, useState } from 'react';
import { useT } from 'talkr';
import { socket } from '../../socket';
import { User } from '../../types';
import { classNames } from '../../utils/classNames';
import styles from './UserList.module.scss';

function UserList() {
  const { T } = useT();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const [membersSortMode, setMembersSortMode] = useState<'registered' | 'nickname'>('registered');

  useEffect(() => {
    const onUsers = (users: User[]) => {
      setUsers(users);
    };

    const onUserJoin = (username: string) => {
      setUsers((old) => [...old, { name: username }]);
    };

    const onUserLeft = (username: string) => {
      setUsers((old) => old.filter((p) => p.name !== username));
    };

    socket.on('users', onUsers);
    socket.on('userJoined', onUserJoin);
    socket.on('userLeft', onUserLeft);

    return () => {
      socket.off('users', onUsers);
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
          {T('UserList_SortByRanking')}
        </button>
        <button
          className={membersSortMode === 'nickname' ? styles.active : ''}
          onClick={() => setMembersSortMode('nickname')}
          style={{
            flexGrow: 1,
          }}
        >
          {T('UserList_SortByNick')}
        </button>
      </div>
      <ul className={styles.users}>
        {users.map((user) => {
          const isSelected = selectedUser === user.name;

          return (
            <li
              key={user.name}
              className={classNames(styles['chat-member'], {
                [styles['selected']]: isSelected,
                [styles['self']]: user.name === `User-${socket.id.substring(0, 3)}`,
              })}
              onClick={() => setSelectedUser(isSelected ? undefined : user.name)}
            >
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserList;
