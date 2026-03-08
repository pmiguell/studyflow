import style from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function Register() {
  return (
    <div className={style.registerPage}>
      <h1>StudyFlow</h1>
      <div className={style.registerContainer}>
        <h2>Criar Conta</h2>
        <p>Preencha os dados abaixo para criar sua conta</p>
        <RegisterForm />
        <p>Já tem uma conta? <Link to="/login" className={style.linkToLogin}>Faça login aqui</Link></p>
      </div>
    </div>
  );
}