import style from "./FilterContainer.module.css";

export default function FilterContainer({ subjects, onFilterChange }) {
  return (
    <div className={style.filterContainer}>
      <p>Filtrar por matéria</p>
      <select
        name="subjects"
        id="subjects"
        className={style.selectSubject}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="">Todas</option>
        {Array.isArray(subjects) && subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.title}
          </option>
        ))}
      </select>
    </div>
  );
}
