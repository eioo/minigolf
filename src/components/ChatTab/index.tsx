import React from 'react';
import { classNames } from '../../utils/classNames';
import LanguageFlag, { LanguageType as Language } from '../LanguageFlag';
import Stack from '../Stack';
import styles from './ChatTab.module.scss';

interface ChatTabProps {
  label: string;
  language?: Language;
  /** @default false */
  active?: boolean;
  onClick?: () => void;
}

function ChatTab({ active = false, label, language, onClick }: ChatTabProps) {
  return (
    <Stack
      className={classNames(styles['chat-tab'], {
        [styles['active']]: active,
      })}
      direction="row"
      alignItems="center"
      onClick={() => onClick?.()}
    >
      {language && <LanguageFlag language={language} />}
      {label}
    </Stack>
  );
}

export default ChatTab;
