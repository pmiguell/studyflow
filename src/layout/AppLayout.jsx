import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import style from "./AppLayout.module.css";

export default function AppLayout() {
  const location = useLocation();

  const pageConfig = {
    "/materias": { name: "Matérias", description: "Gerencie aqui suas matérias de estudo" },
    "/tarefas": { name: "Tarefas", description: "Gerencie aqui suas tarefas por matéria" },
    "/resumos": { name: "Resumos", description: "Gerencie aqui seus resumos por matéria" },
  };

  const { name, description } = pageConfig[location.pathname] || {
    name: "",
    description: "",
  };

  return (
    <div className={style.app}>
      <Sidebar />
      <main className={style.main}>
        <Header pageName={name} pageDescription={description} />
          <Outlet />
      </main>
    </div>
  );
}
