import style from "./FilterContainer.module.css";

export default function FilterContainer({ subjects, selectedSubject, onFilterChange }) {
  return (
    <div className={style.filterContainer}>
      <p>Filtrar por matéria</p>
      <select
        value={selectedSubject || ""}
        onChange={(e) => onFilterChange(e.target.value)}
        className={style.selectSubject}
      >
        <option value="">Todas</option>
        {Array.isArray(subjects) &&
          subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.title}
            </option>
          ))}
      </select>
    </div>
  );
}
