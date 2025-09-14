import { useState, useEffect } from "react";
import style from "./AccountPage.module.css";
import Button from "../../../components/Button/Button";
import { updateAccount, deleteAccount, getAccountData } from "../service/accountService";
import { getToken } from "../../auth/services/authService"; // 🔹 importa o getToken

export default function AccountPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    try {
      await updateAccount({ username, email, password }, token);
      setPassword("");
    } catch (err) {
      console.error(err);
    }
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
          </div>
        </form>

        <div className={style.deleteAccount}>
          <button type="button" className={style.button} onClick={handleDelete}>
            Deletar conta
          </button>
          <p>Você receberá um e-mail de confirmação de deletação.</p>
          <p>Ao deletar sua conta, perderá todas as suas matérias, atividades e resumos.</p>
        </div>
      </div>

      <div className={style.buttonsContainer}>
        <Button onClick={handleSave}>Salvar</Button>
        <button type="button" className={style.button}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
