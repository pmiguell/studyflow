import style from "./SummaryCard.module.css";
import { Book } from "lucide-react";
import SummaryDropdown from "../SummaryDropdown/SummaryDropdown"

export default function SummaryCard({ id, title, subject, onEdit, onDelete }) {
  return (
    <div className={style.summaryCard}>
      <div className={style.summaryCardTop}>
        <div className={style.summaryCardHeader}>
          <p className={style.summaryCardTitle}>{title}</p>
          <SummaryDropdown
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
        <p className={style.summaryCardView}>Ver resumo</p>
      </div>

      <div className={style.summaryCardBottom}>
        <span className={style.summarySubject}>
          <Book className={style.bookIcon} />
          {subject}
        </span>
      </div>
    </div>
  );
}
