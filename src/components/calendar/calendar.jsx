import { useEffect, useState } from "react";
import "../../styles/calendar.css"
import CalendarButton from "./calendarButton";
export default function Calendar()
{
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(1);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const getDaysInMonth = (year, month) =>
    {
        return new Date(year, month+1, 0).getDate()
    }
    
    const changeMonth = (direction) => 
    {
        setCurrentDate(prev =>{
            const newDate = new Date(prev.getFullYear(), prev.getMonth() + direction, 1);
            setSelectedDay(1);
            return newDate;
        })
    }
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0 = January
    const daysInMonth = getDaysInMonth(year, month);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        localStorage.setItem("currentDate", [day, month+1, year]);
        console.log(`Selected date: ${day} ${monthNames[month+1]} ${year}`);
        };
    
    useEffect((day)=>{
        localStorage.setItem("currentDate", [1, month+1, year]);
        console.log(`Selected date: ${1} ${monthNames[month+1]} ${year}`);
    }, [Calendar])
    
    return(
        <>
            <div className="calendar-box">
                <div className="date-part">
                    <CalendarButton onClick = {() => changeMonth(-1)}> 
                        {"<"}
                         </CalendarButton>
                    <div className="dates-container">
                        <p>{monthNames[month]}</p>
                        <p style={{fontSize:"large", fontWeight:"300", color:"#C7C7C7"}}>{year}</p>
                    </div>
                    <CalendarButton onClick = {() => changeMonth(1)}>
                    {">"}
                    </CalendarButton>
                </div>
                <div className="cells-part">
                    {[...Array(daysInMonth).keys()].map(day=>(
                            <div onClick={() => handleDayClick(day+1)} key={day} className={`cells ${selectedDay === day+1 ? "selected" : ""}`}>{day + 1}</div>                    
                            ))}
                </div>
            </div>

        </>
    );
}