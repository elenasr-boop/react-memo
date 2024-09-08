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

  return (
    <>
      {array.map((el, id) => (
        <div className={styles.el} key={id}>
          <p className={styles.num}>#{id + 1}</p>
          <p className={styles.name}>{el.name}</p>
          <p></p>
          <p className={styles.time}>{changeTime({ time: el.time })}</p>
        </div>
      ))}
    </>
  );
}
