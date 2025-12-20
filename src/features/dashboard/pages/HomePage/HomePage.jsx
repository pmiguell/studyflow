import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckSquare,
  FileText,
  AlertTriangle,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { getTasks } from "../../../tasks/services/taskService";
import { getSubjects } from "../../../subjects/services/subjectsService";
import { getSummaries } from "../../../summary/services/summaryService";
import Header from "../../../../components/Header/Header";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    subjects: 0,
    summaries: 0,
    tasks: {
      notStarted: 0,
      pending: 0,
      completed: 0,
      overdue: 0,
      progress: 0,
    },
    nextTask: null,
    mostDemandingSubject: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [tasks, subjects, summaries] = await Promise.all([
          getTasks(),
          getSubjects(),
          getSummaries(),
        ]);

        const notStarted = tasks.filter(
          (t) => t.status === "NAO_INICIADO"
        ).length;
        const pending = tasks.filter((t) => t.status === "EM_ANDAMENTO").length;
        const completed = tasks.filter((t) => t.status === "CONCLUIDO").length;

        const today = new Date();
        const overdue = tasks.filter(
          (t) =>
            t.deadline &&
            new Date(t.deadline) < today &&
            t.status !== "CONCLUIDO"
        ).length;

        const progress =
          tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

        const nextTask = tasks
          .filter((t) => t.deadline && t.status !== "CONCLUIDO")
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];

        const subjectCount = {};
        tasks.forEach((t) => {
          const name = t.subject?.title;
          if (name) subjectCount[name] = (subjectCount[name] || 0) + 1;
        });

        const mostDemandingSubject = Object.entries(subjectCount).sort(
          (a, b) => b[1] - a[1]
        )[0];

        setStats({
          subjects: subjects.length,
          summaries: summaries.length,
          tasks: {
            notStarted,
            pending,
            completed,
            overdue,
            progress,
          },
          nextTask,
          mostDemandingSubject,
        });
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar o dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.dashboard}>
      <Header
        pageName="Dashboard"
        pageDescription="Visão geral das suas atividades de estudo."
      />
      <div className={styles.statsGrid}>
        <StatCard
          title="Total de Matérias"
          value={stats.subjects}
          icon={<BookOpen />}
        />
        <StatCard
          title="Não iniciadas"
          value={stats.tasks.notStarted}
          icon={<AlertTriangle />}
        />
        <StatCard
          title="Em andamento"
          value={stats.tasks.pending}
          icon={<TrendingUp />}
        />
        <StatCard
          title="Concluídas"
          value={stats.tasks.completed}
          icon={<CheckSquare />}
        />
        <StatCard
          title="Resumos criados"
          value={stats.summaries}
          icon={<FileText />}
        />
        <StatCard
          title="Tarefas atrasadas"
          value={stats.tasks.overdue}
          danger
          icon={<Calendar />}
        />
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h3>📊 Progresso geral</h3>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${stats.tasks.progress}%` }}
            />
          </div>
          <p>{stats.tasks.progress}% concluído</p>
        </div>

        <div className={styles.infoCard}>
          <h3>⏭ Próxima tarefa</h3>
          {stats.nextTask ? (
            <>
              <strong>{stats.nextTask.title}</strong>
              <p>{stats.nextTask.subject?.title}</p>
              <p>
                {stats.nextTask.deadline
                  ? stats.nextTask.deadline.split("-").reverse().join("/")
                  : "Sem data"}
              </p>
            </>
          ) : (
            <p>Nenhuma tarefa pendente 🎉</p>
          )}
        </div>

        <div className={styles.infoCard}>
          <h3>📚 Matéria com mais tarefas</h3>
          {stats.mostDemandingSubject ? (
            <p>
              {stats.mostDemandingSubject[0]} ({stats.mostDemandingSubject[1]}{" "}
              tarefas)
            </p>
          ) : (
            <p>—</p>
          )}
        </div>
      </div>

      <button className={styles.ctaButton} onClick={() => navigate("/kanban")}>
        Ir para o Kanban →
      </button>
    </div>
  );
}

function StatCard({ title, value, danger, icon }) {
  return (
    <div className={`${styles.statCard} ${danger ? styles.dangerCard : ""}`}>
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p className={styles.statNumber}>{value}</p>
    </div>
  );
}
