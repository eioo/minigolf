import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameModeSelector.module.scss";

export const GameModeSelector = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate;
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameMode}>
        <header>Single player</header>
        <div className={styles.buttonContainer}>
          <button onClick={() => navigate("/game/1")} className={styles.button}>
            Single player
          </button>
        </div>
      </div>

      <div className={styles.gameMode}>
        <header>Dual player</header>
        <div className={styles.buttonContainer}>
          <button onClick={() => navigate("/game/1")} className={styles.button}>
            Dual player
          </button>
        </div>
      </div>

      <div className={styles.gameMode}>
        <header>Multiplayer</header>
        <div className={styles.buttonContainer}>
          <button onClick={() => navigate("/game/1")} className={styles.button}>
            Multiplayer
          </button>
        </div>
      </div>
    </div>
  );
};
