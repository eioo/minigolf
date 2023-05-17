import React from 'react';
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
  return (
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
  );
}

export default ChatMessages;
