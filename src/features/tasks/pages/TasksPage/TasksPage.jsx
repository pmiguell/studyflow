import { useState, useEffect } from "react";
import style from "./TasksPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import TaskModal from "../../components/TaskModal/TaskModal.jsx";
import TaskStatusModal from "../../components/TaskStatusModal/TaskStatusModal.jsx";
import { getTasks, createTask, editTask, deleteTask } from "../../services/taskService.js";
import { getSubjects } from "../../../subjects/services/subjectsService.js";

export default function TasksPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchSubjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (updatedTask) => {
    if (!updatedTask?.id) {
      console.error("Task id undefined");
      return;
    }
    try {
      const updated = await editTask(updatedTask);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar status");
    }
  };

  const openStatusModal = (task) => {
    setEditingTask(task);
    setStatusModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar tarefa");
    }
  };

const handleSaveTask = async (taskData) => {
  try {
    if (taskData.id) {
      // Edição
      const updated = await editTask(taskData);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      // Criação
      const created = await createTask(taskData);
      setTasks([...tasks, created]);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao salvar tarefa");
  }
};


  return (
    <div className={style.tasksPage}>
      <ActionsContainer
        onNewTask={() => {
          setEditingTask(null);
          setModalOpen(true);
        }}
      />

<TaskModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  task={editingTask}
  onSubmit={handleSaveTask}  // 🔹 agora funciona tanto para criar quanto editar
  subjects={subjects}
/>


      {statusModalOpen && (
        <TaskStatusModal
          task={editingTask}
          onClose={() => setStatusModalOpen(false)}
          onSubmit={handleUpdateStatus}
        />
      )}

      <div className={style.tasksContainer}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onOpenStatusModal={openStatusModal}
            onUpdateStatus={handleUpdateStatus} // opcional para checkbox
          />
        ))}
      </div>
    </div>
  );
}
