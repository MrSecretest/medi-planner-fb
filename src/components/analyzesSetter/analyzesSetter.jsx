import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import Analyze from "../../components/analyze/analyze";
import "../../styles/analyzes.css";
import { db, ref, set, get, remove } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function Analyzes() {
  const [note, setNote] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [time, setTime] = useState("");
  const [notesList, setNotesList] = useState([]);
  const navigate = useNavigate();

  const ageGroupTests = {
    "18-25": [
      "Physical Exam", "CBC", "Blood Glucose", "Lipid Profile", "Dental Check-up",
      "Eye Exam", "STI Screening", "Pap Smear (Women)", "Skin Check", "Vaccinations (HPV, Tdap)"
    ],
    "25-30": [
      "Physical Exam", "CBC", "Blood Glucose", "Lipid Profile", "Thyroid Test", "STI Screening",
      "Pap Smear", "Mental Health", "Bone Health", "Lifestyle Assessment"
    ],
    "30-45": [
      "Physical Exam", "Lipid Profile", "Blood Glucose", "Liver Function", "Cancer Screening (Mammogram/Prostate)",
      "Eye Exam", "Dental Check-up", "Pap Smear/HPV Test", "Mental Health", "Skin Cancer Screening"
    ],
    "45-60": [
      "Physical Exam", "Lipid Profile", "Blood Glucose/HbA1c", "Kidney Function", "Colonoscopy",
      "Mammogram", "PSA Test (Men)", "Bone Density Scan", "Vision and Hearing Tests",
      "Vaccinations (Shingles/Flu/Pneumonia)", "Heart Screening (ECG/Stress Test)", "Mental Health", "Weight and Nutrition"
    ]
  };

  const handleFirebaseOperation = async (operation, path, data = null) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in!");
      navigate("/");
      return;
    }

    const userNotesRef = ref(db, `users/${userId}/notes/${path}`);

    try {
      if (operation === "get") {
        const snapshot = await get(userNotesRef);
        if (snapshot.exists()) {
          const notesArray = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
          setNotesList(notesArray);
          return notesArray;
        }
      } 
      else if (operation === "set") {
        await set(userNotesRef, data);
        displayAnalyzes();
      } 
      else if (operation === "remove") {
        await remove(userNotesRef);
        setNotesList((prevNotes) => prevNotes.filter((note) => note.id !== path));
      }
    } catch (error) {
      console.error(`Error with Firebase operation (${operation}): `, error);
      alert(`Failed to perform operation. Please try again.`);
    }
  };

  useEffect(() => {
    displayAnalyzes();
  }, []);

  const displayAnalyzes = async () => {
    await handleFirebaseOperation("get", "");
  };

  const handleAddAnalyze = async () => {
    if (!dropdownValue || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const data = { note, dropdownValue, time, date: localStorage.getItem("currentDate") };
    await handleFirebaseOperation("set", `${Date.now()}`, data);

    setNote("");
    setDropdownValue("");
    setTime("");
  };

  const deleteAnalyze = async (analyzeId) => {
    await handleFirebaseOperation("remove", analyzeId);
  };

  return (
    <div className="analyzes-setter">
      <p className="section-header">Analyzes list:</p>

      <div className="analyzes-container">
        <div className="analyze-centered">
          <AnimatePresence>
            {notesList.map((analyze) => (
              <motion.div
                layout
                key={analyze.id}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.05 }}
              >
                <p style={{ textAlign: "center", padding: "2px", color: "var(--selectableBorder)" }}>
                    {analyze.date}
                  </p>
                <Analyze
                  name={analyze.dropdownValue}
                  time={analyze.time}
                  note={analyze.note}
                  onAfterClick={() => deleteAnalyze(analyze.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="note-container">
        <p className="section-header">Add new analyze to selected day:</p>
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
          <option value="">Choose your check-up</option>
          {Object.keys(ageGroupTests).map((ageGroup) => (
            <optgroup label={`Age ${ageGroup}`}>
              {ageGroupTests[ageGroup].map((test) => (
                <option value={test} key={test}>{test}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <input
          className="time-setter"
          type="time"
          id="appt"
          name="appt"
          min="09:00"
          max="18:00"
          requirede
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button type="secondary" onClick={handleAddAnalyze}>Add</Button>
      </div>
    </div>
  );
}
