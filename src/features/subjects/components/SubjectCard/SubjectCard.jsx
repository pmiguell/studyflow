import style from "./SubjectCard.module.css";
import { LinearProgress, Box } from "@mui/material";
import SubjectDropdown from "../SubjectDropdown/SubjectDropdown.jsx";

export default function SubjectCard({
  id,
  title,
  progress,
  progressText,
  onEditSubject,
  onDeleteSubject
}) {
  return (
    <div className={style.subjectCard}>
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
      <p>Ver tarefas</p>
    </div>
  );
}