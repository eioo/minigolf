import React from 'react';
import Button from '../Button';
import ChatMembers from '../ChatMembers';
import Checkbox from '../Checkbox';
import Stack from '../Stack';
import TextInput from '../TextInput';

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
      <Stack direction="row" gap="3px" width="100%">
        <TextInput />
        {/* TODO: This "≫" doesn't look like correct character */}
        <Button size="small" variant="blue">
          ≫ Chat
        </Button>
      </Stack>
    </Stack>
  );
}

export default LobbyChat;
