import style from "./header.module.scss";

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.left}>
        <h1>Bank API</h1>
      </div>
      <div className={style.right}>
        <h1>Drake University</h1>
      </div>
    </div>
  );
}
