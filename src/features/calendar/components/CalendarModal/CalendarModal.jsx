import { useState } from "react";
import { Palette, CalendarDays } from "lucide-react";
import style from "./CalendarModal.module.css"; 

export default function CalendarModal({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("#8ed1fc");

  if (!open) return null;

  const colorOptions = [
    "#8ed1fc",
    "#bbf9bb",
    "#feb27c",
    "#c6bdf8",
    "#fc9eb9",
    "#d6d6d6",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    
    onSave({ title, date, color }); 
    
    setTitle("");
    setDate("");
    setColor("#8ed1fc");
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2><CalendarDays size={20} className={style.headerIcon} /> Novo Evento</h2>
        <form onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="title"
            placeholder="Título do evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min="2000-01-01"
            max="2100-12-31"
            required
          />

          <div className={style.colorPickerContainer}>
            <h3><Palette size={18} className={style.colorIcon} /> Escolha uma cor:</h3>
            <div className={style.colorOptionsGrid}>
              {colorOptions.map((optColor) => (
                <div
                  key={optColor}
                  className={`${style.colorOption} ${color === optColor ? style.selectedColor : ''}`}
                  style={{ backgroundColor: optColor }}
                  onClick={() => setColor(optColor)}
                  title={`Selecionar cor ${optColor}`}
                />
              ))}
            </div>
          </div>

          <div className={style.actions}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}