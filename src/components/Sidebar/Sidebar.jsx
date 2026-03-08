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
  Calendar,
  Pin,
  PinOff
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { removeToken } from "../../features/auth/services/tokenService";
import logoWhite from "../../assets/logo-white.png";
import iconWhite from "../../assets/icon-white.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isPinned, setIsPinned] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();
    navigate("/login", { state: { logout: true } });
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  return (
    <aside className={`${style.sidebar} ${isPinned ? style.pinned : ""}`}>
      <div className={style.top}>
        <div className={style.logoContainer}>
          <img src={iconWhite} alt="StudyFlow Icon" className={style.iconImg} />
          <img src={logoWhite} alt="StudyFlow Logo" className={style.logoImg} />
        </div>
        <nav className={style.navigation}>
          <NavLink to="/home" className={({ isActive }) => isActive ? style.active : ""}>
            <Home size={24} />
            <span className={style.label}>Home</span>
          </NavLink>
          <NavLink to="/calendario" className={({ isActive }) => isActive ? style.active : ""}>
            <Calendar size={24} />
            <span className={style.label}>Calendário</span>
          </NavLink>
          <NavLink to="/materias" className={({ isActive }) => isActive ? style.active : ""}>
            <BookOpen size={24} />
            <span className={style.label}>Matérias</span>
          </NavLink>
          <NavLink to="/tarefas" className={({ isActive }) => isActive ? style.active : ""}>
            <Pencil size={24} />
            <span className={style.label}>Tarefas</span>
          </NavLink>
          <NavLink to="/resumos" className={({ isActive }) => isActive ? style.active : ""}>
            <FileText size={24} />
            <span className={style.label}>Resumos</span>
          </NavLink>
          <NavLink to="/kanban" className={({ isActive }) => isActive ? style.active : ""}>
            <SquareKanban size={24} />
            <span className={style.label}>Kanban</span>
          </NavLink>
          <NavLink to="/pomodoro" className={({ isActive }) => isActive ? style.active : ""}>
            <Clock size={24} />
            <span className={style.label}>Pomodoro</span>
          </NavLink>
          <NavLink to="/perfil" className={({ isActive }) => isActive ? style.active : ""}>
            <Settings size={24} />
            <span className={style.label}>Perfil</span>
          </NavLink>
        </nav>
      </div>

      <div className={style.bottom}>
        <a href="/login" onClick={handleLogout} className={style.logoutLink}>
          <LogOut size={24} />
          <span className={style.label}>Sair</span>
        </a>
        <button onClick={togglePin} className={style.pinButton} title={isPinned ? "Desafixar" : "Fixar"}>
          {isPinned ? <PinOff size={24} /> : <Pin size={24} />}
          <span className={style.label}>{isPinned ? "Desafixar" : "Fixar Menu"}</span>
        </button>
      </div>
    </aside>
  );
}
