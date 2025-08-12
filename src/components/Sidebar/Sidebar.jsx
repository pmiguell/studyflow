import style from "./Sidebar.module.css";
import {
  BookOpen,
  Pencil,
  FileText,
  Clock,
  Settings,
  LogOut,
  Home
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className={style.sidebar}>
      <div className={style.top}>
        <h1>Study <br /> Flow</h1>
        <nav className={style.navigation}>
          <NavLink to="/home">
            <Home />
          </NavLink>
          <NavLink to="/materias">
            <BookOpen />
          </NavLink>
          <NavLink to="/tarefas">
            <Pencil />
          </NavLink>
          <NavLink to="/tarefas">
            <FileText />
          </NavLink>
          <NavLink to="/pomodoro">
            <Clock />
          </NavLink>
          <NavLink to="/tarefas">
            <Settings />
          </NavLink>
        </nav>
      </div>

      <div className={style.bottom}>
        <NavLink to="/login">
          <LogOut />
        </NavLink>
      </div>
    </aside>
  );
}
