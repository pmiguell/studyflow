import { Check, X } from "lucide-react";
import { passwordRequirements, getPasswordRequirementStatus } from "../../utils/passwordValidator";
import style from "./PasswordRequirements.module.css";

export default function PasswordRequirements({ password }) {
  const status = getPasswordRequirementStatus(password);

  return (
    <div className={style.requirementsContainer}>
      <p className={style.title}>Requisitos de senha:</p>
      <ul className={style.requirementsList}>
        {Object.entries(passwordRequirements).map(([key, requirement]) => (
          <li
            key={key}
            className={`${style.requirement} ${
              status[key] ? style.met : style.notMet
            }`}
          >
            {status[key] ? (
              <Check size={18} className={style.icon} />
            ) : (
              <X size={18} className={style.icon} />
            )}
            <span>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
