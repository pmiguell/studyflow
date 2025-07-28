import style from "./FilterContainer.module.css";

export default function FilterContainer() {
  return (
    <div className={style.filterContaier}>
      <p>Filtrar por matéria</p>
      <select name="subjects" id="subjects">
        <option value="">Selecione</option>
      </select>
    </div>
  );
}
