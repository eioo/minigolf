import React, { ChangeEventHandler } from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className={styles['input-wrapper']}>
      <input type="text" className={styles['text-input']} value={value} onChange={onChange} />
    </div>
  );
}

export default TextInput;
