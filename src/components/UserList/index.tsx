import { useEffect, useState } from 'react';
import { useT } from 'talkr';
import { socket } from '~/socket';
import { User } from '~/types';
import { classNames } from '~/utils/classNames';
import Stack from '../Stack';
import styles from './UserList.module.scss';

type SortMode = 'registered' | 'nickname';

interface UserListProps {
  ignoredUsers: Set<string>;
  privateUser: string | undefined;
  selectedUser?: string;
  setSelectedUser: (username?: string) => void;
}

function UserList({ ignoredUsers, privateUser, selectedUser, setSelectedUser }: UserListProps) {
  const { T } = useT();
  const [users, setUsers] = useState<User[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>('registered');

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
    <Stack className={styles['user-list']}>
      <header>
        <button className={sortMode === 'registered' ? styles.active : ''} onClick={() => setSortMode('registered')}>
          {T('UserList_SortByRanking')}
        </button>
        <button
          className={sortMode === 'nickname' ? styles.active : ''}
          onClick={() => setSortMode('nickname')}
          style={{
            flexGrow: 1,
          }}
        >
          {T('UserList_SortByNick')}
        </button>
      </header>
      <ul>
        {users.map((user) => {
          const isSelected = selectedUser === user.name;

          return (
            <li
              key={user.name}
              className={classNames({
                [styles['selected']]: isSelected,
                [styles['ignored']]: ignoredUsers.has(user.name),
                [styles['private']]: privateUser === user.name,
                [styles['self']]: user.name === `User-${socket.id.substring(0, 3)}`,
              })}
              onClick={() => setSelectedUser(isSelected ? undefined : user.name)}
            >
              {user.name}
            </li>
          );
        })}
      </ul>
    </Stack>
  );
}

export default UserList;
