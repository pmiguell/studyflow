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
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  // 🔹 Carregar matérias da API
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      const arrayData = Array.isArray(data) ? data : [];
      setSubjects(arrayData);
      setFilteredSubjects(arrayData);
    } catch (error) {
      console.error("Erro ao carregar matérias:", error);
      setSubjects([]);
      setFilteredSubjects([]);
    }
  };

  // 🔹 Atualiza filteredSubjects sempre que subjects ou filtro mudam
  useEffect(() => {
    if (!selectedFilter) {
      setFilteredSubjects(subjects); // Todas
    } else {
      const filterId = Number(selectedFilter);
      const filtered = subjects.filter((s) => s.id === filterId);
      setFilteredSubjects(filtered);
    }
  }, [subjects, selectedFilter]);

  const handleFilterChange = (subjectId) => {
    setSelectedFilter(subjectId); // string ou ""
  };

  const handleEditSubject = (id) => {
    const subject = subjects.find((t) => t.id === id);
    setEditingSubject(subject || null);
    setModalOpen(true);
  };

  const handleSubmitSubject = async (formData) => {
    try {
      if (editingSubject) {
        setSubjects(
          subjects.map((s) =>
            s.id === editingSubject.id ? { ...s, ...formData } : s
          )
        );
        await editSubject({ id: editingSubject.id, ...formData });
      } else {
        const newSubject = await createSubject(formData);
        setSubjects([...subjects, newSubject]);
      }
      setModalOpen(false);
      setEditingSubject(null);
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
        subjects={subjects}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        onNewSubject={() => {
          setEditingSubject(null);
          setSelectedFilter("");
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
        {Array.isArray(filteredSubjects) &&
          filteredSubjects.map((subject) => {
            const tasksArray = Array.isArray(subject.tasks) ? subject.tasks : [];
            const completed = tasksArray.filter((t) => t.status === "CONCLUIDO").length;
            const total = tasksArray.length;
            const progressPercent = total > 0 ? (completed / total) * 100 : 0;
            const progressText = `${completed} de ${total} tarefas concluídas`;

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
