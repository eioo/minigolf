import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useT } from 'talkr';
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
  const { T } = useT();
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
      <Button
        size="small"
        variant="blue"
        onClick={() => send()}
        style={{
          width: '100px',
          flexShrink: 0,
        }}
      >
        {T('GameChat_Say')}
      </Button>
    </Stack>
  );
}

export default ChatTextField;
