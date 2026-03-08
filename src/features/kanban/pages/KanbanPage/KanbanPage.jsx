import { useEffect, useState } from "react";
import style from "./KanbanPage.module.css";
import Header from "../../../../components/Header/Header";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import Column from "../../components/Column/Column";
import { getTasks, editTask } from "../../../tasks/services/taskService";

const STATUS_COLUMN_MAP = {
  NAO_INICIADO: "todo",
  EM_ANDAMENTO: "doing",
  CONCLUIDO: "done",
};

const COLUMN_STATUS_MAP = {
  todo: "NAO_INICIADO",
  doing: "EM_ANDAMENTO",
  done: "CONCLUIDO",
};

export default function KanbanPage() {
  const [columns, setColumns] = useState({
    todo: { label: "Não iniciada", color: "#ff00003a", items: [] },
    doing: { label: "Em andamento", color: "#0004ff3f", items: [] },
    done: { label: "Concluído", color: "#2ecc7042", items: [] },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // 🔹 Buscar tarefas (COM JWT)
  useEffect(() => {
    async function loadTasks() {
      try {
        const tasks = await getTasks();

        const newColumns = {
          todo: { ...columns.todo, items: [] },
          doing: { ...columns.doing, items: [] },
          done: { ...columns.done, items: [] },
        };

        tasks.forEach((task) => {
          const columnKey = STATUS_COLUMN_MAP[task.status];
          if (!columnKey) return;

          newColumns[columnKey].items.push({
            id: task.id,
            title: task.title,
            deadline: task.deadline,
            subject: task.subject, // 👈 objeto
            subjectId: task.subject?.id, // 👈 ID
            status: task.status,
          });
        });

        setColumns(newColumns);
      } catch (err) {
        console.error("Erro ao carregar tarefas:", err);
      }
    }

    loadTasks();
  }, []);

  // 🔹 Drag & Drop + persistência
  async function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const [fromCol, fromIndex] = active.id.split("-");
    const [toCol, toIndex] = over.id.split("-");

    const fromItems = [...columns[fromCol].items];
    const toItems = [...columns[toCol].items];

    // 🔁 Reordenação na mesma coluna
    if (fromCol === toCol) {
      const reordered = arrayMove(fromItems, +fromIndex, +toIndex);
      setColumns((prev) => ({
        ...prev,
        [fromCol]: { ...prev[fromCol], items: reordered },
      }));
      return;
    }

    // 🔀 Mudança de coluna
    const [moved] = fromItems.splice(+fromIndex, 1);
    const newStatus = COLUMN_STATUS_MAP[toCol];

    const updatedTask = {
      ...moved,
      status: newStatus,
    };

    toItems.splice(+toIndex, 0, updatedTask);

    setColumns((prev) => ({
      ...prev,
      [fromCol]: { ...prev[fromCol], items: fromItems },
      [toCol]: { ...prev[toCol], items: toItems },
    }));

    try {
      await editTask({
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        deadline: updatedTask.deadline,
        status: newStatus,
        subjectId: updatedTask.subjectId,
      });
    } catch (err) {
      console.error("Erro ao atualizar status da tarefa:", err);
    }
  }

  return (
    <div className={style.kanbanPage}>
      <Header
        pageName="Kanban"
        pageDescription="Organize suas tarefas com o quadro Kanban."
      />
      <div className={style.kanbanContainer}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {Object.entries(columns).map(([columnId, column]) => (
            <SortableContext
              key={columnId}
              items={column.items.map((_, i) => `${columnId}-${i}`)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                title={column.label}
                color={column.color}
                items={column.items}
                columnId={columnId}
              />
            </SortableContext>
          ))}
        </DndContext>
      </div>
    </div>
  );
}
