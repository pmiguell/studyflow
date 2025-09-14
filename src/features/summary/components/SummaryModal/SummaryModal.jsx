import { useState, useEffect } from "react";
import style from "./SummaryModal.module.css";

export default function SummaryModal({
  open,
  onClose,
  onSubmit,
  summary,
  subjects,
}) {
  const [formData, setFormData] = useState({
    title: "",
    subjectId: "",
    content: "",
  });

  // Preenche o form quando for editar
  useEffect(() => {
    if (summary) {
      setFormData({
        title: summary.title || "",
        subjectId: summary.subjectId || "",
        content: summary.content || "",
      });
    } else {
      setFormData({ title: "", subjectId: "", content: "" });
    }
  }, [summary]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>{summary ? "Editar resumo" : "Novo resumo"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Escreva aqui seu resumo"
            cols={20}
            rows={16}
            required
          />
          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Matéria</option>
            {Array.isArray(subjects) &&
              subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
          </select>

          <div className={style.actions}>
            <button type="submit">{summary ? "Salvar" : "Criar"}</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
