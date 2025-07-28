import style from "./Header.module.css";

export default function Header( {pageName, pageDescription} ) {
  return (
    <header className={style.header}>
      <div className={style.greetings}>
        <h3>Olá, Pedro!</h3>
        <p>Seja bem-vindo(a) ao StudyFlow</p>
      </div>
      <div>
        <h2>{pageName}</h2>
        <p>{pageDescription}</p>
      </div>
    </header>
  );
}
