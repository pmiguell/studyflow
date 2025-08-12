import { useState, useEffect } from "react";
import style from "./PomodoroTimer.module.css";

export default function PomodoroTimer() {
  
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
        {formatTime(25)}:{formatTime(0)}
      </div>
      <div className={style.actionButtons}>
        <button >Iniciar</button>
        <button >Resetar</button>
      </div>
    </div>
  );
}