import Button from '../../../../components/Button/Button';
import { Plus } from 'lucide-react';
import style from './ActionsContainer.module.css';

export default function ActionsContainer({ onNewEvent}) {
  return (
    <div className={style.actionsContainer}>
      <Button onClick={onNewEvent}>
        <Plus size={18} />
        Criar novo evento
      </Button>
    </div>
  );
}
