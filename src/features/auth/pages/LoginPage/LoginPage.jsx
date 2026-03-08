import style from "./LoginPage.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { removeToken } from "../../services/tokenService";
import { Snackbar, Alert } from "@mui/material";

export default function Login() {
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });

  useEffect(() => {
    if (location.state?.logout) {
      setSnackbar({
        open: true,
        message: "Você foi deslogado com sucesso!",
        severity: "info"
      });
      window.history.replaceState({}, document.title);
    } else if (location.state?.verified) {
      setSnackbar({
        open: true,
        message: "E-mail verificado com sucesso! Agora você pode entrar.",
        severity: "success"
      });
      window.history.replaceState({}, document.title);
    }

    removeToken();
  }, [location]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className={style.loginPage}>
      <h1>StudyFlow</h1>
      <div className={style.loginContainer}>
        <h2>Login</h2>
        <p>Entre com seu e-mail e senha para acessar sua conta</p>
        <LoginForm />
        <p style={{ marginTop: "1rem" }}>Esqueceu sua senha? <Link to={"/recuperacao"} className={style.linkToLogin}>Recupere aqui</Link></p>
        <p>Não tem uma conta? <Link to={"/cadastro"} className={style.linkToLogin}>Registre-se aqui</Link></p>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}