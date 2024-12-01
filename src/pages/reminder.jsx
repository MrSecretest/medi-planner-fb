import "../styles/dashboard.css";
import Calendar from "../components/calendar/calendar";
import Analyzes from "../components/analyzesSetter/analyzesSetter";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { getDoc, doc} from ".././firebase.js";
import { motion } from "motion/react";
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarButton from "../components/calendar/calendarButton.jsx";

export default function Reminder() {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            navigate("/");
            return;
          }
      
          const checkUser = async () => {
            const userDocRef = doc(db, "users", userId);
            const userDocSnapshot = await getDoc(userDocRef);
      
            if (!userDocSnapshot.exists()) {
              navigate("/");
            }
          };
      
        checkUser();


    }, [navigate]);

    const signOut = () => {
        localStorage.removeItem("userId");
        navigate("/");
      };

    return (
        <div className="box-container">
            <motion.div className="box-container-flex"
              initial={{y: -50}}
              animate={{y:0 }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 100
                }}>
                <Calendar />
                <Analyzes />
                <CalendarButton type="alert" onClick={signOut}><LogoutIcon/></CalendarButton>
            </motion.div>
        </div>
    );
}
