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
import { Chart as ChartJS, ArcElement, Tooltip, Legend as ChartLegend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, ChartLegend);

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

  const pendingTasksList = tasks.filter(t => getTaskStatus(t) !== "CONCLUIDO");

  const tasksPerSubject = pendingTasksList.reduce((acc, task) => {
    const subjectName = task.subject?.title || task.subject?.name || "Sem Matéria";
    const subjectColor = task.subject?.color || '#9ca3af';

    if (!acc[subjectName]) {
      acc[subjectName] = { count: 0, color: subjectColor };
    }
    acc[subjectName].count += 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(tasksPerSubject),
    datasets: [
      {
        data: Object.values(tasksPerSubject).map(item => item.count),
        backgroundColor: Object.values(tasksPerSubject).map(item => item.color),
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw;
            const total = context.chart._metasets[context.datasetIndex].total;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} tarefa(s) (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

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
        <div className={styles.chartCard} style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className={styles.cardTitle}>Matérias com pendências</h3>
          <div className={styles.pieChartContainer} style={{ flexGrow: 1, position: 'relative', minHeight: '220px' }}>
            {Object.keys(tasksPerSubject).length > 0 ? (
              <Pie data={pieData} options={pieOptions} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>
                <p>Nenhuma pendência, parabéns!</p>
              </div>
            )}
          </div>
          {Object.keys(tasksPerSubject).length > 0 && (
            <div className={styles.chartLegend}>
              {Object.entries(tasksPerSubject).map(([subject, info]) => {
                const total = pendingTasksList.length;
                const percentage = Math.round((info.count / total) * 100);

                return (
                  <div key={subject} className={styles.legendItem}>
                    <span style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      borderRadius: '2px',
                      backgroundColor: info.color,
                      marginRight: '4px'
                    }}></span>
                    {subject} ({percentage}%) <br /><span className={styles.taskCount}>- {info.count} tarefa{info.count > 1 ? 's' : ''}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 📋 PRÓXIMAS TAREFAS */}
        {!loading && <NextTasksTable tasks={tasks} subjects={subjects} />}

      </div>
    </div>
  );
}