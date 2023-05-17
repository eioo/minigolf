import React, { ChangeEvent, useState } from 'react';
import Button from '../Button';
import Stack from '../Stack';
import TextInput from '../TextInput';

interface ChatTextInputProps {
  onSend: (value: string) => void;
}

/**
 * Contains chat text input & send button.
 */
function ChatFooter({ onSend }: ChatTextInputProps) {
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
      <Button size="small" variant="blue" onClick={() => send()}>
        ≫ Chat
      </Button>
    </Stack>
  );
}

export default ChatFooter;
