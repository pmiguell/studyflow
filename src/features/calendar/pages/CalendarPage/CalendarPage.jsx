import { useState } from "react";
import style from "./CalendarPage.module.css";
import ActionsContainer from "../../components/ActionsContainer/ActionsContainer.jsx";
import Header from "../../../../components/Header/Header.jsx";
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid.jsx";
import CalendarModal from "../../components/CalendarModal/CalendarModal.jsx";

export default function CalendarPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const handleNewEvent = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSaveEvent = (newEventData) => {
    setEvents([...events, { ...newEventData, id: Date.now() }]);
    setModalOpen(false); 
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId)); 
  };

  return (
    <div className={style.calendarPage}>
      <div className={style.topBar}>
        <Header
          pageName="Calendário"
          pageDescription="Acompanhe aqui seus eventos e tarefas do mês"
        />
        <ActionsContainer onNewEvent={handleNewEvent} />
      </div>

      <div className={style.calendarContent}>
        <CalendarGrid events={events} onDeleteEvent={handleDeleteEvent} /> 
      </div>

      <CalendarModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveEvent} 
      />
    </div>
  );
}