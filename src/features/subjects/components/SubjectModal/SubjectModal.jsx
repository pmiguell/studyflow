import React, { useEffect, useState } from "react";
import style from "./SubjectModal.module.css";

export default function SubjectModal({ open, onClose, onSubmit, subject }) {
  const [formData, setFormData] = useState({
    title: "",
    color: "#a26dff",
  });

  // Preenche o formulário quando materia muda (modo edição)
  useEffect(() => {
    if (subject) {
      setFormData(subject);
    } else {
      setFormData({
        title: "",
        color: "#a26dff" // cor padrão
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
        </form>
        <div className={style.actions}>
          <button onClick={handleSubmit}>
            {subject ? "Salvar Alterações" : "Criar Matéria"}
          </button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
