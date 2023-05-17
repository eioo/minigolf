import React from 'react';
import ChatFooter from '../ChatFooter';
import ChatMembers from '../ChatMembers';
import ChatMessages from '../ChatMessages';
import Checkbox from '../Checkbox';
import Stack from '../Stack';

interface LobbyChatProps {
  players: string[];
}

function LobbyChat({ players }: LobbyChatProps) {
  return (
    <Stack direction="row" gap="3px" width="100%">
      <Stack gap="4px">
        <ChatMembers players={players} />
        <Checkbox large label="Send as private" />
        <Checkbox large label="Ignore selected user" smallFont />
      </Stack>

      <Stack width="100%" gap="2px">
        <ChatMessages
          messages={[
            {
              text: '** gsddfgs created multiplayer game **',
            },
            {
              color: '#00a000',
              text: '** gsddfgs returned from game **',
            },
            {
              color: '#0000f0',
              text: 'fasdf',
              from: 'kalle',
            },
          ]}
        />

        <ChatFooter onSend={(message) => console.log({ message })} />
      </Stack>
    </Stack>
  );
}

export default LobbyChat;
