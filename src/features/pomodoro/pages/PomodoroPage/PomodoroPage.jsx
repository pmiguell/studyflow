import style from "./PomodoroPage.module.css";
import PomodoroTimer from "../../components/PomodoroTimer/PomodoroTimer.jsx";

export default function PomodoroPage() {
  return (
    <div className={style.pomodoroPageContainer}>
      <h1 className={style.title}>Pomodoro</h1>
      <p className={style.subtitle}>Use a técnica Pomodoro para aumentar sua produtividade</p>
      
      <div className={style.card}>
        <PomodoroTimer />
      </div>
      
      <div className={style.aboutPomodoro}>
        <h2>Sobre a Técnica Pomodoro</h2>
        <p>A técnica Pomodoro é um método de gerenciamento de tempo que usa períodos de foco (geralmente 25 minutos) intercalados com pausas curtas (5 minutos) para melhorar a produtividade e a concentração.</p>
        <p>A cada 4 intervalos de foco, faça uma pausa mais longa (15 minutos) para descansar.</p>
      </div>
    </div>
  );
}
