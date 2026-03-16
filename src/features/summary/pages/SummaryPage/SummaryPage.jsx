import style from "./SummaryPage.module.css";
import { LinearProgress } from "@mui/material";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import SummaryModal from "../../components/SummaryModal/SummaryModal";
import Header from "../../../../components/Header/Header";
import FilterContainer from "../../../../components/FilterContainer/FilterContainer";
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
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedSubject) {
      setFilteredSummaries(summaries);
    } else {
      setFilteredSummaries(
        summaries.filter((s) => s.subject?.id === parseInt(selectedSubject)),
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
          prev.map((s) => (s.id === updated.id ? updated : s)),
        );
      } else {
        const created = await summaryService.createSummary(
          formData.subjectId,
          formData,
        );
        setSummaries((prev) => [...prev, created]);
      }
      setModalOpen(false);
      setEditingSummary(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await summaryService.deleteSummary(id);
      setSummaries((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={style.summaryPage}>
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
          pageName="Seus Resumos"
          pageDescription="Gerencie e organize seus materiais de estudo."
        />
        <ActionsContainer
          onNewSummary={() => {
            setEditingSummary(null);
            setModalOpen(true);
          }}
        />
      </div>

      <FilterContainer
        subjects={subjects}
        onFilterChange={handleFilterChange}
      />

      <div className={style.summaryContainer}>
        {loading ? null : filteredSummaries.length > 0 ? (
          filteredSummaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              id={summary.id}
              title={summary.title}
              content={summary.content}
              subject={
                subjects.find((s) => s.id === summary.subjectId)?.title ||
                "Sem matéria"
              }
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
        subjectTitle={
          subjects.find((s) => s.id === viewingSummary?.subjectId)?.title ||
          "Sem matéria"
        }
      />
    </div>
  );
}
