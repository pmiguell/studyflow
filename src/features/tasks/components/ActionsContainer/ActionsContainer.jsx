import Button from '../../../../components/Button/Button';
import { Plus } from 'lucide-react';
import FilterContainer from '../../../../components/FilterContainer/FilterContainer';
import style from './ActionsContainer.module.css';

export default function ActionsContainer({ onNewTask, subjects, onFilterChange, selectedSubject }) {
  return (
    <div className={style.actionsContainer}>
      <FilterContainer
        subjects={subjects}
        selectedSubject={selectedSubject} // novo prop
        onFilterChange={onFilterChange}
      />
      <Button onClick={onNewTask}>
        <Plus size={18} />
        Nova tarefa
      </Button>
    </div>
  );
}
