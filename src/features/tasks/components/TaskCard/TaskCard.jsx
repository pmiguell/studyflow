import style from "./TaskCard.module.css";
import { Calendar, Book } from "lucide-react";
import TaskSpan from "../TaskSpan/TaskSpan.jsx";
import TaskDropdown from "../TaskDropdown/TaskDropdown.jsx";

export default function TaskCard({ task, onEditTask, onDeleteTask, onOpenStatusModal, onUpdateStatus }) {
  const { id, title, description, subject, status, deadline } = task;

  const friendlyStatusMap = {
    NAO_INICIADO: "Não iniciado",
    EM_ANDAMENTO: "Em andamento",
    CONCLUIDO: "Concluído",
  };

  const formattedDate = deadline ? deadline.split("-").reverse().join("/") : "Sem data";

  const handleCheckboxChange = () => {
    const newStatus = status === "CONCLUIDO" ? "NAO_INICIADO" : "CONCLUIDO";
    if (onUpdateStatus) {
      onUpdateStatus({ ...task, status: newStatus });
    }
  };

  return (
    <div className={style.taskCard}>
      <div className={style.taskCardTop}>
        <div className={style.taskCardHeader}>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              checked={status === "CONCLUIDO"}
              onChange={handleCheckboxChange}
              id={`task-checkbox-${id}`}
            />
            <label
              htmlFor={`task-checkbox-${id}`}
              className={`${style.taskCardTitle} ${status === "CONCLUIDO" ? style.checkedTitle : ""}`}
            >
              {title}
            </label>
          </div>
          <p className={style.taskCardDescription}>{description}</p>
        </div>

        <TaskDropdown
  onEdit={() => onEditTask(task)}       // envia objeto completo
  onChangeStatus={() => onOpenStatusModal(task)} // envia objeto completo
  onDelete={() => onDeleteTask(task.id)}
/>

      </div>

      <div className={style.taskCardBottom}>
        <div className={style.taskDetails}>
          <span className={style.taskDate}>
            <Calendar className={style.calendarIcon} />
            {formattedDate}
          </span>
          <span className={style.taskSubject}>
            <Book className={style.bookIcon} />
            {subject?.title || ""}
          </span>
        </div>
        <TaskSpan content={friendlyStatusMap[status]} />
      </div>
    </div>
  );
}
