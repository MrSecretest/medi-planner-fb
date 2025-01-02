import "../styles/dashboard.css";
import Calendar from "../components/calendar/calendar";
import Analyzes from "../components/analyzesSetter/analyzesSetter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { motion } from "framer-motion";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarButton from "../components/calendar/calendarButton.jsx";

export default function Reminder() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (!userDocSnapshot.exists()) {
              alert("User not found!");
              navigate("/");
            }
          } else {
            navigate("/");
          }
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkUser();
  }, [navigate]);

  const signOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  

  return (
    <div className="box-container">
      <motion.div
        className="box-container-flex"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          mass: 0.75,
          stiffness: 100,
        }}
      >
        <Calendar />
        <Analyzes />
        <CalendarButton type="alert" onClick={signOut}>
          <LogoutIcon />
        </CalendarButton>
      </motion.div>
    </div>
  );
}
