import style from "./Sidebar.module.css";
import {
  BookOpen,
  Pencil,
  FileText,
  Clock,
  Settings,
  LogOut,
  Home,
  SquareKanban,
  Calendar
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../features/auth/services/tokenService";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();
    navigate("/login", { state: { logout: true } });
  };
  return (
    <aside className={style.sidebar}>
      <div className={style.top}>
        <h1>Study <br /> Flow</h1>
        <nav className={style.navigation}>
          <NavLink to="/home">
            <Home />
          </NavLink>
          <NavLink to="/calendario">
            <Calendar />
          </NavLink>
          <NavLink to="/materias">
            <BookOpen />
          </NavLink>
          <NavLink to="/tarefas">
            <Pencil />
          </NavLink>
          <NavLink to="/resumos">
            <FileText />
          </NavLink>
          <NavLink to="/kanban">
            <SquareKanban />
          </NavLink>
          <NavLink to="/pomodoro">
            <Clock />
          </NavLink>
          <NavLink to="/perfil">
            <Settings />
          </NavLink>
        </nav>
      </div>

      <div className={style.bottom}>
        <a href="/login" onClick={handleLogout}>
          <LogOut />
        </a>
      </div>
    </aside>
  );
}
