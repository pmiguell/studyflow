import style from "./ViewContent.module.css";

export default function ViewContent({ open, onClose, summary }) {
  if (!open || !summary) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>{summary.title}</h2>
        <p>{summary.content}</p>
        <p><strong>Matéria:</strong> {summary.subject?.title}</p>
        <div className={style.actions}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
