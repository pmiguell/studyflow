import React, { useEffect, useState } from "react";
import style from "./SubjectModal.module.css";

export default function SubjectModal({ open, onClose, onSubmit, subject }) {
  const [formData, setFormData] = useState({
    title: "",
    progress: "",
    status: "Não iniciado"
  });

  // Preenche o formulário quando materia muda (modo edição)
  useEffect(() => {
    if (subject) {
      setFormData(subject);
    } else {
      setFormData({
        title: "",
        progress: "",
        status: "Não iniciado"
      });
    }
  }, [subject]);

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
        <h2>{subject ? "Editar Matéria" : "Nova Matéria"}</h2>
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
            name="progress"
            placeholder="Progresso"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div className={style.actions}>
            <button type="submit">{subject ? "Salvar Alterações" : "Criar"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
