import style from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import logoDark from "../../../../assets/logo-dark.png";

export default function Register() {
  return (
    <div className={style.registerPage}>
      <img src={logoDark} alt="StudyFlow Logo" className={style.logo} />
      <div className={style.registerContainer}>
        <h2>Criar Conta</h2>
        <p>Preencha os dados abaixo para criar sua conta</p>
        <RegisterForm />
        <p>Já tem uma conta? <Link to="/login" className={style.linkToLogin}>Faça login aqui</Link></p>
      </div>
    </div>
  );
}