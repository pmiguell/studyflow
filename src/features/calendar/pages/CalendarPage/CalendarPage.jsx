import { useState, useEffect } from "react";
import style from "./CalendarPage.module.css";
import { LinearProgress, Snackbar, Alert } from "@mui/material";
import taskModalStyle from "../../../tasks/components/TaskModal/TaskModal.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import Header from "../../../../components/Header/Header.jsx";
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid.jsx";
import TaskModal from "../../../tasks/components/TaskModal/TaskModal.jsx";
import { getTasks, createTask, editTask, deleteTask } from "../../../tasks/services/taskService";
import { getSubjects } from "../../../subjects/services/subjectsService";

export default function CalendarPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [events, setEvents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, subjectsRes] = await Promise.all([
        getTasks(),
        getSubjects()
      ]);

      const enrichedTasks = (tasksRes || []).map(task => {
        const matchingSubject = (subjectsRes || []).find(s => s.id === task.subjectId);
        return {
          ...task,
          subject: matchingSubject || null
        };
      });

      setEvents(enrichedTasks);
      setSubjects(subjectsRes);
    } catch (error) {
      console.error("Erro ao carregar dados do calendário:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewEvent = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setModalOpen(false);
  };

  const handleSaveEvent = async (newEventData) => {
    setLoading(true);
    try {
      if (newEventData.id) {
        await editTask(newEventData);
        setSnackbar({ open: true, message: "Tarefa atualizada com sucesso!", severity: "success" });
      } else {
        await createTask(newEventData);
        setSnackbar({ open: true, message: "Tarefa criada com sucesso!", severity: "success" });
      }

      fetchData();
      setModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Erro ao salvar tarefa pelo calendário:", error);
      setSnackbar({ open: true, message: "Houve um erro ao salvar a tarefa.", severity: "error" });
      setLoading(false);
    }
  };

  const confirmDelete = (eventId) => {
    setTaskToDelete(eventId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!taskToDelete) return;

    setLoading(true);
    setDeleteConfirmOpen(false);

    try {
      await deleteTask(taskToDelete);
      fetchData();
      setSnackbar({ open: true, message: "Tarefa excluída com sucesso!", severity: "success" });
    } catch (error) {
      console.error("Erro ao deletar tarefa pelo calendário:", error);
      setSnackbar({ open: true, message: "Houve um erro ao excluir a tarefa.", severity: "error" });
      setLoading(false);
    } finally {
      setTaskToDelete(null);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className={style.calendarPage}>
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
          pageName="Calendário"
          pageDescription="Acompanhe todas as suas tarefas e avaliações do mês"
        />
        <ActionsContainer onNewEvent={handleNewEvent} />
      </div>

      <div className={style.calendarContent}>
        <CalendarGrid
          events={events}
          onDeleteEvent={confirmDelete}
          onEditEvent={(task) => {
            setEditingTask(task);
            setModalOpen(true);
          }}
        />
      </div>

      <TaskModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveEvent}
        task={editingTask}
        subjects={subjects}
      />

      {deleteConfirmOpen && (
        <div className={taskModalStyle.overlay}>
          <div className={taskModalStyle.modal} style={{ maxWidth: '400px' }}>
            <h2>Excluir Tarefa?</h2>
            <p style={{ margin: "0 0 1.5rem 0", color: "#5B5B5B", fontSize: "1rem" }}>
              Tem certeza de que deseja excluir esta tarefa permanentemente? Esta ação não pode ser desfeita.
            </p>
            <div className={taskModalStyle.actions} style={{ justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleDeleteEvent}
                style={{ backgroundColor: "#EF4444", color: "#fff" }}
              >
                Excluir
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', fontSize: '1rem', alignItems: 'center' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}