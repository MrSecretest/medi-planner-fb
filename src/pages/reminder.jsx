import Button from "../components/button/button";
import "../styles/dashboard.css";
import Calendar from "../components/calendar/calendar";
import Analyzes from "../components/analyzesSetter/analyzesSetter";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function Reminder() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/");
        }
    }, [navigate]);

    const signOut = () => {
        localStorage.removeItem("user");
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
