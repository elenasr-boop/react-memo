import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";

export function GamePage() {
  const { num } = useParams();
  const n = parseInt(num);
  console.log(num, typeof num, n, typeof n);
  const isThreeTries = n % 2;
  const pairsCount = Math.floor(n / 10);
  console.log(isThreeTries, typeof isThreeTries, pairsCount, typeof pairsCount);

  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5} isThreeTries={isThreeTries}></Cards>
    </>
  );
}
