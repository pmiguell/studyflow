import style from "./Header.module.css";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ pageName, pageDescription }) {
  return (
    <header className={style.header}>
      <div className={style.headerLeft}>
        <div className={style.greetings}>
          <h3>Olá!</h3>
          <p>Seja bem-vindo(a) ao StudyFlow</p>
        </div>
        <div>
          <h2>{pageName}</h2>
          <p>{pageDescription}</p>
        </div>
      </div>
      <Link className={style.userIcon} to="/perfil">
        <User />
      </Link>
    </header>
  );
}
