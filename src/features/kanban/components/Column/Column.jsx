import { useDroppable } from "@dnd-kit/core";
import Card from "../Card/Card";
import style from "./Column.module.css";

export default function Column({ title, color, items, columnId }) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div ref={setNodeRef} className={style.columnContainer}>
      <div
        className={style.columnTitleContainer}
        style={{ backgroundColor: color }}
      >
        <h3>{title}</h3>
      </div>

      {items.map((item, index) => (
        <Card
          key={item.id}
          id={`${columnId}-${index}`}
          title={item.title}
          deadline={item.deadline}
          subject={item.subject} // objeto {id, title}
        />
      ))}
    </div>
  );
}
