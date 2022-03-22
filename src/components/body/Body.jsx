import DataDict from "../dataDict/DataDict";
import DetailTable from "../detailTable/DetailTable";
import styles from "./body.module.scss";
export default function Body() {
  return (
    <div className={styles.body}>
      <h3 style={{ color: "red" }}>**Please Double Click Every Buttons**</h3>
      <DataDict />
      <DetailTable />
    </div>
  );
}
