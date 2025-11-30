import Button from '../../../../components/Button/Button';
import { Plus } from 'lucide-react';
import style from './ActionsContainer.module.css';

export default function ActionsContainer({ onNewTask}) {
  return (
    <div className={style.actionsContainer}>
      <Button onClick={onNewTask}>
        <Plus size={18} />
        Criar nova tarefa
      </Button>
    </div>
  );
}
