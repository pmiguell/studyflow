import style from "./SubjectsPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import SubjectCard from "../../components/SubjectCard/SubjectCard.jsx";
import { useState, useEffect } from "react";
import SubjectModal from "../../components/SubjectModal/SubjectModal.jsx";
import * as subjectService from "../../services/subjectsService";

export default function SubjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await subjectService.getSubjects();
        setSubjects(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar matérias");
      } finally {
        setLoading(false);
      }
    }
    loadSubjects();
  }, []);

  const handleEditSubject = (id) => {
    const subject = subjects.find((s) => s.id === id);
    setEditingSubject(subject);
    setModalOpen(true);
  };

  const handleSubmit = async (subjectData) => {
    try {
      let updatedSubject;
      if (subjectData.id) {
        updatedSubject = await subjectService.editSubject(subjectData);
        setSubjects(subjects.map((s) => (s.id === updatedSubject.id ? updatedSubject : s)));
      } else {
        updatedSubject = await subjectService.createSubject(subjectData);
        setSubjects([...subjects, updatedSubject]);
      }
      setModalOpen(false);
      setEditingSubject(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar matéria");
    }
  };

  const handleDelete = async (id) => {
    try {
      await subjectService.deleteSubject(id);
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar matéria");
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
        onSubmit={handleSubmit}
      />

      <div className={style.subjectsContainer}>
        {loading ? (
          <p>Carregando matérias...</p>
        ) : subjects.length > 0 ? (
          subjects.map((subject) => {
            const progressPercent =
              subject.total > 0 ? (subject.completed / subject.total) * 100 : 0;
            const progressText = `${subject.completed} de ${subject.total} tarefas completadas`;

            return (
              <SubjectCard
                key={subject.id}
                id={subject.id}
                title={subject.name}
                progress={progressPercent}
                progressText={progressText}
                onEditSubject={handleEditSubject}
                onDeleteSubject={() => handleDelete(subject.id)}
              />
            );
          })
        ) : (
          <p>Nenhuma matéria cadastrada</p>
        )}
      </div>
    </div>
  );
}
