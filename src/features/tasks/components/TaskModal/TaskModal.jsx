import { useState, useEffect } from "react";
import style from "./TaskModal.module.css";

export default function TaskModal({ open, onClose, onSubmit, task, subjects }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subjectId: "", // 🔹 agora é ID
    deadline: "",
    status: "NAO_INICIADO"
  });

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        subjectId: task.subject.id // 🔹 pegar ID da matéria
      });
    } else {
      setFormData({
        title: "",
        description: "",
        subjectId: "",
        deadline: "",
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

  // Se task existe, é edição
  if (task) {
    if (!task?.id) {
      console.error("Task id undefined");
      return;
    }
    onSubmit({ ...task, ...formData }); // envia task completa para edição
  } else {
    // Se task não existe, é criação
    onSubmit({ ...formData }); // envia apenas formData para criação
  }

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
            required
          >
            <option value="">Selecione a Matéria</option>
            {subjects.map((s) => (
              <option value={s.id}>{s.title}</option>
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
