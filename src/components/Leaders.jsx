import { changeTime } from "../helpers";
import styles from "../pages/LeaderBoard/LeaderBoardPage.module.css";

export function Leader({ arr }) {
  let arrSort = arr.sort(function (a, b) {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
  let array = arrSort.slice(0, 10);

  function achievementCheck(arr, achievement) {
    if (arr.indexOf(achievement) === -1) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      {array.map((el, id) => (
        <div className={styles.el} key={id}>
          <p className={styles.num}>#{id + 1}</p>
          <p className={styles.name}>{el.name}</p>
          <div className={styles.achievements}>
            <div className={styles.achiev1}>
              <img
                src={achievementCheck(el.achievements, 1) ? "./hard_mode.png" : "./easy_mode.png"}
                alt=""
                className={styles.achievement1}
              />
              <div className={styles.tooltip1}>
                Игра {achievementCheck(el.achievements, 1) ? "" : "не"} пройдена в сложном режиме
              </div>
            </div>
            <div className={styles.achiev2}>
              <img
                src={achievementCheck(el.achievements, 2) ? "./wo_achievement.png" : "./with_achievement.png"}
                alt=""
                className={styles.achievement2}
              />
              <div className={styles.tooltip2}>
                Игра пройдена {achievementCheck(el.achievements, 2) ? "без супер-сил" : "с супер-силами"}
              </div>
            </div>
          </div>
          <p className={styles.time}>{changeTime({ time: el.time })}</p>
        </div>
      ))}
    </>
  );
}
