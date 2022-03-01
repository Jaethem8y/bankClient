import DataDict from "../dataDict/DataDict";
import styles from "./body.module.scss";
export default function Body() {
  return (
    <div className={styles.body}>
      <DataDict />
    </div>
  );
}
