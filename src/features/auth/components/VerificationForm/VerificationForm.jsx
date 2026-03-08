import style from "./VerificationForm.module.css";
import { verifyUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LinearProgress } from "@mui/material";

export default function VerificationForm() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    
    try {
      await verifyUser(email, verificationCode);
      navigate("/login", { state: { verified: true } });
    } catch (error) {
      console.error("Erro na verificacao:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 4,
            backgroundColor: '#a26dff30',
            '& .MuiLinearProgress-bar': { backgroundColor: '#a26dff' }
          }}
        />
      )}
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
      <button type="submit" className={style.submitButton} disabled={loading}>
        {loading ? "Verificando..." : "Verificar"}
      </button>
    </form>
    </>
  );
}
