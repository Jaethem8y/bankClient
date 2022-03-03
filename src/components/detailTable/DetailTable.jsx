import { useRecoilState } from "recoil";
import { detailTable } from "../../state/detailTable";
import DetailTableShow from "../detailTableShow/DetailTableShow";

export default function DetailTable() {
  const [detailTables, setDetailTables] = useRecoilState(detailTable);

  return (
    <>
      {detailTables.map((el) => (
        <DetailTableShow key={el} table={el} />
      ))}
    </>
  );
}
