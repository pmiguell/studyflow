import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Book, Calendar, ChevronRight } from "lucide-react";
import style from "./Card.module.css";
import { useState, useEffect } from "react";

export default function Card({ id, title, deadline, subject }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={dndStyle}
      className={style.card}
      {...attributes}
      {...listeners}
    >
      <div className={style.cardHeader}>
        <h4>{title}</h4>
        {isMobile && <ChevronRight size={18} className={style.mobileIndicator} />}
      </div>

      <div className={style.taskInfoArea}>
        <div>
          <Calendar size={14} /> {deadline || "Sem prazo"}
        </div>
        <div>
          <Book size={14} /> {subject?.title || subject?.name || "Sem matéria"}
        </div>
      </div>
      
      {isMobile && (
        <div className={style.mobileHint}>
          Pressione e arraste para mudar o status
        </div>
      )}
    </div>
  );
}
