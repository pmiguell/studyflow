import React, { useEffect, useState } from "react";
import style from "./TaskModal.module.css";

export default function TaskModal({ open, onClose, onSubmit, task }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    date: "",
    status: "Não iniciado"
  });

  // Preenche o formulário quando task muda (modo edição)
  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        title: "",
        description: "",
        subject: "",
        date: "",
        status: "Não iniciado"
      });
    }
  }, [task]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>{task ? "Editar Tarefa" : "Nova Tarefa"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Matéria</option>
            <option value="IA">IA</option>
            <option value="Cálculo II">Cálculo II</option>
            <option value="TCC I">TCC I</option>
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <div className={style.actions}>
            <button type="submit">{task ? "Salvar Alterações" : "Criar"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
