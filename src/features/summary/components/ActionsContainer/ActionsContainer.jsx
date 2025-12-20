import Button from '../../../../components/Button/Button';
import { Plus } from 'lucide-react';
import style from './ActionsContainer.module.css';

export default function ActionsContainer({ onNewSummary}) {
  return (
    <div className={style.actionsContainer}>
      <Button onClick={onNewSummary}>
        <Plus size={18} />
        Criar novo resumo
      </Button>
    </div>
  );
}
