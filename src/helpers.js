export function changeTime({ time }) {
  let minutes = Math.trunc(time / 60);
  let seconds = time % 60;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
