import { useState } from "react";
import style from "./SettingsModal.module.css";

export default function SettingsModal({ onSave, onClose, initialDurations }) {
  const [pomodoroMinutes, setPomodoroMinutes] = useState(initialDurations.pomodoro);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(initialDurations.shortBreak);
  const [longBreakMinutes, setLongBreakMinutes] = useState(initialDurations.longBreak);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    if (isNaN(pomodoroMinutes) || isNaN(shortBreakMinutes) || isNaN(longBreakMinutes) ||
        pomodoroMinutes < 1 || shortBreakMinutes < 1 || longBreakMinutes < 1) {
      
      setErrorMessage("Por favor, preencha todos os campos com valores maiores que zero.");
      return;
    }
    
    setErrorMessage("");
    onSave({
      pomodoro: pomodoroMinutes,
      shortBreak: shortBreakMinutes,
      longBreak: longBreakMinutes,
    });
    onClose();
  };


  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <h2>Configurações</h2>
        
        {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
        <div className={style.inputGroup}>
          <label>Tempo de Foco (minutos):</label>
          <input
            type="number"
            value={pomodoroMinutes}
            onChange={(e) => setPomodoroMinutes(parseInt(e.target.value))}
            min="1"
            max="60"
          />
        </div>
        
        <div className={style.inputGroup}>
          <label>Pausa Curta (minutos):</label>
          <input
            type="number"
            value={shortBreakMinutes}
            onChange={(e) => setShortBreakMinutes(parseInt(e.target.value))}
            min="1"
            max="30"
          />
        </div>
        
        <div className={style.inputGroup}>
          <label>Pausa Longa (minutos):</label>
          <input
            type="number"
            value={longBreakMinutes}
            onChange={(e) => setLongBreakMinutes(parseInt(e.target.value))}
            min="1"
            max="60"
          />
        </div>
        
        <div className={style.modalActions}>
          <button onClick={onClose} className={style.cancelButton}>Cancelar</button>
          <button onClick={handleSave} className={style.saveButton}>Salvar</button>
        </div>
      </div>
    </div>
  );
}