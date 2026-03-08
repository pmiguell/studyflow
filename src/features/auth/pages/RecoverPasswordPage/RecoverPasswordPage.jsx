import style from "./RecoverPasswordPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { forgotPassword, resetPassword } from "../../services/authService";
import logoDark from "../../../../assets/logo-dark.png";

export default function RecoverPasswordPage() {
  const [step, setStep] = useState(1); // 1 = request email, 2 = reset password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(email);
      setSnackbar({ open: true, message: "Se este e-mail estiver cadastrado, um código de recuperação foi enviado.", severity: "success" });
      setStep(2);
    } catch (err) {
      setSnackbar({ open: true, message: "Erro ao solicitar recuperação de senha.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email, code, newPassword);
      setSnackbar({ open: true, message: "Senha redefinida com sucesso!", severity: "success" });
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data || "Código inválido, expirado ou erro no servidor.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className={style.recoverPage}>
      <img src={logoDark} alt="StudyFlow Logo" className={style.logo} />
      <div className={style.recoverContainer}>
        <h2>Recuperação de Senha</h2>

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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', fontSize: '1rem', alignItems: 'center' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
