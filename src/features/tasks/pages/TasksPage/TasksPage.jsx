import style from "./TasksPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";

export default function TasksPage() {
  return (
    <div className={style.tasksPage}>
      <ActionsContainer />
      <div className={style.tasksContainer}>
        <TaskCard
          title={"Estudar Serie de Fourrier"}
          description={"lorem impsum dolor sit amet."}
          subject={"Cálculo I"}
          status={"Concluída"}
          date={"08/04/2025"}
        />
        <TaskCard
          title={"Estudar Serie de Fourrier"}
          description={"lorem impsum dolor sit amet."}
          subject={"Cálculo I"}
          status={"Concluída"}
          date={"08/04/2025"}
        />
        <TaskCard
          title={"Estudar Serie de Fourrier"}
          description={"lorem impsum dolor sit amet."}
          subject={"Cálculo I"}
          status={"Concluída"}
          date={"08/04/2025"}
        />
      </div>
    </div>
  );
}
