import { useState, useEffect } from "react";
import style from "./PomodoroTimer.module.css";

const MODES = {
  POMODORO: "pomodoro",
  SHORT_BREAK: "shortBreak",
  LONG_BREAK: "longBreak",
};

export default function PomodoroTimer({ timerDurations }) {
  const [minutes, setMinutes] = useState(timerDurations.pomodoro);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState(MODES.POMODORO);

  useEffect(() => {
    const newMinutes = timerDurations[currentMode];
    setMinutes(newMinutes);
    setSeconds(0);
    setIsRunning(false);
  }, [currentMode, timerDurations]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsRunning(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, minutes, seconds]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(timerDurations[currentMode]);
    setSeconds(0);
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className={style.timerContainer}>
      <div className={style.modeButtons}>
        <button
          onClick={() => handleModeChange(MODES.POMODORO)}
          className={currentMode === MODES.POMODORO ? style.active : ""}
        >
          Foco
        </button>
        <button
          onClick={() => handleModeChange(MODES.SHORT_BREAK)}
          className={currentMode === MODES.SHORT_BREAK ? style.active : ""}
        >
          Pausa curta
        </button>
        <button
          onClick={() => handleModeChange(MODES.LONG_BREAK)}
          className={currentMode === MODES.LONG_BREAK ? style.active : ""}
        >
          Pausa longa
        </button>
      </div>
      <div className={style.timeDisplay}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className={style.actionButtons}>
        <button onClick={handleStart}>
          {isRunning
            ? "Pausar"
            : minutes === timerDurations[currentMode] && seconds === 0
            ? "Iniciar"
            : "Retomar"}
        </button>
        <button onClick={handleReset} disabled={!isRunning}>
          Resetar
        </button>
      </div>
    </div>
  );
}