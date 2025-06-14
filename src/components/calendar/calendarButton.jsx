import { useEffect } from "react"
import { useState } from "react";
import "../../styles/calendar.css"
export default function CalendarButton({children, type, onClick }) {
    const [ButtonClass, setButtonClass] = useState('');
    useEffect(() =>{
        if (type == 'primary')
        {
            setButtonClass('calendar-button-primary')
        }
        else if (type=='secondary')
        {
            setButtonClass('calendar-button-secondary')
        }
        else{
            setButtonClass('calendar-button-red')
        }
        })
        return (
            <button 
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    onClick && onClick(e);
                }} 
                className={`calendar-button ${ButtonClass}`}
            >
                {children}
            </button>
        );
        
}
