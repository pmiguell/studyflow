import { useState, useEffect } from "react";
import style from "./TaskModal.module.css";

export default function TaskModal({ open, onClose, onSubmit, task, subjects }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subjectId: "", // 🔹 agora é ID
    deadline: "",
    completed: false,
    status: "NAO_INICIADO"
  });

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        subjectId: task.subject?.id || "" // 🔹 pegar ID da matéria com verificação segura
      });
    } else {
      setFormData({
        title: "",
        description: "",
        subjectId: "",
        deadline: "",
        completed: false,
        status: "NAO_INICIADO"
      });
    }
  }, [task]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData };
    if (payload.subjectId === "") {
      payload.subjectId = null;
    }

    // Se task existe, é edição
    if (task) {
      if (!task?.id) {
        console.error("Task id undefined");
        return;
      }
      onSubmit({ ...task, ...payload });
    } else {
      // Se task não existe, é criação
      onSubmit({ ...payload });
    }

    setFormData({
      title: "",
      description: "",
      subjectId: "",
      deadline: "",
      completed: false,
      status: "NAO_INICIADO"
    });

    onClose();
  };


  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>{task ? "Editar Tarefa" : "Nova Tarefa"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição"
            required
          />
          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
          >
            <option value="">Sem matéria (Evento solto)</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
          <div className={style.actions}>
            <button type="submit">{task ? "Salvar" : "Criar"}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
