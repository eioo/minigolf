import React from 'react';
import ChatMembers from '../ChatMembers';
import Checkbox from '../Checkbox';
import styles from './LobbyChat.module.scss';

interface LobbyChatProps {
  players: string[];
}

function LobbyChat({ players }: LobbyChatProps) {
  return (
    <div
      className={styles.root}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <ChatMembers players={players} />
      <Checkbox large label="Send as private" />
      <Checkbox large label="Ignore selected user" smallFont />
    </div>
  );
}

export default LobbyChat;
