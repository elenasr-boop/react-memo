import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
// import { useContext, useState } from "react";
// import { LeaderBoardContext } from "../../context";
import { Link } from "react-router-dom";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, mode }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emodji" : "dead emodji";
  const isLeader = true;
  // const { leaderBoard, setLeaderBoard } = useContext(LeaderBoardContext);
  // const { name, setName } = useState("Пользователь");

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{isLeader ? "Вы попали на Лидерборд!" : title}</h2>
      {isLeader && <input className={styles.input} placeholder="Пользователь" name="name" />}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
      {isLeader && (
        <button className={styles.leaderButton} onClick={() => {}}>
          <Link to="/leaderboard" className={styles.leaderLink}>
            Добавить в лидерборд
          </Link>
        </button>
      )}
    </div>
  );
}
