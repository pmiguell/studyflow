import style from "./TasksPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import { useState } from "react";
import TaskModal from "../../components/TaskModal/TaskModal.jsx";

export default function TasksPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar Algoritmos de Busca",
      description: "lorem impsum dolor sit amet.",
      subject: "IA",
      status: "Não iniciado",
      date: "2025-04-08",
    },
    {
      id: 2,
      title: "Fazer exercícios Série de Fourier",
      description: "lorem impsum dolor sit amet.",
      subject: "Cálculo II",
      status: "Em andamento",
      date: "2025-04-08",
    },
    {
      id: 3,
      title: "Escrever rascunho de Fundamentação Teórica",
      description: "lorem impsum dolor sit amet.",
      subject: "TCC I",
      status: "Em andamento",
      date: "2025-04-08",
    },
  ]);

  /*useEffect(() => {
    async function loadTasks() {
      try {
        const data = await taskService.fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadTasks();
  }, []);*/

  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setEditingTask(task);
    setModalOpen(true);
  };

  /*const handleChangeStatus = async (newStatus) => {
  // Atualiza status no backend e localmente
  const updatedTask = { ...statusTask, status: newStatus };
  // Chamada API para atualizar o status...
  setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  setStatusModalOpen(false);
  setStatusTask(null);
};*/

  /*const handleSubmit = async (taskData) => {
    try {
      let updatedTask;
      if (taskData.id) {
        updatedTask = await taskService.updateTask(taskData);
        setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      } else {
        updatedTask = await taskService.createTask(taskData);
        setTasks([...tasks, updatedTask]);
      }
      setModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar tarefa");
    }
  };*/

  /* const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar tarefa");
    }
  };*/

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
        //onSubmit
      />

      <div className={style.tasksContainer}>
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} onEditTask={handleEditTask} />
        ))}
      </div>
    </div>
  );
}
