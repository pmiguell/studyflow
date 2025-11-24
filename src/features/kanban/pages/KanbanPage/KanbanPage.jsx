import { useState } from "react";
import style from "../KanbanPage/KanbanPage.module.css";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import Column from "../../components/Column/Column";

export default function KanbanPage() {
  const [columns, setColumns] = useState({
    todo: {
      label: "Não iniciada",
      color: "#ff00003a",
      items: [
        { text: "Tarefa 1", deadline: "20/11/2025", subject: "Cálculo I" },
        { text: "Tarefa 2", deadline: "21/11/2025", subject: "Programação Orientada a Objetos I" },
      ],
    },
    doing: {
      label: "Em andamento",
      color: "#0004ff3f",
      items: [{ text: "Tarefa 3", deadline: "05/02/2026", subject: "Redes de Computadores" }],
    },
    done: {
      label: "Concluído",
      color: "#2ecc7042",
      items: [{ text: "Tarefa 4", deadline: "10/02/2026", subject: "Programação Web" }],
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Função principal chamada ao soltar um card
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const [fromColumn, fromIndex] = active.id.split("-");
    const [toColumn, toIndex] = over.id.split("-");

    const fromItems = [...columns[fromColumn].items];
    const toItems = [...columns[toColumn].items];

    // Mesma coluna → só reordenar
    if (fromColumn === toColumn) {
      const newItems = arrayMove(fromItems, Number(fromIndex), Number(toIndex));

      setColumns((prev) => ({
        ...prev,
        [fromColumn]: {
          ...prev[fromColumn],
          items: newItems,
        },
      }));
      return;
    }

    // Colunas diferentes → mover item
    const [moved] = fromItems.splice(Number(fromIndex), 1);
    toItems.splice(Number(toIndex), 0, moved);

    setColumns((prev) => ({
      ...prev,
      [fromColumn]: {
        ...prev[fromColumn],
        items: fromItems,
      },
      [toColumn]: {
        ...prev[toColumn],
        items: toItems,
      },
    }));
  }

  return (
    <div className={style.kanbanContainer}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {Object.entries(columns).map(([columnId, columnData]) => (
          <SortableContext
            key={columnId}
            items={columnData.items.map((_, i) => `${columnId}-${i}`)}
            strategy={verticalListSortingStrategy}
          >
            <Column
              title={columnData.label}
              color={columnData.color}
              items={columnData.items}
              columnId={columnId}
            />
          </SortableContext>
        ))}
      </DndContext>
    </div>
  );
}
