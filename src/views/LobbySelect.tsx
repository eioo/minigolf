import { useT } from 'talkr';
import Button from '../components/Button';
import LobbyCard from '../components/GameModeCard';
import styles from './LobbySelect.module.scss';

export function LobbySelect() {
  const { T } = useT();
  return (
    <div className={styles.container}>
      <img src="assets/sprites/bg-lobbyselect.gif" />
      <div className={styles['card-container']}>
        <LobbyCard lobbyType="single" />
        <LobbyCard lobbyType="dual" />
        <LobbyCard lobbyType="multi" />
      </div>

      <Button className={styles['quick-start-button']} variant="blue" size="small" href="/game/1">
        {T('LobbySelect_QuickStart')}
      </Button>
    </div>
  );
}
