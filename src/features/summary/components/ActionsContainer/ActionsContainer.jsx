import Button from '../../../../components/Button/Button';
import { Plus } from 'lucide-react';
import FilterContainer from '../../../../components/FilterContainer/FilterContainer';
import style from './ActionsContainer.module.css';

export default function ActionsContainer({ onNewSummary, subjects, onFilterChange }) {
  return (
    <div className={style.actionsContainer}>
      <FilterContainer subjects={subjects} onFilterChange={onFilterChange} />
      <Button onClick={onNewSummary}>
        <Plus size={18} />
        Novo resumo
      </Button>
    </div>
  );
}
