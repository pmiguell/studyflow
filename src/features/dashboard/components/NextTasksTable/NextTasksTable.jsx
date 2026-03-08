import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./NextTasksTable.module.css";

const NextTasksTable = ({ tasks = [], subjects = [] }) => {
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  // Mapeamento de cores para matérias
  const subjectColors = {
    "Auditoria": styles.badgeBlue,
    "Cálculo 1": styles.badgePurple,
    "POO": styles.badgePink,
    "Estatística": styles.badgeGreen,
  };

  // Mapeamento de cores para status
  const statusColors = {
    "NAO_INICIADO": styles.statusRed,
    "EM_ANDAMENTO": styles.statusYellow,
    "CONCLUIDO": styles.statusGreen,
  };

  // Formatar data
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

  // Obter rótulo do status com segurança
  const getStatusLabel = (status) => {
    const statusValue = typeof status === "string" ? status : String(status || "").trim();
    const statusLabels = {
      NAO_INICIADO: "Não iniciado",
      EM_ANDAMENTO: "Em andamento",
      CONCLUIDO: "Concluído",
    };
    return statusLabels[statusValue] || statusValue;
  };

  // Obter status com segurança
  const getTaskStatus = (task) => {
    if (typeof task.status === "object") {
      return task.status?.name || task.status?.key || "NAO_INICIADO";
    }
    return task.status || "NAO_INICIADO";
  };

  // Verificar se tarefa está atrasada
  const isOverdue = (task) => {
    if (!task.deadline) return false;
    const deadline = new Date(task.deadline);
    const status = getTaskStatus(task);
    return deadline < new Date() && status !== "CONCLUIDO";
  };

  // Filtrar tarefas
  let filteredTasks = tasks.filter(t => getTaskStatus(t) !== "CONCLUIDO");
  if (showOverdueOnly) {
    filteredTasks = filteredTasks.filter(isOverdue);
  }

  // Obter nome da matéria com validação
  const getSubjectName = (task) => {
    try {
      if (task.subject) {
        // Tentar obter title primeiro (nova estrutura)
        if (task.subject.title) {
          return String(task.subject.title).trim();
        }
        // Fallback para name
        if (task.subject.name) {
          return String(task.subject.name).trim();
        }
      }
      return "Sem matéria";
    } catch (err) {
      console.error("Erro ao obter nome da matéria:", err, task);
      return "Sem matéria";
    }
  };

  // Obter nome da tarefa com validação robusta
  const getTaskName = (task) => {
    try {
      // Tentar obter title primeiro (nova estrutura)
      if (task.title) {
        return String(task.title).trim();
      }
      // Fallback para name
      if (task.name) {
        if (typeof task.name === "object" && task.name?.title) {
          return String(task.name.title).trim();
        }
        return String(task.name).trim();
      }
      return "Sem título";
    } catch (err) {
      console.error("Erro ao obter nome da tarefa:", err, task);
      return "Sem título";
    }
  };

  return (
    <div className={styles.tasksCard}>
      <div className={styles.tasksHeader}>
        <h3 className={styles.cardTitle}>Próximas Tarefas</h3>
        <button
          className={styles.filterBtn}
          onClick={() => setShowOverdueOnly(!showOverdueOnly)}
          title={showOverdueOnly ? "Mostrar todas" : "Mostrar apenas atrasadas"}
        >
          {showOverdueOnly ? (
            <>
              <Eye size={16} /> Mostrar todas
            </>
          ) : (
            <>
              <EyeOff size={16} /> Mostrar atrasadas
            </>
          )}
        </button>
      </div>

      <div className={styles.tableContainer}>
        {filteredTasks.length > 0 ? (
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
              {filteredTasks.map((task) => {
                // Validação extra: garantir que task.id é válido
                if (!task || !task.id) {
                  console.warn("Tarefa sem ID válido:", task);
                  return null;
                }
                
                return (
                  <tr key={task.id} className={isOverdue(task) ? styles.overdueRow : ""}>
                    <td className={styles.taskName}>{getTaskName(task)}</td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          subjectColors[getSubjectName(task)] || styles.badgeDefault
                        }`}
                      >
                        {getSubjectName(task)}
                      </span>
                    </td>
                    <td className={styles.taskDate}>{formatDate(task.deadline)}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          statusColors[getTaskStatus(task)] || styles.statusDefault
                        }`}
                      >
                        {getStatusLabel(getTaskStatus(task))}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className={styles.emptyText}>
            {showOverdueOnly
              ? "Nenhuma tarefa atrasada"
              : "Nenhuma tarefa pendente"}
          </p>
        )}
      </div>
    </div>
  );
};

export default NextTasksTable;
