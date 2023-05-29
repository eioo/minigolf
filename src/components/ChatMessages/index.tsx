import { useEffect, useRef, useState } from 'react';
import ChatTabs from '../ChatTabs';
import { LanguageType as Language } from '../LanguageFlag';
import Stack from '../Stack';
import styles from './ChatMessages.module.scss';

export interface ChatMessage {
  text: string;
  color?: string;
  from?: string;
  to?: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

function formatMessageText({ from, text, to }: ChatMessage) {
  if (from) {
    if (to) {
      return `<${from} -> ${to}> ${text}`;
    }

    if (text.startsWith('/me ')) {
      return `${from} ${text.substring(4)}`;
    }

    return `<${from}> ${text}`;
  }

  return text;
}

function ChatMessages({ messages }: ChatMessagesProps) {
  const [tabs] = useState<Language[]>(['en', 'null']);
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
        {messages.map((message, i) => (
          <div
            key={i}
            style={{
              color: message.color,
            }}
          >
            {formatMessageText(message)}
          </div>
        ))}
      </div>
    </Stack>
  );
}

export default ChatMessages;
