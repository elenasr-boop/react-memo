import { Link } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
import { getLeaderBoard } from "../../api";
import { useContext, useEffect, useState } from "react";
import { Leader } from "../../components/Leaders";
import { LeaderBoardContext } from "../../context";

export function LeaderBoardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { leaderBoard, setLeaderBoard } = useContext(LeaderBoardContext);

  async function leader() {
    try {
      const res = await getLeaderBoard();
      setLeaderBoard(res.leaders);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    leader();
  }, []);

  return (
    <div className={styles.cont}>
      <header className={styles.header}>
        <div className={styles.title}>Лидерборд</div>
        <button className={styles.startGame}>
          <Link to="/" className={styles.startGameLink}>
            Начать игру
          </Link>
        </button>
      </header>
      <div className={styles.container}>
        <div className={styles.headingEl}>
          <p className={styles.num}>Позиция</p>
          <p className={styles.name}>Пользователь</p>
          <p></p>
          <p className={styles.time}>Время</p>
        </div>
        {isLoading ? (
          <div className={styles.el}>
            <p className={styles.num}>...</p>
            <p className={styles.name}>...</p>
            <p></p>
            <p className={styles.time}>...</p>
          </div>
        ) : (
          <Leader arr={leaderBoard} />
        )}
      </div>
    </div>
  );
}
