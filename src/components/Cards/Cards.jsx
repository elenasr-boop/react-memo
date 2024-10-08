import { shuffle } from "lodash";
import { useContext, useEffect, useState } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { ModeContext } from "../../context";

// Игра закончилась
const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
// Идет игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
// Начало игры: игрок видит все карты в течении нескольких секунд
const STATUS_PREVIEW = "STATUS_PREVIEW";
const STATUS_EPIPHANY = "STATUS_EPIPHANY";

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  if (endDate === null) {
    endDate = new Date();
  }

  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ previewSeconds = 5 }) {
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([]);
  const [errors, setErrors] = useState(3);
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW);

  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null);
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null);

  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });

  const { mode } = useContext(ModeContext);
  const pairsCount = mode.amount;
  const isThreeTries = mode.isThreeTries;
  const [isAlohomora, setIsAlohomora] = useState(true);
  const [isEpiphany, setIsEpiphany] = useState(true);

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(status);
  }
  function startGame() {
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
    setIsAlohomora(true);
    setIsEpiphany(true);
    setErrors(3);
  }
  function resetGame() {
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
    setIsAlohomora(true);
    setIsEpiphany(true);
    setErrors(3);
  }

  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = clickedCard => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {
      return;
    }
    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card;
      }

      return {
        ...card,
        open: true,
      };
    });

    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);

    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      finishGame(STATUS_WON);
      return;
    }

    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open);

    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);

      if (sameCards.length < 2) {
        return true;
      }

      return false;
    });

    if (openCardsWithoutPair.length > 1 && isThreeTries) {
      openCardsWithoutPair.forEach(card => {
        setErrors(errors - 1);

        setTimeout(() => {
          card.open = false;
        }, 500);
      });
    }

    const playerLost = !isThreeTries ? openCardsWithoutPair.length >= 2 : errors === 0;

    // "Игрок проиграл", т.к на поле есть две открытые карты без пары
    if (playerLost) {
      finishGame(STATUS_LOST);
      return;
    }

    // ... игра продолжается
  };

  function alohomora() {
    if (!isAlohomora) {
      return;
    }

    setIsAlohomora(false);

    const closedCards = cards.filter(card => card.open !== true);

    const idOfRandomCard = Math.floor(Math.random() * closedCards.length);

    const firstOpenCard = closedCards[idOfRandomCard];

    const sameCard = closedCards.filter(
      card => firstOpenCard.suit === card.suit && firstOpenCard.rank === card.rank && firstOpenCard.id !== card.id,
    );

    sameCard[0].open = true;
    firstOpenCard.open = true;

    const isPlayerWon = cards.every(card => card.open);

    if (isPlayerWon) {
      setGameEndDate(new Date());
      setStatus(STATUS_WON);
      return;
    }
  }

  function epiphany() {
    if (isEpiphany) {
      setIsEpiphany(false);
      setStatus(STATUS_EPIPHANY);

      const timerId = setTimeout(() => {
        setStatus(STATUS_IN_PROGRESS);
        setGameStartDate(new Date(gameStartDate.getTime() + 5000));
      }, 5000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп логики не требуется
    if (status !== STATUS_PREVIEW) {
      return;
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });

    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  // Обновляем значение таймера в интервале
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate));
    }, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStartDate, gameEndDate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW || status === STATUS_EPIPHANY ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart("2", "0")}</div>
              </div>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {isThreeTries && status === STATUS_IN_PROGRESS ? (
          <div className={styles.errors}>
            Осталось попыток: <span className={styles.errorsNum}>{errors}</span>
          </div>
        ) : null}
        {status === STATUS_IN_PROGRESS && (
          <div className={styles.superPower}>
            <div className={styles.epiphany} onClick={() => epiphany()}>
              <img src="./epiphany.png" alt="" className={styles.superPowerImg1} />
              <div className={styles.tooltip}>
                <h3 className={styles.superPowerName}>Прозрение</h3>
                <p className={styles.superPowerDesc}>
                  На 5 секунд показываются все карты. Таймер длительности игры на это время останавливается.
                </p>
              </div>
            </div>
            <div className={styles.epiphany} onClick={() => alohomora()}>
              <div className={styles.alohomora}>
                <img src="./alohomora.png" alt="" className={styles.superPowerImg2} />
              </div>
              <div className={styles.tooltip}>
                <h3 className={styles.superPowerName}>Алохомора</h3>
                <p className={styles.superPowerDesc}>Открывается случайная пара карт.</p>
              </div>
            </div>
          </div>
        )}
        {status === STATUS_IN_PROGRESS ? <Button onClick={resetGame}>Начать заново</Button> : null}
      </div>

      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            onClick={() => openCard(card)}
            open={status !== STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>

      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
            mode={mode}
            isSuperPower={isAlohomora && isEpiphany}
          />
        </div>
      ) : null}
    </div>
  );
}
