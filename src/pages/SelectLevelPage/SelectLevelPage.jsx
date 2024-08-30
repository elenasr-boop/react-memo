import { Link } from "react-router-dom";
import { ModeContext } from "../../context";
import styles from "./SelectLevelPage.module.css";
import { useContext, useState } from "react";

export function SelectLevelPage() {
  const [isThreeTries, setIsThreeTries] = useState(false);
  const [amount, setAmount] = useState(3);
  const { setMode } = useContext(ModeContext);

  function handleClickOnCheckbox(value) {
    setIsThreeTries(!value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <fieldset className={styles.levels}>
          <div className={styles.level}>
            <input
              type="radio"
              className={styles.levelInput}
              name="amount"
              value="3"
              id="3"
              checked={amount === 3}
              onChange={() => {
                setAmount(3);
              }}
            />
            <label htmlFor="3" className={styles.levelLabel}>
              3
            </label>
          </div>
          <div className={styles.level}>
            <input
              type="radio"
              className={styles.levelInput}
              name="amount"
              value="6"
              id="6"
              onChange={() => {
                setAmount(6);
              }}
            />
            <label htmlFor="6" className={styles.levelLabel}>
              6
            </label>
          </div>
          <div className={styles.level}>
            <input
              type="radio"
              className={styles.levelInput}
              name="amount"
              value="9"
              id="9"
              onChange={() => {
                setAmount(9);
              }}
            />
            <label htmlFor="9" className={styles.levelLabel}>
              9
            </label>
          </div>
        </fieldset>
        <div className={styles.cont}>
          <div className={styles.inscription}>Вам дается одна попытка?</div>
          <div className={styles.toggleWrapper}>
            <div className={styles.toggleCheckcross}>
              <input
                className={styles.checkcross}
                id="checkcross"
                type="checkbox"
                onClick={() => {
                  handleClickOnCheckbox(isThreeTries);
                }}
              />
              <label className={styles.toggleItem} htmlFor="checkcross">
                <div className={styles.check}></div>
              </label>
            </div>
          </div>
        </div>
        <button
          className={styles.startGame}
          onClick={() => {
            console.log(`Режим выбран: ${amount} карт. Три попытки? ${isThreeTries}.`);
            setMode({ amount: amount, isThreeTries: isThreeTries });
          }}
        >
          <Link className={styles.startGameLink} to="/game">
            Начать игру
          </Link>
        </button>
        <Link to="/leaderboard" className={styles.linkToLeaderboard}>
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
