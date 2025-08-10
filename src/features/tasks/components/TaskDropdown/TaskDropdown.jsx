import { useState, useRef, useEffect } from "react";
import style from "./TaskDropdown.module.css";
import { Ellipsis, Pencil, RefreshCcw, Trash2 } from "lucide-react";

export default function TaskDropdown({ onEdit }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={style.dropdownContainer} ref={dropdownRef}>
      <button
        className={style.dropdownButton}
        onClick={() => setOpen(!open)}
      >
        <Ellipsis />
      </button>

      {open && (
        <div className={style.dropdownMenu}>
          <button onClick={() => { onEdit(); setOpen(false); }}>
            <Pencil size={16} /> Editar
          </button>
          <button>
            <RefreshCcw size={16} /> Alterar Status
          </button>
          <button>
            <Trash2 size={16} /> Remover
          </button>
        </div>
      )}
    </div>
  );
}
