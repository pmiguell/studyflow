import style from "./ViewContent.module.css";

export default function ViewContent({ open, onClose, summary, subjectTitle }) {
  if (!open || !summary) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>{summary.title}</h2>
        <p>{summary.content}</p>
        <p><strong>Matéria:</strong> {subjectTitle}</p>
        <div className={style.actions}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
