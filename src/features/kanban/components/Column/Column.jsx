import { useDroppable } from "@dnd-kit/core";
import Card from "../../components/Card/Card";
import style from "../Column/Column.module.css";

export default function Column({ title, color, items, columnId }) {
  const { setNodeRef } = useDroppable({
    id: columnId, 
  });

  return (
    <div ref={setNodeRef} className={style.columnContainer}>
      <div
        className={style.columnTitleContainer}
        style={{ backgroundColor: color }}
      >
        <h3 className={style.columnTitle}>{title}</h3>
      </div>

      {items.map((item, index) => (
  <Card
    key={index}
    id={`${columnId}-${index}`}
    text={item.text}
    deadline={item.deadline}
    subject={item.subject}
  />
))}

    </div>
  );
}
