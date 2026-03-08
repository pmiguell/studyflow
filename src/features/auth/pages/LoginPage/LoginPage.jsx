import style from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login() {
  return (
    <div className={style.loginPage}>
      <h1>StudyFlow</h1>
      <div className={style.loginContainer}>
        <h2>Login</h2>
        <p>Entre com seu e-mail e senha para acessar sua conta</p>
        <LoginForm />
        <p>Não tem uma conta? <Link to={"/cadastro"} className={style.linkToLogin}>Registre-se aqui</Link></p>
      </div>
    </div>
  );
}