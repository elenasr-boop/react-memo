import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useContext, useState } from "react";
import { LeaderBoardContext } from "../../context";
import { Link } from "react-router-dom";
import { addLeader } from "../../api";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, mode, isSuperPower }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emodji" : "dead emodji";
  let isLeader = isWon && mode.amount === 9;
  const time = gameDurationMinutes * 60 + gameDurationSeconds;
  const { setLeaderBoard } = useContext(LeaderBoardContext);
  const [name, setName] = useState("Пользователь");
  const isHardMode = !mode.isThreeTries;

  async function onButtonLeader() {
    try {
      const result = await addLeader({ name: name, time: time, hardMode: isHardMode, superPower: !isSuperPower });
      if ("error" in result) {
        throw new Error(result.error);
      }
      setLeaderBoard(result.leaders);
    } catch (e) {
      alert("Ошибка добавления. Попробуйте еще раз позже.");
    }
  }

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{isLeader ? "Вы попали на Лидерборд!" : title}</h2>
      {isLeader && (
        <input
          className={styles.input}
          placeholder="Пользователь"
          name="name"
          // eslint-disable-next-line no-restricted-globals
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
      {isLeader && (
        <button
          className={styles.leaderButton}
          onClick={() => {
            onButtonLeader();
          }}
        >
          <Link to="/leaderboard" className={styles.leaderLink}>
            Добавить в лидерборд
          </Link>
        </button>
      )}
    </div>
  );
}
