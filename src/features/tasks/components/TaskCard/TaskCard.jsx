import style from "./TaskCard.module.css";
import { Calendar, Book } from "lucide-react";
import TaskSpan from "../TaskSpan/TaskSpan.jsx";
import { useState } from "react";
import TaskDropdown from "../TaskDropdown/TaskDropdown.jsx";

export default function TaskCard({
  id,
  title,
  description,
  subject,
  status,
  date,
  onEditTask,
}) {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className={style.taskCard}>
      <div className={style.taskCardTop}>
        <div className={style.taskCardHeader}>
          <div className={style.checkboxContainer}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              id={`task-checkbox-${title}`}
            />
            <label
              htmlFor={`task-checkbox-${title}`}
              className={`${style.taskCardTitle} ${
                checked ? style.checkedTitle : ""
              }`}
            >
              {title}
            </label>
          </div>
          <p className={style.taskCardDescription}>{description}</p>
        </div>

        <TaskDropdown
          onEdit={() => onEditTask(id)}
          onChangeStatus={() => onChangeStatus(id)}
          onDelete={() => onDeleteTask(id)}
        />
      </div>

      <div className={style.taskCardBottom}>
        <div className={style.taskDetails}>
          <span className={style.taskDate}>
            <Calendar className={style.calendarIcon} />
            {date}
          </span>
          <span className={style.taskSubject}>
            <Book className={style.bookIcon} />
            {subject}
          </span>
        </div>
        <TaskSpan content={status} />
      </div>
    </div>
  );
}
