import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../features/auth/pages/RegisterPage/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage/LoginPage";
import VerifyUserPage from "../features/auth/pages/VerifyUserPage/VerifyUserPage";
import AppLayout from "../layout/AppLayout";
import TasksPage from "../features/tasks/pages/TasksPage/TasksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ element: <HomePage /> }],
  },
  {
    path: "/cadastro",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/verificacao",
    element: <VerifyUserPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "materias", element: <LoginPage /> },
      { path: "tarefas", element: <TasksPage /> },
      { path: "resumos", element: <LoginPage /> },
    ],
  },
]);

export default router;
