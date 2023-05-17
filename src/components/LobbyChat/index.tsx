import React, { useEffect, useState } from 'react';
import { socket } from '../../socket';
import ChatTextField from '../ChatInputs';
import ChatMembers from '../ChatMembers';
import ChatMessages, { ChatMessage } from '../ChatMessages';
import Checkbox from '../Checkbox';
import Stack from '../Stack';

function LobbyChat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      text: 'W e l c o m e !',
      color: '#0090a0',
    },
  ]);

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

    socket.on('userJoined', onUserJoined);
    socket.on('userLeft', onUserLeft);
    socket.on('newMessage', onNewMessage);

    return () => {
      socket.off('userJoined', onUserJoined);
      socket.off('userLeft', onUserLeft);
      socket.off('newMessage', onNewMessage);
    };
  }, []);

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
          <Checkbox label="No join/part messages" />
          <Checkbox label="No game messages" />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LobbyChat;
