import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Loader,
} from "lucide-react";
import styles from "./HomePage.module.css";
import Header from "../../../../components/Header/Header";
import TaskModal from "../../../tasks/components/TaskModal/TaskModal";
import TaskStatusModal from "../../../tasks/components/TaskStatusModal/TaskStatusModal";
import NextTasksTable from "../../components/NextTasksTable/NextTasksTable";
import { getTasks, editTask, deleteTask } from "../../../tasks/services/taskService";
import { getSubjects } from "../../../subjects/services/subjectsService";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksData, subjectsData] = await Promise.all([
        getTasks(),
        getSubjects(),
      ]);
      setSubjects(subjectsData || []);
      
      // Enrichir tasks com dados completos dos subjects
      const enrichedTasks = (tasksData || []).map(task => {
        const subject = (subjectsData || []).find(s => s.id === task.subjectId);
        return {
          ...task,
          subject: subject || task.subject
        };
      });
      
      setTasks(enrichedTasks || []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calcular estatísticas
  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
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

  const handleUpdateStatus = async (updatedTask) => {
    if (!updatedTask?.id) return;
    try {
      const updated = await editTask(updatedTask);
      // Enrichir com dados do subject
      const subject = subjects.find(s => s.id === updated.subjectId);
      updated.subject = subject || updated.subject;
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar status");
    }
  };

  const handleOpenStatusModal = (task) => {
    setEditingTask(task);
    setStatusModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      const updated = await editTask(taskData);
      // Enrichir com dados do subject
      const subject = subjects.find(s => s.id === updated.subjectId);
      updated.subject = subject || updated.subject;
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar tarefa");
    }
  };

  // Extrair status com segurança
  const getTaskStatus = (task) => {
    if (typeof task.status === "object") {
      return task.status?.name || task.status?.key || "NAO_INICIADO";
    }
    return task.status || "NAO_INICIADO";
  };

  // Calcular estatísticas
  const stats = {
    totalSubjects: subjects.length,
    completedTasks: tasks.filter(t => getTaskStatus(t) === "CONCLUIDO").length,
    pendingTasks: tasks.filter(t => {
      const status = getTaskStatus(t);
      return status === "NAO_INICIADO" || status === "EM_ANDAMENTO";
    }).length,
    overdueTasks: tasks.filter(t => {
      if (!t.deadline) return false;
      const deadline = new Date(t.deadline);
      const status = getTaskStatus(t);
      return deadline < new Date() && status !== "CONCLUIDO";
    }).length,
  };

  // Próximas 5 tarefas (não concluídas)
  const nextTasks = tasks
    .filter(t => t.status !== "CONCLUIDO")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  return (
    <div className={styles.dashboard}>
      
      {/* 📊 HEADER PADRONIZADO */}
      <Header 
        pageName="Dashboard" 
        pageDescription="Acompanhe seu progresso de estudos"
      />

      {/* MODAIS */}
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

      {/* 📦 CARDS DE MÉTRICAS */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.highlightCard}`}>
          <div>
            <p className={styles.statLabel}>Matérias Cadastradas</p>
            <h3 className={styles.statValue}>{stats.totalSubjects}</h3>
          </div>
          <div className={styles.iconWrapperWhite}>
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabelDark}>Tarefas Concluídas</p>
            <h3 className={styles.statValueDark}>{stats.completedTasks}</h3>
          </div>
          <div className={styles.iconWrapperGreen}>
            <CheckCircle2 size={32} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabelDark}>Tarefas Pendentes</p>
            <h3 className={styles.statValueDark}>{stats.pendingTasks}</h3>
          </div>
          <div className={styles.iconWrapperOrange}>
            <Loader size={32} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabelDark}>Tarefas Atrasadas</p>
            <h3 className={styles.statValueDark}>{stats.overdueTasks}</h3>
          </div>
          <div className={styles.iconWrapperRed}>
            <AlertTriangle size={32} />
          </div>
        </div>
      </div>

      {/* 📈 SEÇÃO INFERIOR */}
      <div className={styles.bottomGrid}>
        
        {/* 🥧 GRÁFICO DE PIZZA */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Matérias com pendências</h3>
          <div className={styles.pieChartContainer}>
            <div className={styles.pieChart}></div>
          </div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <span className={styles.dotBlue}></span> Auditoria (39%) <br/><span className={styles.taskCount}>- 5 tarefas</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.dotPurple}></span> Cálculo 1 (31%) <br/><span className={styles.taskCount}>- 4 tarefas</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.dotPink}></span> POO (18%) <br/><span className={styles.taskCount}>- 2 tarefas</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.dotGreen}></span> Estatística (12%) <br/><span className={styles.taskCount}>- 1 tarefa</span>
            </div>
          </div>
        </div>

        {/* 📋 PRÓXIMAS TAREFAS */}
        {!loading && <NextTasksTable tasks={tasks} subjects={subjects} />}

      </div>
    </div>
  );
}