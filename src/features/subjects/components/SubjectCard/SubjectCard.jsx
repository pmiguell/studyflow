import { useNavigate } from "react-router-dom";
import style from "./SubjectCard.module.css";
import { LinearProgress, Box } from "@mui/material";
import { BookMarked, ArrowRight } from "lucide-react";
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
    <div className={style.subjectCard} style={{ backgroundColor: `${color || '#a26dff'}0A`, border: `1px solid ${color || '#a26dff'}30` }}>

      <div className={style.subjectCardTop}>
        <div className={style.subjectCardHeader} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: `${color || '#a26dff'}20`, color: color || '#a26dff', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookMarked size={24} />
          </div>
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
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: `${color || '#a26dff'}30`,
              "& .MuiLinearProgress-bar": {
                backgroundColor: color || '#a26dff',
              },
            }}
          />
          <p className={style.percentText}>
            {Math.round(progress)}% completo
          </p>
        </Box>
      </div>

      <div className={style.viewTasks} onClick={handleViewTasks}>
        Ver tarefas <ArrowRight size={16} />
      </div>
    </div>
  );
}
