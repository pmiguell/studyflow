import style from "./SubjectsPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import SubjectCard from "../../components/SubjectCard/SubjectCard.jsx";
import { useState } from "react";
import SubjectModal from "../../components/SubjectModal/SubjectModal.jsx";

export default function SubjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      title: "IA",
      completed: 2,
      total: 5,
    },
    {
      id: 2,
      title: "Cálculo II",
      completed: 5,
      total: 5,
    },
    {
      id: 3,
      title: "TCC I",
      completed: 3,
      total: 5,
    },
  ]);

  const handleEditSubject = (id) => {
    const subject = subjects.find((t) => t.id === id);
    setEditingSubject(subject);
    setModalOpen(true);
  };

  return (
    <div className={style.subjectsPage}>
      <ActionsContainer
        onNewSubject={() => {
          setEditingSubject(null);
          setModalOpen(true);
        }}
      />
      <SubjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        subject={editingSubject}
      />

      <div className={style.subjectsContainer}>
        {subjects.map((subject) => {
          const progressPercent = (subject.completed / subject.total) * 100;
          const progressText = `${subject.completed} de ${subject.total} tarefas completadas`;

          return (
            <SubjectCard
              key={subject.id}
              id={subject.id}
              title={subject.title}
              progress={progressPercent}
              progressText={progressText}
              onEditSubject={handleEditSubject}
            />
          );
        })}
      </div>
    </div>
  );
}
