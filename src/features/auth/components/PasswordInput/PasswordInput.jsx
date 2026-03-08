import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import style from "./PasswordInput.module.css";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Senha",
  minLength,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.passwordInputContainer}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minLength={minLength}
        required={required}
        className={style.passwordInput}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className={style.toggleButton}
        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
      >
        {showPassword ? (
          <EyeOff size={20} />
        ) : (
          <Eye size={20} />
        )}
      </button>
    </div>
  );
}
