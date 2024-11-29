import Button from "../../components/button/button";
import Analyze from "../../components/analyze/analyze"
import "../../styles/analyzes.css"

export default function Analyzes()
{
    return(
        
        <div className="analyzes-setter">
            <p style={{fontSize:"larger", padding:"10px", width:"100%", textAlign:"center", borderBottom:"1px solid var(--selectableBorder)"}}>Analyzes this day:</p>
            <div className="analyzes-container">
                <Analyze name="Example" time="12AM" beforeType={true}></Analyze>
            </div>
            <div className="note-container">
                <p style={{fontSize:"larger", padding:"10px", width:"100%", textAlign:"center", borderBottom:"1px solid var(--selectableBorder)"}}>Add new analyze to this day:</p>
                <input type="text" className="note" placeholder="Add a note for this day here (optional)"></input>
            </div>
            <div className="bottom-container">
                <select className="dropdown">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>                
                </select>
                <input className="time-setter" type="time" id="appt" name="appt" min="09:00" max="18:00" required />
                <Button type={"secondary"}>Add</Button>
            </div>
        </div>
        
    )
}

