import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/dashboard/pages/HomePage/HomePage";
import RegisterPage from "../features/auth/pages/RegisterPage/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage/LoginPage";
import VerifyUserPage from "../features/auth/pages/VerifyUserPage/VerifyUserPage";
import AppLayout from "../layout/AppLayout";
import TasksPage from "../features/tasks/pages/TasksPage/TasksPage";
import SubjectsPage from "../features/subjects/pages/SubjectsPage/SubjectsPage";
import PomodoroPage from "../features/pomodoro/pages/PomodoroPage/PomodoroPage";
import SummaryPage from "../features/summary/pages/SummaryPage/SummaryPage";
import AccountPage from "../features/account/pages/AccountPage";
import KanbanPage from "../features/kanban/pages/KanbanPage/KanbanPage"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/cadastro", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/verificacao", element: <VerifyUserPage /> },

  {
    path: "/",
    // element: <ProtectedRoute />, // protege todas as rotas abaixo
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "materias", element: <SubjectsPage /> },
          { path: "tarefas", element: <TasksPage /> },
          { path: "resumos", element: <SummaryPage /> },
          { path: "pomodoro", element: <PomodoroPage /> },
          { path: "perfil", element: <AccountPage /> },
          { path: "kanban", element: <KanbanPage /> },
        ],
      },
    ],
  },
]);

export default router;
