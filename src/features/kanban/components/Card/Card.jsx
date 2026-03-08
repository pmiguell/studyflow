import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Book, Calendar } from "lucide-react";
import style from "./Card.module.css";

export default function Card({ id, title, deadline, subject }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={style.card}
      {...attributes}
      {...listeners}
    >
      <h4>{title}</h4>

      <div className={style.taskInfoArea}>
        <div>
          <Calendar size={14} /> {deadline}
        </div>
        <div>
          <Book size={14} /> {subject?.title ?? ""}
        </div>
      </div>
    </div>
  );
}
