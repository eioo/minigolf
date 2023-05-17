import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

function TextInput({ value, onChange, onKeyDown }: TextInputProps) {
  return (
    <div className={styles['input-wrapper']}>
      <input type="text" className={styles['text-input']} value={value} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  );
}

export default TextInput;
