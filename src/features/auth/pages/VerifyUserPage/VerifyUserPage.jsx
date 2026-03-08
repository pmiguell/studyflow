import style from "./VerifyUserPage.module.css";
import VerificationForm from "../../components/VerificationForm/VerificationForm";
import logoDark from "../../../../assets/logo-dark.png";

export default function VerifyUserPage() {
  return (
    <div className={style.verifyUserPage}>
      <img src={logoDark} alt="StudyFlow Logo" className={style.logo} />
      <div className={style.verifyUserContainer}>
        <h2>Verificar e-mail</h2>
        <p>Informe o código enviado ao seu e-mail cadastrado</p>
        <VerificationForm />
      </div>
    </div>
  );
}