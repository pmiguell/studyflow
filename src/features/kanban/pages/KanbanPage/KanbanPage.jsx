import { useEffect, useState } from "react";
import style from "./KanbanPage.module.css";
import Header from "../../../../components/Header/Header";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import Column from "../../components/Column/Column";
import { getTasks, editTask } from "../../../tasks/services/taskService";
import { getSubjects } from "../../../subjects/services/subjectsService";

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
    todo: { label: "Não iniciada", color: "#ff00001a", items: [] },
    doing: { label: "Em andamento", color: "#0004ff1a", items: [] },
    done: { label: "Concluído", color: "#2ecc701a", items: [] },
  });

  const [activeTab, setActiveTab] = useState("todo");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  // 🔹 Buscar tarefas (COM JWT)
  useEffect(() => {
    async function loadTasks() {
      try {
        const [tasks, subjects] = await Promise.all([
          getTasks(),
          getSubjects(),
        ]);

        const newColumns = {
          todo: { ...columns.todo, items: [] },
          doing: { ...columns.doing, items: [] },
          done: { ...columns.done, items: [] },
        };

        tasks.forEach((task) => {
          const columnKey = STATUS_COLUMN_MAP[task.status];
          if (!columnKey) return;

          const subject = subjects.find((s) => s.id === task.subjectId) || null;

          newColumns[columnKey].items.push({
            id: task.id,
            title: task.title,
            deadline: task.deadline,
            subject: subject,
            subjectId: task.subjectId,
            status: task.status,
            description: task.description,
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

    // IDs formatados como: column-index
    const activeId = String(active.id);
    const overId = String(over.id);

    // No mobile, IDs dropáveis podem ser só o columnId
    const [fromCol, fromIndexStr] = activeId.split("-");
    const fromIndex = parseInt(fromIndexStr, 10);

    // O 'over' pode ser uma coluna inteira ou um card específico
    let toCol, toIndex;
    if (overId.includes("-")) {
      const parts = overId.split("-");
      toCol = parts[0];
      toIndex = parseInt(parts[1], 10);
    } else {
      toCol = overId;
      toIndex = columns[toCol].items.length;
    }

    const fromItems = [...columns[fromCol].items];
    const toItems = [...columns[toCol].items];

    // 🔁 Reordenação na mesma coluna
    if (fromCol === toCol) {
      const reordered = arrayMove(fromItems, fromIndex, toIndex);
      setColumns((prev) => ({
        ...prev,
        [fromCol]: { ...prev[fromCol], items: reordered },
      }));
      return;
    }

    // 🔀 Mudança de coluna
    const [moved] = fromItems.splice(fromIndex, 1);
    console.log("moved:", moved); // ← verifica se subject está aqui

    const newStatus = COLUMN_STATUS_MAP[toCol];

    const updatedTask = {
      ...moved,
      status: newStatus,
    };

    toItems.splice(toIndex, 0, updatedTask);

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
        pageName="Quadro Kanban"
        pageDescription="Organize suas tarefas movendo-as entre as etapas de progresso."
      />

      {isMobile && (
        <div className={style.tabs}>
          {Object.entries(columns).map(([id, col]) => (
            <button
              key={id}
              className={`${style.tab} ${activeTab === id ? style.activeTab : ""}`}
              onClick={() => setActiveTab(id)}
            >
              <span className={style.labelTitle}>{col.label}</span>
              <span className={style.count}>{col.items.length}</span>
            </button>
          ))}
        </div>
      )}

      <div className={style.kanbanContainer}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className={`${style.columnWrapper} ${activeTab === columnId ? style.activeColumn : ""}`}
            >
              <SortableContext
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
            </div>
          ))}
        </DndContext>
      </div>
    </div>
  );
}
