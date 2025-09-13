import style from "./SummaryPage.module.css";
import ActionsContainer from "../../../tasks/components/ActionsContainer/ActionsContainer";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import { useEffect, useState } from "react";
import * as summaryService from "../../services/summaryService";

export default function SummaryPage({ subjectId }) {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummaries() {
      try {
        const data = await summaryService.getSummaries(subjectId);
        setSummaries(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar resumos");
      } finally {
        setLoading(false);
      }
    }
    loadSummaries();
  }, [subjectId]);

  const handleDelete = async (id) => {
    try {
      await summaryService.deleteSummary(subjectId, id);
      setSummaries(summaries.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar resumo");
    }
  };

  // Aqui você pode depois abrir um modal para criar/editar resumos (igual às tarefas)

  return (
    <div className={style.summaryPage}>
      <ActionsContainer
        onNewSummary={() => {
          alert("Abrir modal de novo resumo"); // placeholder
        }}
      />

      <div className={style.summaryContainer}>
        {loading ? (
          <p>Carregando resumos...</p>
        ) : summaries.length > 0 ? (
          summaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              title={summary.title}
              subject={summary.subjectName}
              onDelete={() => handleDelete(summary.id)}
            />
          ))
        ) : (
          <p>Nenhum resumo encontrado</p>
        )}
      </div>
    </div>
  );
}
