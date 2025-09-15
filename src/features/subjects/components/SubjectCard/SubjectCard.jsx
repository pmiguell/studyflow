import { useNavigate } from "react-router-dom";
import style from "./SubjectCard.module.css";
import { LinearProgress, Box } from "@mui/material";
import SubjectDropdown from "../SubjectDropdown/SubjectDropdown.jsx";

export default function SubjectCard({
  id,
  title,
  color,
  progress,
  progressText,
  onEditSubject,
  onDeleteSubject
}) {
  const navigate = useNavigate();

  const handleViewTasks = () => {
    navigate("/tarefas", { state: { subject: { id, name: title } } });
  };

  return (
    <div className={style.subjectCard}>
      <div className={style.colorLine} style={{ backgroundColor: color }} />

      <div className={style.subjectCardTop}>
        <div className={style.subjectCardHeader}>
          <h1 className={style.subjectCardTitle}>{title}</h1>
        </div>

        <SubjectDropdown
          onEdit={() => onEditSubject(id)}
          onDelete={() => onDeleteSubject(id)}
        />
      </div>

      <div className={style.subjectCardMiddle}>
        <p className={style.subjectCardProgress}>{progressText}</p>
      </div>

      <div className={style.subjectCardBottom}>
        <Box className={style.progressBarContainer}>
          <LinearProgress
            variant="determinate"
            value={progress}
            classes={{
              root: style.progressBarRoot,
              bar: style.progressBarBar
            }}
          />
          <p className={style.percentText}>
            {Math.round(progress)}% completo
          </p>
        </Box>
      </div>

      <p className={style.viewTasks} onClick={handleViewTasks}>
        Ver tarefas
      </p>
    </div>
  );
}
