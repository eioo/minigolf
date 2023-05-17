import React, { useEffect, useRef, useState } from 'react';
import ChatTabs from '../ChatTabs';
import { LanguageType as Language } from '../LanguageFlag';
import Stack from '../Stack';
import styles from './ChatMessages.module.scss';

export interface ChatMessage {
  text: string;
  color?: string;
  from?: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
  const [tabs] = useState<Language[]>(['English', 'Unknown']);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Should not scroll to bottom if not scrolled to bottom already.
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Stack>
      <ChatTabs tabs={tabs} />

      <div ref={ref} className={styles['chat-messages']}>
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
