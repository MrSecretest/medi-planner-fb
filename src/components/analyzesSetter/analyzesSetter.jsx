import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import Analyze from "../../components/analyze/analyze";
import "../../styles/analyzes.css";
import { db, ref, set, get , remove} from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import CalendarButton from "../calendar/calendarButton.jsx";
import SyncIcon from '@mui/icons-material/Sync';
export default function Analyzes() {
  const [note, setNote] = useState("");
  const [dropdownValue, setDropdownValue] = useState("option1");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const [notesList, setNotesList] = useState([]);


  const deleteAnalyze = async (analyzeId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("You must be logged in to delete a note!");
      return;
    }
    try {
      const analyzeRef = ref(db, `users/${userId}/notes/${analyzeId}`);
      await remove(analyzeRef);

      setNotesList((prevNotes) => prevNotes.filter((note) => note.id !== analyzeId));
      
    } catch (error) {
      console.error("Error deleting analyze: ", error);
      alert("Failed to delete analyze. Please try again.");
    }
  };

  
  const displayAnalyzes = async () => {
    const userId = localStorage.getItem("userId");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    try {
      const userNotesRef = ref(db, `users/${userId}/notes`);
      const snapshot = await get(userNotesRef);
  
      if (snapshot.exists()) {
        const notes = snapshot.val();
        console.log("Fetched notes:", notes);
  
        const notesArray = Object.entries(notes).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setNotesList(notesArray);
        return notesArray;
      } else {
        console.log("No notes found for this user.");
        return [];
      }
    } catch (e) {
      console.error("Error fetching notes:", e);
    }
  };
  
  useEffect(() => {
    displayAnalyzes();
  }, []);

  const handleAddAnalyze = async () => {
    const userId = localStorage.getItem("userId");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    try {
      const newNoteRef = ref(db, `users/${userId}/notes/${Date.now()}`);
  
      await set(newNoteRef, {
        note,
        dropdownValue,
        time,
        date: localStorage.getItem("currentDate"),
      });
      displayAnalyzes();
      setNote("");
      setDropdownValue("option1");
      setTime("");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert(e);
    }
  };

/*
  <CalendarButton>
   <SyncIcon/>
  </CalendarButton>
*/

  return (
    <div className="analyzes-setter">
      <p style={{ fontSize: "larger", padding: "10px", width: "100%", textAlign: "center", borderBottom: "1px solid var(--selectableBorder)" }}>
        Analyzes list:
      </p>
      
      <div className="analyzes-container">
        {notesList.length === 0 ? (
          <div/>
        ):(
          <ul>
          {notesList.map((analyze) => (
            <li key={analyze.id}>
            <p style={{textAlign:"center", padding:"2px", color:"var(--selectableBorder)"}}>{analyze.date}</p>

            <Analyze
              name={analyze.dropdownValue}
              time={analyze.time}
              note={analyze.note}
              onAfterClick={() => deleteAnalyze(analyze.id)} // Pass the analyze ID to delete
            />
            </li>
          ))}
        </ul>
        )}
      </div>
      <div className="note-container">
        <p style={{ fontSize: "larger", padding: "10px", width: "100%", textAlign: "center", borderBottom: "1px solid var(--selectableBorder)" }}>
          Add new analyze to selected day:
        </p>
        <input 
          type="text" 
          className="note" 
          placeholder="Add a note for selected day here (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="bottom-container">
        <select 
          className="dropdown"
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>                
        </select>
        <input 
          className="time-setter" 
          type="time" 
          id="appt" 
          name="appt" 
          min="09:00" 
          max="18:00" 
          required 
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button type={"secondary"} onClick={handleAddAnalyze}>
          Add
        </Button>
      </div>
    </div>
  );
}
