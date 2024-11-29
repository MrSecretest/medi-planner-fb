import { useState } from "react";
import Button from "../../components/button/button";
import Analyze from "../../components/analyze/analyze";
import "../../styles/analyzes.css";
import { db, ref, set } from "../../firebase.js";
import { useNavigate } from "react-router-dom";

export default function Analyzes() {
  const [note, setNote] = useState("");
  const [dropdownValue, setDropdownValue] = useState("option1");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleAddNote = async () => {
    const userId = localStorage.getItem("userId");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in to add a note!");
      navigate("/");
      return;
    }
    try {
      const newNoteRef = ref(db, `users/${userId}/notes/${Date.now()}`);
  
      await set(newNoteRef, {
        note,
        dropdownValue,
        time,
        createdAt: new Date().toISOString(),
      });
  
      alert("Note added successfully!");
      setNote("");
      setDropdownValue("option1");
      setTime("");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert(e);
    }
  };
  

  return (
    <div className="analyzes-setter">
      <p style={{ fontSize: "larger", padding: "10px", width: "100%", textAlign: "center", borderBottom: "1px solid var(--selectableBorder)" }}>
        Analyzes this day:
      </p>
      <div className="analyzes-container">
        <Analyze name="Example" time="12AM" beforeType={true}></Analyze>
      </div>
      <div className="note-container">
        <p style={{ fontSize: "larger", padding: "10px", width: "100%", textAlign: "center", borderBottom: "1px solid var(--selectableBorder)" }}>
          Add new analyze to this day:
        </p>
        <input 
          type="text" 
          className="note" 
          placeholder="Add a note for this day here (optional)"
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
        <Button type={"secondary"} onClick={handleAddNote}>
          Add
        </Button>
      </div>
    </div>
  );
}
