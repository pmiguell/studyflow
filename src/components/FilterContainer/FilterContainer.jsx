import style from "./FilterContainer.module.css";

export default function FilterContainer({ subjects, selectedSubject, onFilterChange }) {
  return (
    <div className={style.filterContainer}>
      <p>Filtrar por matéria</p>
      <select
        name="subjects"
        id="subjects"
        className={style.selectSubject}
        value={selectedSubject ? selectedSubject.id : ""} // mostra a matéria selecionada
        onChange={(e) => {
          const subject = subjects.find(s => s.id === parseInt(e.target.value));
          onFilterChange(subject || null);
        }}
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
