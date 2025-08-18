import { useState, useEffect } from "react";
import style from "./PomodoroTimer.module.css";

export default function PomodoroTimer() {
  
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
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
    setIsRunning(true);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };
  
  return (
    <div className={style.timerContainer}>
      <div className={style.modeButtons}>
        <button>Foco</button>
        <button>Pausa curta</button>
        <button>Pausa longa</button>
      </div>
      <div className={style.timeDisplay}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className={style.actionButtons}>
        <button onClick={handleStart}>Iniciar</button>
        <button onClick={handleReset} >Resetar</button>
      </div>
    </div>
  );
}