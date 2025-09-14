import style from "./SummaryPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import SummaryModal from "../../components/SummaryModal/SummaryModal";
import { useEffect, useState } from "react";
import * as summaryService from "../../services/summaryService";
import ViewContent from "../../components/ViewContent";
import { getSubjects } from "../../../subjects/services/subjectsService";

export default function SummaryPage() {
  const [summaries, setSummaries] = useState([]);
  const [filteredSummaries, setFilteredSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSummary, setEditingSummary] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [viewingSummary, setViewingSummary] = useState(null);

  // 🔹 carregar resumos e matérias
  useEffect(() => {
    async function loadData() {
      try {
        const [summaryData, subjectData] = await Promise.all([
          summaryService.getSummaries(),
          getSubjects(),
        ]);
        setSummaries(summaryData);
        setSubjects(subjectData || []);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 🔹 aplicar filtro sempre que summaries ou selectedSubject mudarem
  useEffect(() => {
    if (!selectedSubject) {
      setFilteredSummaries(summaries);
    } else {
      setFilteredSummaries(
        summaries.filter((s) => s.subject?.id === parseInt(selectedSubject))
      );
    }
  }, [summaries, selectedSubject]);

  const handleFilterChange = (subjectId) => {
    setSelectedSubject(subjectId);
  };

  const handleSubmitSummary = async (formData) => {
    try {
      if (editingSummary) {
        const updated = await summaryService.editSummary({
          ...editingSummary,
          ...formData,
        });
        setSummaries((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
      } else {
        const created = await summaryService.createSummary(
          formData.subjectId,
          formData
        );
        setSummaries((prev) => [...prev, created]);
      }
      setModalOpen(false);
      setEditingSummary(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar resumo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await summaryService.deleteSummary(id);
      setSummaries((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar resumo");
    }
  };

  return (
    <div className={style.summaryPage}>
      <ActionsContainer
        subjects={subjects}
        onFilterChange={handleFilterChange}
        onNewSummary={() => {
          setEditingSummary(null);
          setModalOpen(true);
        }}
      />

      <div className={style.summaryContainer}>
        {loading ? (
          <p>Carregando resumos...</p>
        ) : filteredSummaries.length > 0 ? (
          filteredSummaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              id={summary.id}
              title={summary.title}
              content={summary.content}
              subject={summary.subject?.title}
              onEdit={() => {
                setEditingSummary(summary);
                setModalOpen(true);
              }}
              onDelete={() => handleDelete(summary.id)}
              onView={() => setViewingSummary(summary)} // 🔹 aqui
            />
          ))
        ) : (
          <p>Nenhum resumo encontrado</p>
        )}
      </div>

      <SummaryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitSummary}
        summary={editingSummary}
        subjects={subjects}
      />

      {/* ... no return */}
      <ViewContent
        open={!!viewingSummary}
        onClose={() => setViewingSummary(null)}
        summary={viewingSummary}
      />
    </div>
  );
}
