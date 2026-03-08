import style from "./VerifyUserPage.module.css";
import VerificationForm from "../../components/VerificationForm/VerificationForm";

export default function VerifyUserPage() {
  return (
    <div className={style.verifyUserPage}>
      <h1>StudyFlow</h1>
      <div className={style.verifyUserContainer}>
        <h2>Verificar e-mail</h2>
        <p>Informe o código enviado ao seu e-mail cadastrado</p>
        <VerificationForm />
      </div>
    </div>
  );
}