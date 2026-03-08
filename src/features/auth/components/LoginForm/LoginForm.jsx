import style from "./LoginForm.module.css";
import { loginUser } from "../../services/authService";
import { saveToken } from "../../services/tokenService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LinearProgress, Snackbar, Alert } from "@mui/material";
import PasswordInput from "../PasswordInput/PasswordInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      saveToken(data.token);
      navigate("/materias");
    } catch (error) {
      console.error("Erro no login:", error);
      const errorMessage = error.response?.data || "E-mail ou senha incorretos.";
      setErrorMsg(errorMessage);
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
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
      <form onSubmit={handleLogin} className={style.form}>
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
        <label htmlFor="password">Senha</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="•••••••"
          required
        />
      </div>
      <button type="submit" className={style.submitButton} disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>

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
    </>
  );
}
