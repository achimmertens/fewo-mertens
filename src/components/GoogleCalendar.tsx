
const GoogleCalendar = () => {
  return (
    <div className="calendar-container">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=6gk8bbmgm01bk625432gb33tk0%40group.calendar.google.com&ctz=Europe%2FBerlin&mode=MONTH&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTitle=0"
        title="Verfügbarkeitskalender Ferienwohnung Waldoase Mertens in Einruhr"
        style={{ border: 0 }}
        width="100%"
        height="400"
        frameBorder="0"
        scrolling="no"
      ></iframe>
      <div className="mt-4 text-sm text-gray-600">
        <p>Belegungen im April:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>13. April - 14. April: Wannes</li>
          <li>18. April - 19. April: Magdalena</li>
          <li>24. April - 26. April: Antje</li>
        </ul>
      </div>
    </div>
  );
};

export default GoogleCalendar;
