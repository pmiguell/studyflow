import { useState, useEffect } from "react";
import style from "./AccountPage.module.css";
import { Snackbar, Alert } from "@mui/material";
import Button from "../../../components/Button/Button";
import PasswordRequirements from "../../auth/components/PasswordRequirements/PasswordRequirements";
import { isPasswordValid } from "../../auth/utils/passwordValidator";
import {
  updateAccount,
  deleteAccount,
  getAccountData,
} from "../service/accountService";
import { getToken } from "../../auth/services/authService"; // 🔹 importa o getToken
import Header from "../../../components/Header/Header";

export default function AccountPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const token = getToken(); // 🔹 busca token do localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getAccountData(token); // 🔹 backend retorna dados do usuário logado
        setUsername(user.username || "");
        setEmail(user.email || "");
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };

    if (token) {
      fetchData();
    } else {
      console.warn("Nenhum token encontrado!");
      // opcional → redirecionar para login
      // window.location.href = "/login";
    }
  }, [token]);

  const handleSave = async () => {
    // Se a senha foi preenchida, validar os requisitos
    if (password && !isPasswordValid(password)) {
      setSnackbar({
        open: true,
        message: "A nova senha não atende aos requisitos mínimos.",
        severity: "error",
      });
      return;
    }

    try {
      await updateAccount({ username, email, password }, token);
      setPassword("");
      setSnackbar({ open: true, message: "Senha alterada com sucesso!", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Erro ao alterar a senha.", severity: "error" });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja deletar sua conta?")) return;

    try {
      await deleteAccount(token);
      window.location.href = "/login"; // redireciona após deletar
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style.accountPage}>
      <Header
        pageName="Sua conta"
        pageDescription="Gerencie suas informações de conta."
      />
      <div className={style.container}>
        <div className={style.settings}>
          <form>
            <div className={style.inputsContainer}>
              <div className={style.inputContainer}>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={style.inputContainer}>
                <label>Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {password && <PasswordRequirements password={password} />}
            </div>
          </form>

          <div className={style.deleteAccount}>
            <button
              type="button"
              className={style.button}
              onClick={handleDelete}
            >
              Deletar conta
            </button>
            <p>Você receberá um e-mail de confirmação de deletação.</p>
            <p>
              Ao deletar sua conta, perderá todas as suas matérias, atividades e
              resumos.
            </p>
          </div>
        </div>

        <div className={style.buttonsContainer}>
          <Button onClick={handleSave} disabled={password && !isPasswordValid(password)}>Salvar</Button>
          <button type="button" className={style.button}>
            Cancelar
          </button>
        </div>
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
