import style from "./VerificationForm.module.css";
import { verifyUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerificationForm() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (ev) => {
    ev.preventDefault();
    
    try {
      await verifyUser(email, verificationCode);
      navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <form onSubmit={handleVerify} className={style.form}>
      <div className={style.formGroup}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="verificationCode">Código de Verificação</label>
        <input
          type="text"
          id="verificationCode"
          name="verificationCode"
          placeholder="Preencha com o código aqui"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={style.submitButton}>
        Verificar
      </button>
    </form>
  );
}
