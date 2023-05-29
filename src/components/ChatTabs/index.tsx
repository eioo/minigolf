import { useState } from 'react';
import { useT } from 'talkr';
import { classNames } from '../../utils/classNames';
import LanguageFlag, { LanguageType as Language } from '../LanguageFlag';
import Stack from '../Stack';
import styles from './ChatTabs.module.scss';

interface ChatTabProps {
  language?: Language;
  /** @default false */
  active?: boolean;
  onClick?: () => void;
}

function ChatTab({ active = false, language, onClick }: ChatTabProps) {
  const { T } = useT();

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
      {T(`Language_${language}`)}
    </Stack>
  );
}

interface ChatTabsProps {
  tabs: Language[];
}

function ChatTabs({ tabs }: ChatTabsProps) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Stack direction="row" gap="2px">
      {tabs.map((tab, tabIdx) => (
        <ChatTab key={tab} active={currentTab === tabIdx} onClick={() => setCurrentTab(tabIdx)} language={tab} />
      ))}
    </Stack>
  );
}
export default ChatTabs;
