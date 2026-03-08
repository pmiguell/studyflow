import style from "./TaskSpan.module.css";

export default function TaskSpan({ content }) {
  const statusColors = {
    "Não iniciado": "#ef4444",
    "Em andamento": "#f59e0b",
    "Concluído": "#22c55e",
  };

  return (
    <span className={style.taskSpan} style={{ backgroundColor: statusColors[content] }}>
      {content}
    </span>
  );
}
