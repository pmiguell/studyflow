import { useState, useEffect } from "react";
import style from "./TasksPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import TaskModal from "../../components/TaskModal/TaskModal.jsx";
import TaskStatusModal from "../../components/TaskStatusModal/TaskStatusModal.jsx";
import { getTasks, createTask, editTask, deleteTask } from "../../services/taskService.js";
import { getSubjects } from "../../../subjects/services/subjectsService.js";
import { useLocation } from "react-router-dom";

export default function TasksPage() {
  const location = useLocation();
  const subjectFromNav = location.state?.subject; // recebe matéria do navigate

  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState(subjectFromNav || null);


  // Busca tasks e subjects
  useEffect(() => {
    fetchTasks();
    fetchSubjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setFilteredTasks(data); // inicialmente mostra todas
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

  // Reaplica filtro sempre que tasks ou selectedSubject mudam
  useEffect(() => {
    if (!selectedSubject) {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((t) => t.subject && t.subject.id === selectedSubject.id)
      );
    }
  }, [tasks, selectedSubject]);

  const handleFilterChange = (subjectId) => {
    setSelectedSubject(subjectId);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (updatedTask) => {
    if (!updatedTask?.id) return;
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
      let updatedTask;
      if (taskData.id) {
        updatedTask = await editTask(taskData);
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      } else {
        updatedTask = await createTask(taskData);
        setTasks([...tasks, updatedTask]);
      }

      // Recarrega matérias completas
      const subjectsData = await getSubjects();
      setSubjects(Array.isArray(subjectsData) ? subjectsData : []);

      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar tarefa");
    }
  };

  return (
    <div className={style.tasksPage}>
      <ActionsContainer
        subjects={subjects}
        onFilterChange={(subject) => setSelectedSubject(subject)}
        selectedSubject={selectedSubject} // agora é o objeto da matéria
        onNewTask={() => {
          setEditingTask(null);
          setSelectedSubject(null); // resetar filtro
          setModalOpen(true);
        }}
      />

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        task={editingTask}
        onSubmit={handleSaveTask}
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
        {(filteredTasks || []).map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onOpenStatusModal={openStatusModal}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
}
