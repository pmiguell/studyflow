import React, { useState } from "react";
import {
  Home,
  Calendar,
  Book,
  BookOpen,
  CheckSquare,
  FileText,
  Clock,
  Settings,
  LogOut,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Loader,
  Eye
} from "lucide-react";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  // --- Dados Fictícios (Mock Data) ---
  const mockTasks = [
    { id: 1, name: "Estudar Aleatoriedade", subject: "Auditoria", date: "15/02/26", status: "Atrasado" },
    { id: 2, name: "Estudar Pseudo Alea...", subject: "Auditoria", date: "15/02/26", status: "Atrasado" },
    { id: 3, name: "Fazer Trabalho", subject: "POO", date: "13/03/26", status: "Pendente" },
    { id: 4, name: "Estudar Integrais", subject: "Cálculo 1", date: "15/02/26", status: "Pendente" },
    { id: 5, name: "Fazer Lista de Ativid...", subject: "Cálculo 1", date: "15/02/26", status: "Pendente" },
    { id: 6, name: "Estudar Pseudo Alea...", subject: "Estatística", date: "15/02/26", status: "Pendente" },
  ];

  const filteredTasks = showOverdueOnly 
    ? mockTasks.filter(t => t.status === "Atrasado") 
    : mockTasks;

  const subjectColors = {
    "Auditoria": styles.badgeBlue,
    "POO": styles.badgePink,
    "Cálculo 1": styles.badgePurple,
    "Estatística": styles.badgeGreen,
  };

  const statusColors = {
    "Atrasado": styles.statusRed,
    "Pendente": styles.statusYellow,
  };

  return (
    <div className={styles.layout}>
      {/* 🟣 SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <h1 className={styles.logo}>
            Study<br />Flow
          </h1>
          <nav className={styles.navMenu}>
            <button className={`${styles.navItem} ${styles.active}`}><Home size={24} /></button>
            <button className={styles.navItem}><Calendar size={24} /></button>
            <button className={styles.navItem}><Book size={24} /></button>
            <button className={styles.navItem}><BookOpen size={24} /></button>
            <button className={styles.navItem}><CheckSquare size={24} /></button>
            <button className={styles.navItem}><FileText size={24} /></button>
            <button className={styles.navItem}><Clock size={24} /></button>
            <button className={styles.navItem}><Settings size={24} /></button>
          </nav>
        </div>
        <button className={styles.logoutBtn}>
          <LogOut size={24} />
        </button>
      </aside>

      {/* 🧾 MAIN CONTENT */}
      <main className={styles.mainContent}>
        
        {/* 👋 HEADER */}
        <header className={styles.header}>
          <div>
            <h2 className={styles.greeting}>Olá, Pedro!</h2>
            <p className={styles.subtitle}>Seja bem-vindo ao StudyFlow</p>
          </div>
          <div className={styles.avatar}>P</div>
        </header>

        {/* 📊 TÍTULO DA PÁGINA */}
        <div className={styles.pageTitle}>
          <h1>Dashboard</h1>
          <p>Acompanhe seu progresso de estudos</p>
        </div>

        {/* 📦 CARDS DE MÉTRICAS */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.highlightCard}`}>
            <div>
              <p className={styles.statLabel}>Matérias Cadastradas</p>
              <h3 className={styles.statValue}>6</h3>
            </div>
            <div className={styles.iconWrapperWhite}>
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div className={styles.statCard}>
            <div>
              <p className={styles.statLabelDark}>Tarefas Concluídas</p>
              <h3 className={styles.statValueDark}>25</h3>
            </div>
            <div className={styles.iconWrapperGreen}>
              <CheckCircle2 size={32} />
            </div>
          </div>

          <div className={styles.statCard}>
            <div>
              <p className={styles.statLabelDark}>Tarefas Pendentes</p>
              <h3 className={styles.statValueDark}>10</h3>
            </div>
            <div className={styles.iconWrapperOrange}>
              <Loader size={32} />
            </div>
          </div>

          <div className={styles.statCard}>
            <div>
              <p className={styles.statLabelDark}>Tarefas Atrasadas</p>
              <h3 className={styles.statValueDark}>2</h3>
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
          <div className={styles.tasksCard}>
            <div className={styles.tasksHeader}>
              <h3 className={styles.cardTitle}>Próximas Tarefas</h3>
              <button 
                className={styles.filterBtn}
                onClick={() => setShowOverdueOnly(!showOverdueOnly)}
              >
                <Eye size={16} /> Mostrar atrasadas
              </button>
            </div>
            
            <div className={styles.tableContainer}>
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
                    <tr key={task.id}>
                      <td className={styles.taskName}>{task.name}</td>
                      <td>
                        <span className={`${styles.badge} ${subjectColors[task.subject]}`}>
                          {task.subject}
                        </span>
                      </td>
                      <td className={styles.taskDate}>{task.date}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${statusColors[task.status]}`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}