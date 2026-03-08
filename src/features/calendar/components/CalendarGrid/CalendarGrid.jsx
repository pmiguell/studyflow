import { useState, useEffect } from "react";
import style from "./CalendarGrid.module.css";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarGrid({ events = [], onDeleteEvent }) { 
  const [holidays, setHolidays] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthString = currentDate.toLocaleString('pt-BR', { month: 'long' });
  const formattedMonthYear = `${monthString.charAt(0).toUpperCase() + monthString.slice(1)} de ${year}`;

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
        if (!response.ok) throw new Error("Erro ao buscar feriados");
        
        const data = await response.json();
        const holidaysMap = {};
        data.forEach(feriado => {
          holidaysMap[feriado.date] = feriado.name;
        });
        setHolidays(holidaysMap);
      } catch (error) {
        console.error("Falha ao carregar os feriados:", error);
      }
    };

    fetchHolidays();
  }, [year]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const totalCells = Math.ceil(days.length / 7) * 7;
  const remainingCells = totalCells - days.length;
  for (let i = 0; i < remainingCells; i++) {
    days.push(null);
  }

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className={style.calendarWrapper}>
      <div className={style.monthHeader}>
        <div className={style.monthNavigation}>
          <button onClick={handlePrevMonth} className={style.navButton} title="Mês anterior">
            <ChevronLeft size={24} />
          </button>
          <h2>{formattedMonthYear}</h2>
          <button onClick={handleNextMonth} className={style.navButton} title="Próximo mês">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className={style.gridContainer}>
        <div className={style.headerRow}>
          {weekDays.map((day) => (
            <div key={day} className={style.headerCell}>
              {day}
            </div>
          ))}
        </div>

        <div className={style.daysGrid}>
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className={`${style.dayCell} ${style.emptyCell}`} />;
            }

            const currentDayFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isHoliday = !!holidays[currentDayFormatted];
            const holidayName = holidays[currentDayFormatted];
            const dayEvents = events.filter((ev) => ev.date === currentDayFormatted);

            return (
              <div key={index} className={style.dayCell}>
                <div 
                  className={`${style.dayNumberWrapper} ${isHoliday ? style.holidayCell : ''}`}
                  title={holidayName ? `Feriado Nacional: ${holidayName}` : ''}
                  style={isHoliday ? { cursor: 'help' } : {}}
                >
                  <span className={`${style.dayNumber} ${isHoliday ? style.holidayDayNumber : ''}`}>
                    {day}
                  </span>
                </div>

                <div className={style.eventsContainer}>
                  {dayEvents.map((ev) => (
                    <div 
                      key={ev.id} 
                      className={style.eventCard} 
                      style={{ backgroundColor: ev.color }} 
                      title={ev.title}
                    >
                      <span className={style.eventTitle}>{ev.title}</span> 
                      
                      <button 
                        className={style.deleteButton} 
                        onClick={() => onDeleteEvent(ev.id)}
                        title="Excluir evento"
                      >
                        <Trash2 size={14} className={style.trashIcon} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}