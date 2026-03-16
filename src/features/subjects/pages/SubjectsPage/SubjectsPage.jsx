import style from "./SubjectsPage.module.css";
import { LinearProgress } from "@mui/material";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import FilterContainer from "../../../../components/FilterContainer/FilterContainer";
import Header from "../../../../components/Header/Header";
import SubjectCard from "../../components/SubjectCard/SubjectCard.jsx";
import { useState, useEffect } from "react";
import SubjectModal from "../../components/SubjectModal/SubjectModal.jsx";
import {
  getSubjects,
  createSubject,
  editSubject,
  deleteSubject,
} from "../../services/subjectsService.js";
import { getTasks } from "../../../tasks/services/taskService.js"

export default function SubjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // 🔹 Carregar matérias da API
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const [subjectData, tasksData] = await Promise.all([
        getSubjects(),
        getTasks(),
      ]);
      const arrayData = Array.isArray(subjectData) ? subjectData : [];
      setSubjects(arrayData);
      setFilteredSubjects(arrayData);
      setTasks(Array.isArray(tasksData) ? tasksData : []);
    } catch (error) {
      console.error("Erro ao carregar matérias:", error);
      setSubjects([]);
      setFilteredSubjects([]);
    } finally {
      setLoading(false);
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
            s.id === editingSubject.id ? { ...s, ...formData } : s,
          ),
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
      {loading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: 4,
            backgroundColor: "#a26dff30",
            "& .MuiLinearProgress-bar": { backgroundColor: "#a26dff" },
          }}
        />
      )}
      <div className={style.topBar}>
        <Header
          pageName="Suas Matérias"
          pageDescription="Gerencie e organize seus materiais de estudo."
        />
        <ActionsContainer
          onNewSubject={() => {
            setEditingSubject(null);
            setSelectedFilter("");
            setModalOpen(true);
          }}
        />
      </div>

      <FilterContainer
        subjects={subjects}
        selectedSubject={selectedFilter}
        onFilterChange={handleFilterChange}
      />

      <SubjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        subject={editingSubject}
        onSubmit={handleSubmitSubject}
      />

      <div className={style.subjectsContainer}>
        {loading ? null : filteredSubjects.length === 0 ? (
          <p>Nenhuma matéria encontrada</p>
        ) : (
          filteredSubjects.map((subject) => {
            const tasksArray = tasks.filter((t) => t.subjectId === subject.id);
            const completed = tasksArray.filter(
              (t) => t.status === "CONCLUIDO",
            ).length;
            const total = tasksArray.length;

            const progressPercent = total > 0 ? (completed / total) * 100 : 0;
            const progressText = `${completed} de ${total} tarefas concluídas`;

            return (
              <SubjectCard
                key={subject.id}
                id={subject.id}
                title={subject.title}
                color={subject.color}
                progress={progressPercent}
                progressText={progressText}
                onEditSubject={handleEditSubject}
                onDeleteSubject={handleDeleteSubject}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
