import React, { useState } from "react";
import { Eye, EyeOff, Calendar, BookOpen } from "lucide-react";
import styles from "./NextTasksTable.module.css";

const NextTasksTable = ({ tasks = [], subjects = [] }) => {
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  const statusColors = {
    "NAO_INICIADO": styles.statusRed,
    "EM_ANDAMENTO": styles.statusYellow,
    "CONCLUIDO": styles.statusGreen,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sem data";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Data inválida";
      return date.toLocaleDateString("pt-BR");
    } catch {
      return "Data inválida";
    }
  };

  const getStatusLabel = (status) => {
    const statusValue = typeof status === "string" ? status : String(status || "").trim();
    const statusLabels = {
      NAO_INICIADO: "Não iniciado",
      EM_ANDAMENTO: "Em andamento",
      CONCLUIDO: "Concluído",
    };
    return statusLabels[statusValue] || statusValue;
  };

  const getTaskStatus = (task) => {
    if (typeof task.status === "object") {
      return task.status?.name || task.status?.key || "NAO_INICIADO";
    }
    return task.status || "NAO_INICIADO";
  };

  const isOverdue = (task) => {
    if (!task.deadline) return false;
    const deadline = new Date(task.deadline);
    const status = getTaskStatus(task);
    return deadline < new Date() && status !== "CONCLUIDO";
  };

  let filteredTasks = tasks.filter(t => getTaskStatus(t) !== "CONCLUIDO");
  if (showOverdueOnly) {
    filteredTasks = filteredTasks.filter(isOverdue);
  }

  const getSubjectName = (task) => {
    if (task.subject?.title) return task.subject.title;
    if (task.subject?.name) return task.subject.name;
    return "Sem matéria";
  };

  const getTaskName = (task) => {
    if (task.title) return task.title;
    if (task.name?.title) return task.name.title;
    if (task.name) return String(task.name);
    return "Sem título";
  };

  return (
    <div className={styles.tasksCard}>
      <div className={styles.tasksHeader}>
        <h3 className={styles.cardTitle}>Próximas Tarefas</h3>
        <button
          className={styles.filterBtn}
          onClick={() => setShowOverdueOnly(!showOverdueOnly)}
        >
          {showOverdueOnly ? <><Eye size={16} /> Ver todas</> : <><EyeOff size={16} /> Ver atrasadas</>}
        </button>
      </div>

      <div className={styles.tableContainer}>
        {filteredTasks.length > 0 ? (
          <>
            {/* TABLE VIEW (Desktop) */}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matéria</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className={isOverdue(task) ? styles.overdueRow : ""}>
                    <td className={styles.taskName}>{getTaskName(task)}</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeDefault}`}>
                        {getSubjectName(task).substring(0, 15)}
                        {getSubjectName(task).length > 15 ? '...' : ''}
                      </span>
                    </td>
                    <td className={styles.taskDate}>{formatDate(task.deadline)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${statusColors[getTaskStatus(task)] || styles.statusDefault}`}>
                        {getStatusLabel(getTaskStatus(task))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* CARD VIEW (Mobile) via CSS display */}
            <div className={styles.mobileList}>
              {filteredTasks.map((task) => (
                <div key={task.id} className={`${styles.mobileTaskCard} ${isOverdue(task) ? styles.overdueCard : ""}`}>
                  <div className={styles.mobileCardHeader}>
                    <span className={`${styles.statusBadge} ${statusColors[getTaskStatus(task)] || styles.statusDefault}`}>
                      {getStatusLabel(getTaskStatus(task))}
                    </span>
                    <span className={styles.mobileDate}><Calendar size={14} /> {formatDate(task.deadline)}</span>
                  </div>
                  <h4 className={styles.mobileTaskTitle}>{getTaskName(task)}</h4>
                  <div className={styles.mobileSubject}>
                    <BookOpen size={14} /> {getSubjectName(task)}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className={styles.emptyText}>Nenhuma tarefa para mostrar</p>
        )}
      </div>
    </div>
  );
};

export default NextTasksTable;
