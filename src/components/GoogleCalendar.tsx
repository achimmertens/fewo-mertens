
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import AvailabilityCalendar from "./AvailabilityCalendar";

const GoogleCalendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCalculatorPage = location.pathname === "/calculator";
  const { t } = useLanguage();

  const handleCalendarClick = () => {
    localStorage.setItem("openDateSelector", "true");
    if (!isCalculatorPage) {
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
            {t('calendar.checkAndBook')}
          </div>
        </div>
      )}
      <AvailabilityCalendar />
    </div>
  );
};

export default GoogleCalendar;
