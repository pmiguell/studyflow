import style from "./LoginForm.module.css";
import { loginUser } from "../../services/authService";
import { saveToken } from "../../services/tokenService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    setErrorMsg("");

    try {
      const data = await loginUser({ email, password });
      saveToken(data.token);
      navigate("/materias");
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMsg(error.response?.data || "E-mail ou senha incorretos.");
    }
  };

  return (
    <form onSubmit={handleLogin} className={style.form}>
      {errorMsg && <p className={style.errorMessage}>{errorMsg}</p>}
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
      <button type="submit" className={style.submitButton}>
        Entrar
      </button>
    </form>
  );
}
