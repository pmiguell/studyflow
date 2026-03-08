import style from "./RegisterForm.module.css";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LinearProgress } from "@mui/material";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await registerUser({ username, email, password });
      navigate("/verificacao");
    } catch (error) {
      console.error("Erro no cadastro:", error);
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
      <button type="submit" className={style.submitButton} disabled={loading}>
        {loading ? "Criando..." : "Criar conta"}
      </button>
    </form>
    </>
  );
}
