import { useState } from "react";
import style from "./FilterContainer.module.css";

export default function FilterContainer({ subjects, selectedSubject, onFilterChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (subjectId) => {
    onFilterChange(subjectId);
    setOpen(false);
  };

  return (
    <div className={style.filterContainer}>
      <p>Filtrar por Matéria</p>

      <div className={style.customSelect}>
        <button
          className={style.selectButton}
          onClick={() => setOpen(!open)}
        >
          {subjects?.find(s => s.id === selectedSubject)?.title || "Todas as Matérias"}
        </button>

        <ul className={`${style.optionsList} ${open ? style.open : ""}`}>
          <li onClick={() => handleSelect("")}>Todas as Matérias</li>
          {subjects?.map((subject) => (
            <li key={subject.id} onClick={() => handleSelect(subject.id)}>
              {subject.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}