import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";

export function SelectLevelPage() {
  const [isThreeTries, setIsThreeTries] = useState(0);

  function handleClickOnCheckbox(value) {
    if (value === 0) {
      value = 1;
    } else {
      value = 0;
    }
    setIsThreeTries(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={"/game/3" + isThreeTries}>
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={"/game/6" + isThreeTries}>
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={"/game/9" + isThreeTries}>
              3
            </Link>
          </li>
        </ul>
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
      </div>
    </div>
  );
}
