import style from "./Sidebar.module.css";
import {
  BookOpen,
  Pencil,
  FileText,
  Clock,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className={style.sidebar}>
      <div className={style.top}>
        <h1>Study <br /> Flow</h1>
        <nav className={style.navigation}>
          <NavLink to="/dashboard">
            <BookOpen />
          </NavLink>
          <NavLink to="/planner">
            <Pencil />
          </NavLink>
          <NavLink to="/tasks">
            <FileText />
          </NavLink>
          <NavLink to="/history">
            <Clock />
          </NavLink>
          <NavLink to="/settings">
            <Settings />
          </NavLink>
        </nav>
      </div>

      <div className={style.bottom}>
        <button>
          <LogOut />
        </button>
      </div>
    </aside>
  );
}
