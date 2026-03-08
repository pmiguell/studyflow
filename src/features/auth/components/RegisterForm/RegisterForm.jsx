import style from "./RegisterForm.module.css";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LinearProgress, Snackbar, Alert } from "@mui/material";
import PasswordRequirements from "../PasswordRequirements/PasswordRequirements";
import { isPasswordValid } from "../../utils/passwordValidator";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    // Validar requisitos de senha
    if (!isPasswordValid(password)) {
      setSnackbar({
        open: true,
        message: "A senha não atende aos requisitos mínimos.",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      await registerUser({ username, email, password });
      navigate("/verificacao");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setSnackbar({
        open: true,
        message: error.response?.data || "Erro ao criar conta. Tente novamente.",
        severity: "error",
      });
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
      <form onSubmit={handleRegister} className={style.form}>
      <div className={style.formGroup}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Seu username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
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
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {password && <PasswordRequirements password={password} />}
      <button type="submit" className={style.submitButton} disabled={loading || !isPasswordValid(password)}>
        {loading ? "Criando..." : "Criar conta"}
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
