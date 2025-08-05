import style from "./TaskCard.module.css";
import { Ellipsis, Calendar, Book } from "lucide-react";
import TaskSpan from "../TaskSpan/TaskSpan.jsx";

export default function TaskCard({
  title,
  description,
  subject,
  status,
  date,
}) {
  return (
    <div className={style.taskCard}>
      <div className={style.taskCardTop}>
        <div className={style.taskCardHeader}>
          <div className={style.checkboxContainer}>
            <input type="checkbox" />
            <label htmlFor="" className={style.taskCardTitle}>
              {title}
            </label>
          </div>
          <p className={style.taskCardDescription}>{description}</p>
        </div>
        <button className={style.taskCardSettings}>
          <Ellipsis />
        </button>
      </div>
      <div className={style.taskCardBottom}>
        <div className={style.taskDetails}>
          <span className={style.taskDate}><Calendar className={style.calendarIcon} />{date}</span>
          <span className={style.taskSubject}><Book className={style.bookIcon} />{subject}</span>
        </div>
          <TaskSpan content={status} />
      </div>
    </div>
  );
}
