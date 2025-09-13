import { useState } from "react";
import style from "./PomodoroPage.module.css";
import PomodoroTimer from "../../components/PomodoroTimer/PomodoroTimer.jsx";
import SettingsModal from "../../components/SettingsModal/SettingsModal.jsx";
import { FiSettings } from "react-icons/fi";

export default function PomodoroPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [timerDurations, setTimerDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const handleSaveSettings = (newDurations) => {
    setTimerDurations(newDurations);
  };
  
  return (
    <div className={style.pomodoroPageContainer}>
      <h1 className={style.title}>Pomodoro</h1>
      <p className={style.subtitle}>Use a técnica Pomodoro para aumentar sua produtividade</p>
      
      <div className={style.card}>
        <button 
          onClick={() => setShowSettings(true)} 
          className={style.settingsIconButton}
          aria-label="Abrir configurações"
        >
          <FiSettings size={24} color="#b0b0b0" /> 
        </button>

        <PomodoroTimer timerDurations={timerDurations} />
      </div>
      
      <div className={style.aboutPomodoro}>
        <h2>Sobre a Técnica Pomodoro</h2>
        <p>A técnica Pomodoro é um método de gerenciamento de tempo que usa períodos de foco (geralmente 25 minutos) intercalados com pausas curtas (5 minutos) para melhorar a produtividade e a concentração.</p>
        <p>A cada 4 intervalos de foco, faça uma pausa mais longa (15 minutos) para descansar.</p>
      </div>

      {showSettings && (
        <SettingsModal 
          onSave={handleSaveSettings} 
          onClose={() => setShowSettings(false)}
          initialDurations={timerDurations}
        />
      )}
    </div>
  );
}