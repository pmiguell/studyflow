import style from "./RecoverPasswordPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword, resetPassword } from "../../services/authService";

export default function RecoverPasswordPage() {
  const [step, setStep] = useState(1); // 1 = request email, 2 = reset password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await forgotPassword(email);
      setMessage("Se este e-mail estiver cadastrado, um código de recuperação foi enviado.");
      setStep(2);
    } catch (err) {
      setError("Erro ao solicitar recuperação de senha.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await resetPassword(email, code, newPassword);
      setMessage("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err?.response?.data || "Código inválido, expirado ou erro no servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.recoverPage}>
      <h1>StudyFlow</h1>
      <div className={style.recoverContainer}>
        <h2>Recuperação de Senha</h2>

        {message && <p className={style.successMessage}>{message}</p>}
        {error && <p className={style.errorMessage}>{error}</p>}

        {step === 1 ? (
          <>
            <p className={style.subtitle}>Informe seu e-mail para receber um código de recuperação.</p>
            <form onSubmit={handleRequestRecovery} className={style.form}>
              <div className={style.formGroup}>
                <label>E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <button type="submit" className={style.submitButton} disabled={loading}>
                {loading ? "Enviando..." : "Enviar Código"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className={style.subtitle}>Insira o código enviado pro seu e-mail e sua nova senha.</p>
            <form onSubmit={handleResetPassword} className={style.form}>
               <div className={style.formGroup}>
                <label>E-mail</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label>Código de Recuperação</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Ex: 123456"
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label>Nova Senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="********"
                  minLength="6"
                  required
                />
              </div>
              <button type="submit" className={style.submitButton} disabled={loading}>
                {loading ? "Redefinindo..." : "Redefinir Senha"}
              </button>
            </form>
          </>
        )}
        
        <p className={style.backText}>Lembrou a senha? <Link to={"/login"} className={style.link}>Voltar ao Login</Link></p>
      </div>
    </div>
  );
}
