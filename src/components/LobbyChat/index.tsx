import React, { useEffect, useState } from 'react';
import { socket } from '../../socket';
import ChatTextField from '../ChatInputs';
import ChatMembers from '../ChatMembers';
import ChatMessages, { ChatMessage } from '../ChatMessages';
import Checkbox from '../Checkbox';
import Stack from '../Stack';

const MOTD: ChatMessage[] = [
  {
    text: 'W e l c o m e !',
    color: '#0090a0',
  },
];

function LobbyChat() {
  const [noJoinPartMessages, setNoJoinPartMessages] = useState(false);
  const [noGameMessages, setNoGameMessages] = useState(false); // TODO: Functionality
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOTD);

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages((old) => [...old, msg]);
  };

  useEffect(() => {
    function onUserJoined(username: string) {
      addChatMessage({
        text: `** ${username} joined the lobby **`,
      });
    }

    function onUserLeft(username: string) {
      addChatMessage({
        text: `** ${username} left the lobby **`,
        color: '#e00000',
      });
    }

    function onNewMessage(text: string, from: string) {
      addChatMessage({
        text,
        from,
        color: '#000',
      });
    }

    if (!noJoinPartMessages) {
      socket.on('userJoined', onUserJoined);
      socket.on('userLeft', onUserLeft);
    }
    socket.on('newMessage', onNewMessage);

    return () => {
      if (!noJoinPartMessages) {
        socket.off('userJoined', onUserJoined);
        socket.off('userLeft', onUserLeft);
      }
      socket.off('newMessage', onNewMessage);
    };
  }, [noJoinPartMessages]);

  const onSend = (text: string) => {
    socket.emit('sendMessage', text);
    addChatMessage({
      text,
      from: `User-${socket.id.substring(0, 3)}`,
      color: '#0000f0',
    });
  };

  return (
    <Stack direction="row" gap="3px" width="100%">
      <Stack gap="4px">
        <ChatMembers />
        <Checkbox large label="Send as private" />
        <Checkbox large label="Ignore selected user" smallFont />
      </Stack>

      <Stack width="100%" gap="5px">
        <Stack width="100%" gap="2px">
          <ChatMessages messages={chatMessages} />
          <ChatTextField onSend={onSend} />
        </Stack>
        <Stack direction="row" justifyContent="space-between" width="100%" gap="2px">
          <Checkbox
            label="No join/part messages"
            checked={noJoinPartMessages}
            onChange={(evt) => setNoJoinPartMessages(evt.currentTarget.checked)}
          />
          <Checkbox
            label="No game messages"
            checked={noGameMessages}
            onChange={(evt) => setNoGameMessages(evt.currentTarget.checked)}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LobbyChat;
