import style from './TasksPage.module.css';
import Button from '../../../../components/Button/Button';
import { Plus } from 'lucide-react';

export default function TasksPage() {
  return (
    <div className={style.tasksPage}>
        <div className={style.actionsContainer}>
          <FilterContainer />
          <Button>
            <Plus size={18} />
            Nova tarefa
          </Button>
        </div>
    </div>
  );
}