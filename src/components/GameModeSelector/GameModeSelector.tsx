import React from "react";
import { Link } from "wouter";
import styles from "./GameModeSelector.module.scss";

export const GameModeSelector = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gameMode}>
        <header>Single player</header>
        <div className={styles.buttonContainer}>
          <Link href="/game/1">
            <button className={styles.button}>Single player</button>
          </Link>
        </div>
      </div>

      <div className={styles.gameMode}>
        <header>Dual player</header>
        <div className={styles.buttonContainer}>
          <Link href="/game/1">
            <button className={styles.button}>Dual player</button>
          </Link>
        </div>
      </div>

      <div className={styles.gameMode}>
        <header>Multiplayer</header>
        <div className={styles.buttonContainer}>
          <Link href="/game/1">
            <button className={styles.button}>Multiplayer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
