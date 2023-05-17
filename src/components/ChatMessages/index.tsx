import React, { useState } from 'react';
import ChatTab from '../ChatTab';
import { LanguageType as Language } from '../LanguageFlag';
import Stack from '../Stack';
import styles from './ChatMessages.module.scss';

interface ChatMessage {
  text: string;
  color?: string;
  from?: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
  const [chatTabs, setChatTabs] = useState<Language[]>(['English', 'Unknown']);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Stack height="100%">
      <Stack direction="row" gap="2px">
        {chatTabs.map((tab, tabIdx) => {
          return (
            <ChatTab
              key={tab}
              label={tab}
              active={currentTab === tabIdx}
              onClick={() => setCurrentTab(tabIdx)}
              language={tab}
            />
          );
        })}
      </Stack>
      <div className={styles['chat-messages']}>
        {messages.map(({ color = '#707070', from, text }, i) => (
          <div
            key={i}
            style={{
              color,
            }}
          >
            {from ? `<${from}> ${text}` : text}
          </div>
        ))}
      </div>
    </Stack>
  );
}

export default ChatMessages;
