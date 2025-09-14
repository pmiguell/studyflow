import { useState, useEffect } from "react";
import style from "./TaskStatusModal.module.css";

export default function TaskStatusModal({ task, onClose, onSubmit }) {
  const [status, setStatus] = useState(task?.status || "NAO_INICIADO");

  useEffect(() => {
    if (task) setStatus(task.status);
  }, [task]);

  const handleChange = (e) => setStatus(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...task, status });
    onClose();
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>Editar status</h2>
        <form onSubmit={handleSubmit}>
          <select value={status} onChange={handleChange} required>
            <option value="NAO_INICIADO">Não iniciado</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDO">Concluído</option>
          </select>
          <div className={style.actions}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
