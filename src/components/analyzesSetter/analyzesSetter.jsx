import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import Analyze from "../../components/analyze/analyze";
import "../../styles/analyzes.css";
import { db, ref, set, get, remove } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function Analyzes() {
  const [note, setNote] = useState("");
  const [dropdownValue, setDropdownValue] = useState("  ");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const [notesList, setNotesList] = useState([]);

  const age18_25Tests = [
    "Physical Exam",
    "CBC",
    "Blood Glucose",
    "Lipid Profile",
    "Dental Check-up",
    "Eye Exam",
    "STI Screening",
    "Pap Smear (Women)",
    "Skin Check",
    "Vaccinations (HPV, Tdap)"
  ];
  const age25_30Tests = [
    "Physical Exam",
    "CBC",
    "Blood Glucose",
    "Lipid Profile",
    "Thyroid Test",
    "STI Screening",
    "Pap Smear",
    "Mental Health",
    "Bone Health",
    "Lifestyle Assessment"
  ];
  const age30_45Tests = [
    "Physical Exam",
    "Lipid Profile",
    "Blood Glucose",
    "Liver Function",
    "Cancer Screening (Mammogram/Prostate)",
    "Eye Exam",
    "Dental Check-up",
    "Pap Smear/HPV Test",
    "Mental Health",
    "Skin Cancer Screening"
  ];
  const age45_60Tests = [
    "Physical Exam",
    "Lipid Profile",
    "Blood Glucose/HbA1c",
    "Kidney Function",
    "Colonoscopy",
    "Mammogram",
    "PSA Test (Men)",
    "Bone Density Scan",
    "Vision and Hearing Tests",
    "Vaccinations (Shingles/Flu/Pneumonia)",
    "Heart Screening (ECG/Stress Test)",
    "Mental Health",
    "Weight and Nutrition"
  ];

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
    if (!userId) {
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
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
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
    if (!userId) {
      navigate("/");
      return;
    }
    try {
      const newNoteRef = ref(db, `users/${userId}/notes/${Date.now()}`);
      if (dropdownValue != "" && time != "") {
        await set(newNoteRef, {
          note,
          dropdownValue,
          time,
          date: localStorage.getItem("currentDate"),
        });
        displayAnalyzes();
        setNote("");
        setDropdownValue("");
        setTime("");
      }

    } catch (e) {
      console.error("Error adding document: ", e);
      alert(e);
    }
  };


  return (
    <div className="analyzes-setter">
      <p style={{ fontSize: "larger", padding: "10px", width: "100%", textAlign: "center", borderBottom: "1px solid var(--selectableBorder)" }}>
        Analyzes list:
      </p>

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
          <option value="">Choose your check-up</option>
          <optgroup label="Age 18–25">
            <option value="CBC (Blood Test)">CBC (Blood Test)</option>
            <option value="Urine Analysis">Urine Analysis</option>
            <option value="Cholesterol Test">Cholesterol Test</option>
            <option value="HIV Test">HIV Test</option>
            <option value="Hepatitis B/C Test">Hepatitis B/C Test</option>
            <option value="Skin Allergy Test">Skin Allergy Test</option>
          </optgroup>
          <optgroup label="Age 25–30">
            <option value="CBC">CBC</option>
            <option value="Urine Analysis">Urine Analysis</option>
            <option value="Blood Sugar">Blood Sugar</option>
            <option value="Cholesterol">Cholesterol</option>
            <option value="PAP Test (Women)">PAP Test (Women)</option>
            <option value="ECG (Heart Check)">ECG (Heart Check)</option>
          </optgroup>
          <optgroup label="Age 30–40">
            <option value="CBC">CBC</option>
            <option value="Cholesterol">Cholesterol</option>
            <option value="Blood Sugar">Blood Sugar</option>
            <option value="Hormones">Hormones</option>
            <option value="Mammography">Mammography</option>
            <option value="Dermatology Check">Dermatology Check</option>
          </optgroup>
          <optgroup label="Age 40–50">
            <option value="CBC">CBC</option>
            <option value="Colonoscopy">Colonoscopy</option>
            <option value="Mammography">Mammography</option>
            <option value="Blood Sugar">Blood Sugar</option>
            <option value="ECG">ECG</option>
            <option value="Skin Check">Skin Check</option>
          </optgroup>
          <optgroup label="Age 50–60">
            <option value="CBC">CBC</option>
            <option value="Colonoscopy">Colonoscopy</option>
            <option value="Mammography">Mammography</option>
            <option value="Osteoporosis Test">Osteoporosis Test</option>
            <option value="Diabetes Test">Diabetes Test</option>
          </optgroup>
          <optgroup label="Age 70–90">
            <option value="CBC">CBC</option>
            <option value="Colonoscopy">Colonoscopy</option>
            <option value="Mammography">Mammography</option>
            <option value="Heart Check">Heart Check</option>
            <option value="Cognition Check">Cognition Check</option>
            <option value="Osteoporosis">Osteoporosis</option>
          </optgroup>


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
