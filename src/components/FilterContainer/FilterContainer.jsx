import style from "./FilterContainer.module.css";

export default function FilterContainer() {
  return (
    <div className={style.filterContainer}>
      <p>Filtrar por matéria</p>
      <select name="subjects" id="subjects" className={style.selectSubject}>
        <option value="">Selecione</option>
        <option value="">IA</option>
        <option value="">Cálculo II</option>
        <option value="">TCC I</option>
      </select>
    </div>
  );
}
