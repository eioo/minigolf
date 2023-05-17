import React, { ChangeEventHandler } from 'react';
import { useUniqueId } from '../../hooks/useUniqueId';
import { classNames } from '../../utils/classNames';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  checked?: boolean;
  label?: string;
  large?: boolean;
  smallFont?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Checkbox({ checked, label, large, smallFont, onChange }: CheckboxProps) {
  const id = useUniqueId('checkbox');

  return (
    <div>
      <input
        className={classNames(styles.checkbox, {
          [styles.smallFont]: smallFont,
          [styles.large]: large,
        })}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
