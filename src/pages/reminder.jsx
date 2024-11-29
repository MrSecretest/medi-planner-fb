import Button from "../components/button/button";
import "../styles/dashboard.css";
import Calendar from "../components/calendar/calendar";
import Analyzes from "../components/analyzesSetter/analyzesSetter";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { getDoc, doc} from ".././firebase.js";


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
            <div className="box-container-flex">
                <Calendar />
                <Analyzes />
                <Button type="alert" onClick={signOut}>Log out</Button>
            </div>
        </div>
    );
}
