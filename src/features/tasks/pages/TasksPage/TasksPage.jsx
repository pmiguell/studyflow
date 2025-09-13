import style from "./TasksPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import { useState, useEffect } from "react";
import TaskModal from "../../components/TaskModal/TaskModal.jsx";
import * as taskService from "../../services/taskService";

export default function TasksPage({ subjectId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await taskService.getTasks(subjectId);
        setTasks(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar tarefas");
      }
    }
    loadTasks();
  }, [subjectId]);

  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = async (taskData) => {
    try {
      let updatedTask;
      if (taskData.id) {
        updatedTask = await taskService.editTask(subjectId, taskData);
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      } else {
        updatedTask = await taskService.createTask(subjectId, taskData);
        setTasks([...tasks, updatedTask]);
      }
      setModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar tarefa");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(subjectId, id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar tarefa");
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
        onSubmit={handleSubmit}
      />

      <div className={style.tasksContainer}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onEditTask={handleEditTask}
            onDeleteTask={() => handleDeleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
