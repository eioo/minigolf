import React, { ChangeEvent, useEffect, useState } from 'react';
import { useT } from 'talkr';
import { getCurrentUsername, socket } from '../../socket';
import ChatTextField from '../ChatInputs';
import ChatMessages, { ChatMessage } from '../ChatMessages';
import Checkbox from '../Checkbox';
import Stack from '../Stack';
import UserList from '../UserList';

function LobbyChat() {
  const { T } = useT();

  const [selectedUser, setSelectedUser] = useState<string>();
  const [privateUser, setPrivateUser] = useState<string>();
  const [ignoredUsers, setIgnoredUsers] = useState(new Set<string>());
  const [noJoinPartMessages, setNoJoinPartMessages] = useState(false);
  const [noGameMessages, setNoGameMessages] = useState(false); // TODO: Functionality
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      text: T('LobbyChat_Welcome'),
      color: '#0090a0',
    },
  ]);

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages((old) => [...old, msg]);
  };

  useEffect(() => {
    function onUserJoined(username: string) {
      addChatMessage({
        text: T('Chat_Message', {
          message: T('LobbyChat_UserJoined', {
            username,
          }),
        }),
        color: '#00a000',
      });
    }

    function onUserLeft(username: string) {
      addChatMessage({
        text: T('Chat_Message', {
          message: T('LobbyChat_UserLeft', {
            username,
          }),
        }),
        color: '#e00000',
      });
    }

    function onMessage(text: string, from: string, isPrivate?: boolean) {
      if (ignoredUsers.has(from)) {
        return;
      }

      addChatMessage({
        text,
        from,
        color: isPrivate ? '#a000a0' : '#000',
        to: isPrivate ? getCurrentUsername() : undefined,
      });
    }

    if (!noJoinPartMessages) {
      socket.on('userJoined', onUserJoined);
      socket.on('userLeft', onUserLeft);
    }
    socket.on('message', onMessage);

    return () => {
      if (!noJoinPartMessages) {
        socket.off('userJoined', onUserJoined);
        socket.off('userLeft', onUserLeft);
      }
      socket.off('message', onMessage);
    };
  }, [noJoinPartMessages, ignoredUsers, privateUser]);

  const onSendMessage = (text: string) => {
    socket.emit('sendMessage', text);
    addChatMessage({
      text,
      from: getCurrentUsername(),
      color: '#0000f0',
      to: privateUser,
    });
  };

  const onPrivateChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser || selectedUser === getCurrentUsername()) {
      return;
    }

    const { checked } = evt.currentTarget;

    if (checked) {
      socket.emit('setPrivateMessageUser', selectedUser);
      setPrivateUser(selectedUser);
    } else {
      socket.emit('setPrivateMessageUser', undefined);
      setPrivateUser(undefined);
    }
  };

  const onIgnoreChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // Messages are only hidden client-side, they are still received from the server.
    if (!selectedUser || selectedUser === getCurrentUsername()) {
      return;
    }

    const { checked } = evt.currentTarget;

    setIgnoredUsers((old) => {
      const newSet = new Set(old);
      if (checked) {
        return newSet.add(selectedUser);
      } else {
        newSet.delete(selectedUser);
        return newSet;
      }
    });
  };

  return (
    <Stack direction="row" gap="3px" width="100%">
      <Stack gap="4px">
        <UserList
          ignoredUsers={ignoredUsers}
          privateUser={privateUser}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <Checkbox
          large
          label={T('UserList_Privately')}
          onChange={onPrivateChange}
          checked={!!selectedUser && selectedUser === privateUser}
        />
        <Checkbox
          large
          label={T('UserList_Ignore')}
          smallFont
          onChange={onIgnoreChange}
          checked={!!(selectedUser && ignoredUsers.has(selectedUser))}
        />
      </Stack>

      <Stack width="100%" gap="5px">
        <Stack width="100%" gap="2px">
          <ChatMessages messages={chatMessages} />
          <ChatTextField onSend={onSendMessage} />
        </Stack>
        <Stack direction="row" justifyContent="space-between" width="100%" gap="2px">
          <Checkbox
            label={T('LobbyChat_NoJoinPartMessages')}
            checked={noJoinPartMessages}
            onChange={(evt) => setNoJoinPartMessages(evt.currentTarget.checked)}
          />
          <Checkbox
            label={T('LobbyChat_NoGameMessages')}
            checked={noGameMessages}
            onChange={(evt) => setNoGameMessages(evt.currentTarget.checked)}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LobbyChat;
