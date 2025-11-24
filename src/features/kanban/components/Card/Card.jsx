import { useSortable } from "@dnd-kit/sortable";
import style from "./Card.module.css";
import { Book, Calendar } from "lucide-react";

export default function Card({ id, text, deadline, subject }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <div ref={setNodeRef} className={style.card} {...attributes} {...listeners}>
      <h1>{text}</h1>

      <div className={style.taskInfoArea}>
        <div className={style.taskDeadline}>
          <Calendar size={14} />
          <p>{deadline}</p>
        </div>

        <div className={style.taskSubject}>
          <Book size={14} />
          <p>{subject}</p>
        </div>
      </div>
    </div>
  );
}

