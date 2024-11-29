export default function CalendarButton({children, onClick }) {
    return (
        <button onClick={onClick} className="calendar-button">
            {children}
        </button>
    );
}
