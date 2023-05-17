import React from 'react';

interface ChatMessage {
  text: string;
  color: string;
  from?: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div>
      {messages.map((message, i) => {
        return <div key={i}>{message.text}</div>;
      })}
    </div>
  );
}

export default ChatMessages;
