import React, { ChangeEvent, useState } from 'react';
import Button from '../Button';
import Stack from '../Stack';
import TextInput from '../TextInput';

interface ChatTextFieldProps {
  onSend: (value: string) => void;
}

/**
 * Contains chat text input & send button.
 */
function ChatTextField({ onSend }: ChatTextFieldProps) {
  const [value, setValue] = useState('');

  const send = () => {
    if (value) {
      onSend(value);
      setValue('');
    }
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
  };

  const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      send();
    }
  };

  return (
    <Stack direction="row" gap="3px" width="100%">
      <TextInput value={value} onChange={onChange} onKeyDown={onKeyDown} />
      {/* TODO: This "≫" doesn't look like correct character */}
      <Button
        size="small"
        variant="blue"
        onClick={() => send()}
        style={{
          width: '100px',
          flexShrink: 0,
        }}
      >
        {/* The arrow might not be 100% exact with the original game. */}
        {'->'} Chat
      </Button>
    </Stack>
  );
}

export default ChatTextField;
