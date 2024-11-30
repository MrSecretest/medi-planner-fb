import { useEffect, useState } from "react";
import "../../styles/calendar.css";
import CalendarButton from "./calendarButton";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(1);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const changeMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + direction, 1);
      setSelectedDay(1);
      return newDate;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const formattedDate = `${day}/${month + 1}/${year}`;
    localStorage.setItem("currentDate", formattedDate);
    console.log(`Selected date: ${formattedDate}`);
  };

  useEffect(() => {
    const formattedDate = `1/${month + 1}/${year}`;
    localStorage.setItem("currentDate", formattedDate);
    console.log(`Default selected date: ${formattedDate}`);
  }, [currentDate]);

  return (
    <>
      <div className="calendar-box">
        <div className="date-part">
          <CalendarButton onClick={() => changeMonth(-1)}>{"<"}</CalendarButton>
          <div className="dates-container">
            <p>{monthNames[month]}</p>
            <p style={{ fontSize: "large", fontWeight: "300", color: "#C7C7C7" }}>{year}</p>
          </div>
          <CalendarButton onClick={() => changeMonth(1)}>{">"}</CalendarButton>
        </div>
        <div className="cells-part">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            return (
              <div
                onClick={() => handleDayClick(day)}
                key={day}
                className={`cells ${selectedDay === day ? "selected" : ""}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
