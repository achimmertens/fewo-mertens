
import { useNavigate, useLocation } from "react-router-dom";

const GoogleCalendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCalculatorPage = location.pathname === "/calculator";

  const handleCalendarClick = () => {
    // Speichern der Information, dass der Kalender geklickt wurde, im localStorage
    localStorage.setItem("openDateSelector", "true");
    
    // Wenn wir bereits auf der Preisrechnerseite sind, dann nicht navigieren
    if (!isCalculatorPage) {
      // Navigieren zur Preisrechnerseite
      navigate("/calculator");
    }
  };

  return (
    <div 
      className="calendar-container cursor-pointer relative group" 
      onClick={handleCalendarClick}
    >
      {!isCalculatorPage && (
        <div className="absolute inset-0 bg-forest-700/0 group-hover:bg-forest-700/10 transition-all duration-200 flex items-center justify-center z-10">
          <div className="bg-white/0 group-hover:bg-white/80 text-transparent group-hover:text-forest-700 px-4 py-2 rounded transition-all duration-200">
            Verfügbarkeit prüfen und buchen
          </div>
        </div>
      )}
      <iframe
        src="https://calendar.google.com/calendar/embed?src=6gk8bbmgm01bk625432gb33tk0%40group.calendar.google.com&ctz=Europe%2FBerlin&mode=MONTH&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTitle=0"
        title="Verfügbarkeitskalender Ferienwohnung Waldoase Mertens in Einruhr"
        style={{ border: 0 }}
        width="100%"
        height="400"
        frameBorder="0"
        scrolling="no"
        className={!isCalculatorPage ? "pointer-events-none" : ""} // Nur auf anderen Seiten non-interactive
      ></iframe>
    </div>
  );
};

export default GoogleCalendar;
