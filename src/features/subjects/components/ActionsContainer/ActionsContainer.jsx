import Button from '../../../../components/Button/Button';
import { Plus } from 'lucide-react';
import FilterContainer from '../../../../components/FilterContainer/FilterContainer';
import style from './ActionsContainer.module.css';

export default function ActionsContainer({ onNewSubject, subjects, onFilterChange }) {
  return (
    <div className={style.actionsContainer}>
      <FilterContainer subjects={subjects} onFilterChange={onFilterChange} />
      <Button onClick={onNewSubject}>
        <Plus size={18} />
        Nova matéria
      </Button>
    </div>
  );
}
