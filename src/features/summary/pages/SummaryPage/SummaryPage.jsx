import style from "./SummaryPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import SummaryModal from "../../components/SummaryModal/SummaryModal";
import { useEffect, useState } from "react";
import * as summaryService from "../../services/summaryService";
import { getSubjects } from "../../../subjects/services/subjectsService"; // ajuste o caminho

export default function SummaryPage({ subjectId }) {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 controle do modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSummary, setEditingSummary] = useState(null);

  // 🔹 lista de matérias
  const [subjects, setSubjects] = useState([]);

  // 🔹 carregar resumos e matérias
  useEffect(() => {
    async function loadData() {
      try {
        const [summaryData, subjectData] = await Promise.all([
          summaryService.getSummaries(subjectId),
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
  }, [subjectId]);

  // Criar ou editar resumo
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

  // Deletar resumo
  const handleDelete = async (id) => {
    try {
      await summaryService.deleteSummary(id); // 🔹 só precisa do id
      setSummaries((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar resumo");
    }
  };

  return (
    <div className={style.summaryPage}>
      <ActionsContainer
        onNewSummary={() => {
          setEditingSummary(null);
          setModalOpen(true);
        }}
      />

      <div className={style.summaryContainer}>
        {loading ? (
          <p>Carregando resumos...</p>
        ) : summaries.length > 0 ? (
          summaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              id={summary.id}
              title={summary.title}
              subject={summary.subject?.title}
              onEdit={() => {
                setEditingSummary(summary);
                setModalOpen(true);
              }}
              onDelete={() => handleDelete(summary.id)}
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
        subjects={subjects} // 🔹 aqui passa todas as matérias
      />
    </div>
  );
}
