import style from "./Header.module.css";

export default function Header({ pageName, pageDescription }) {
  return (
    <header className={style.header}>
      <div className={style.headerLeft}>
        <div>
          <h2>{pageName}</h2>
          <p>{pageDescription}</p>
        </div>
      </div>
    </header>
  );
}
