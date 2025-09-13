import { useState } from "react";
import style from "./SettingsModal.module.css";

export default function SettingsModal({ onSave, onClose, initialDurations }) {
  const [pomodoroMinutes, setPomodoroMinutes] = useState(initialDurations.pomodoro);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(initialDurations.shortBreak);
  const [longBreakMinutes, setLongBreakMinutes] = useState(initialDurations.longBreak);

  const handleSave = () => {
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