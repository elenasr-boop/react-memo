import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";

export function GamePage() {
  const { num } = useParams();
  const n = parseInt(num);
  const isThreeTries = n % 2;
  const pairsCount = Math.floor(n / 10);

  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5} isThreeTries={isThreeTries}></Cards>
    </>
  );
}
