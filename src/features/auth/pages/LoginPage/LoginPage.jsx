import style from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { removeToken } from "../../services/tokenService";

export default function Login() {
  useEffect(() => {
    removeToken();
  }, []);

  return (
    <div className={style.loginPage}>
      <h1>StudyFlow</h1>
      <div className={style.loginContainer}>
        <h2>Login</h2>
        <p>Entre com seu e-mail e senha para acessar sua conta</p>
        <LoginForm />
        <p style={{marginTop: "1rem"}}>Esqueceu sua senha? <Link to={"/recuperacao"} className={style.linkToLogin}>Recupere aqui</Link></p>
        <p>Não tem uma conta? <Link to={"/cadastro"} className={style.linkToLogin}>Registre-se aqui</Link></p>
      </div>
    </div>
  );
}