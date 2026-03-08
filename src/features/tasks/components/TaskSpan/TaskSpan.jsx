import style from "./TaskSpan.module.css";

export default function TaskSpan({ content }) {
  const statusColors = {
    "Não iniciado": "#ff2c2c93",
    "Em andamento": "#fff1339c",
    "Concluído": "#4CAF50aa",
  };

  return (
    <span className={style.taskSpan} style={{ backgroundColor: statusColors[content] }}>
      {content}
    </span>
  );
}
