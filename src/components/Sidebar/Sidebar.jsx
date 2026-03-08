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
  PinOff,
  Menu,
  X
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { removeToken } from "../../features/auth/services/tokenService";
import logoWhite from "../../assets/logo-white.png";
import iconWhite from "../../assets/icon-white.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isPinned, setIsPinned] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();
    navigate("/login", { state: { logout: true } });
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Fecha o menu ao clicar em um link no mobile
  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen(false);
    }
  };

  // Desativa o scroll do corpo quando o menu lateral está aberto no mobile
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileOpen]);

  return (
    <>
      <button className={style.mobileToggle} onClick={toggleMobileMenu}>
        {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Overlay para fechar o menu ao clicar fora no mobile */}
      {isMobileOpen && (
        <div className={style.mobileOverlay} onClick={toggleMobileMenu} />
      )}

      <aside className={`${style.sidebar} ${isPinned ? style.pinned : ""} ${isMobileOpen ? style.mobileOpen : ""}`}>
        <div className={style.top}>
          <div className={style.logoContainer}>
            <img src={iconWhite} alt="StudyFlow Icon" className={style.iconImg} />
            <img src={logoWhite} alt="StudyFlow Logo" className={style.logoImg} />
          </div>
          <nav className={style.navigation}>
            <NavLink 
              to="/home" 
              className={({ isActive }) => isActive ? style.active : ""}
              onClick={handleNavLinkClick}
            >
              <Home size={24} />
              <span className={style.label}>Home</span>
            </NavLink>
            <NavLink 
              to="/calendario" 
              className={({ isActive }) => isActive ? style.active : ""}
              onClick={handleNavLinkClick}
            >
              <Calendar size={24} />
              <span className={style.label}>Calendário</span>
            </NavLink>
            <NavLink 
              to="/materias" 
              className={({ isActive }) => isActive ? style.active : ""}
              onClick={handleNavLinkClick}
            >
              <BookOpen size={24} />
              <span className={style.label}>Matérias</span>
            </NavLink>
            <NavLink 
              to="/tarefas" 
              className={({ isActive }) => isActive ? style.active : ""}
              onClick={handleNavLinkClick}
            >
              <Pencil size={24} />
              <span className={style.label}>Tarefas</span>
            </NavLink>
            <NavLink 
              to="/resumos" 
              className={({ isActive }) => isActive ? style.active : ""}
              onClick={handleNavLinkClick}
            >
              <FileText size={24} />
              <span className={style.label}>Resumos</span>
            </NavLink>
            <NavLink 
              to="/kanban" 
              className={({ isActive }) => isActive ? style.active : ""}
              onClick={handleNavLinkClick}
            >
              <SquareKanban size={24} />
              <span className={style.label}>Kanban</span>
            </NavLink>
            <NavLink 
              to="/pomodoro" 
              className={({ isActive }) => isActive ? style.active : ""}
              onClick={handleNavLinkClick}
            >
              <Clock size={24} />
              <span className={style.label}>Pomodoro</span>
            </NavLink>
            <NavLink 
              to="/perfil" 
              className={({ isActive }) => isActive ? style.active : ""}
              onClick={handleNavLinkClick}
            >
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
    </>
  );
}
