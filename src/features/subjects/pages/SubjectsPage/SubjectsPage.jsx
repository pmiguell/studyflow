import style from "./SubjectsPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import SubjectCard from "../../components/SubjectCard/SubjectCard.jsx";
import { useState, useEffect } from "react";
import SubjectModal from "../../components/SubjectModal/SubjectModal.jsx";
import {
  getSubjects,
  createSubject,
  editSubject,
  deleteSubject,
} from "../../services/subjectsService.js";

export default function SubjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);

  // 🔹 Carregar matérias da API
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error("Erro ao carregar matérias:", error);
    }
  };

  const handleEditSubject = (id) => {
    const subject = subjects.find((t) => t.id === id);
    setEditingSubject(subject);
    setModalOpen(true);
  };

const handleSubmitSubject = async (formData) => {
  try {
    if (editingSubject) {
      // atualiza o título localmente
      setSubjects(subjects.map(s =>
        s.id === editingSubject.id ? { ...s, ...formData } : s
      ));
      await editSubject({ id: editingSubject.id, ...formData });
    } else {
      const newSubject = await createSubject(formData);
      setSubjects([...subjects, newSubject]);
    }
  } catch (error) {
    console.error("Erro ao salvar matéria:", error);
  }
};





  const handleDeleteSubject = async (id) => {
    try {
      await deleteSubject(id);
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Erro ao deletar matéria:", error);
    }
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
        onSubmit={handleSubmitSubject}
      />

      <div className={style.subjectsContainer}>
        {subjects.map((subject) => {
          const completed = (subject.tasks || []).filter(
            (t) => t.completed
          ).length;
          const total = (subject.tasks || []).length;
          const progressPercent = total > 0 ? (completed / total) * 100 : 0;
          const progressText = `${completed} de ${total} tarefas completadas`;

          return (
            <SubjectCard
              key={subject.id}
              id={subject.id}
              title={subject.title}
              progress={progressPercent}
              progressText={progressText}
              onEditSubject={handleEditSubject}
              onDeleteSubject={handleDeleteSubject}
            />
          );
        })}
      </div>
    </div>
  );
}
