import { useState, useEffect } from "react";
import style from "./TasksPage.module.css";
import { LinearProgress } from "@mui/material";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import Header from "../../../../components/Header/Header";
import FilterContainer from '../../../../components/FilterContainer/FilterContainer';
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import TaskModal from "../../components/TaskModal/TaskModal.jsx";
import TaskStatusModal from "../../components/TaskStatusModal/TaskStatusModal.jsx";
import { getTasks, createTask, editTask, deleteTask } from "../../services/taskService.js";
import { getSubjects } from "../../../subjects/services/subjectsService.js";
import { useLocation } from "react-router-dom";

export default function TasksPage() {
  const location = useLocation();
  const subjectFromNav = location.state?.subject; // matéria do navigate

  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Agora guardamos só o ID da matéria para filtro
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjectFromNav?.id || "");

  // Busca tasks e subjects
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksData, subjectsData] = await Promise.all([
        getTasks(),
        getSubjects()
      ]);
      
      setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
      
      // Enrichir tasks com dados completos dos subjects
      const enrichedTasks = tasksData.map(task => {
        const subject = Array.isArray(subjectsData) 
          ? subjectsData.find(s => s.id === task.subjectId)
          : null;
        return {
          ...task,
          subject: subject || task.subject // usa o subject enrichido ou mantém o original
        };
      });
      
      setTasks(enrichedTasks);
      setFilteredTasks(enrichedTasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reaplica filtro sempre que tasks ou selectedSubjectId mudam
  useEffect(() => {
    if (!selectedSubjectId) {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter(
          (t) => t.subject && t.subject.id.toString() === selectedSubjectId.toString()
        )
      );
    }
  }, [tasks, selectedSubjectId]);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (updatedTask) => {
    if (!updatedTask?.id) return;
    try {
      const updated = await editTask(updatedTask);
      // Enrichir o task atualizado com dados do subject
      const subject = subjects.find(s => s.id === updated.subjectId);
      updated.subject = subject || updated.subject;
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
        // Enrichir o task atualizado com dados do subject
        const subject = subjects.find(s => s.id === updatedTask.subjectId);
        updatedTask = { ...updatedTask, subject: subject || updatedTask.subject };
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      } else {
        updatedTask = await createTask(taskData);
        // Enrichir o novo task com dados do subject
        const subject = subjects.find(s => s.id === updatedTask.subjectId);
        updatedTask = { ...updatedTask, subject: subject || updatedTask.subject };
        setTasks([...tasks, updatedTask]);
      }

      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar tarefa");
    }
  };

  return (
    <div className={style.tasksPage}>
      {loading && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 4,
            backgroundColor: '#a26dff30',
            '& .MuiLinearProgress-bar': { backgroundColor: '#a26dff' }
          }}
        />
      )}
      <div className={style.topBar}>
        <Header
          pageName="Suas Tarefas"
          pageDescription="Gerencie e organize seus materiais de estudo."
        />
        <ActionsContainer
          onNewTask={() => {
            setEditingTask(null);
            setSelectedSubjectId("");
            setModalOpen(true);
          }}
        />
      </div>

      <FilterContainer subjects={subjects} selectedSubject={selectedSubjectId} onFilterChange={setSelectedSubjectId} />

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
        {loading ? null : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onOpenStatusModal={openStatusModal}
              onUpdateStatus={handleUpdateStatus}
            />
          ))
        ) : (
          <p>Nenhuma tarefa encontrada</p>
        )}
      </div>

    </div>
  );
}
