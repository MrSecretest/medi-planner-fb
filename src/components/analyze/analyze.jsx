import PropTypes from "prop-types";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';




export default function Analyze({ name, time, note, onBeforeClick, onAfterClick }){
    return(
            <div className="analyze">
                <div className="analyze-before">
                    <StickyNote2Icon onClick={onBeforeClick}></StickyNote2Icon>
                </div>
                    <div className="analyze-content">{`${name} at ${time}`}</div>
                    <div className="analyze-after" onClick={onAfterClick}></div>
                </div>
    )
}

Analyze.defaultProps = {
    name: "Default Name",
    time: "00:00",
    onBeforeClick: () => {},
    onAfterClick: () => {},
};

Analyze.propTypes = {
    name: PropTypes.string.isRequired,
    beforeType: PropTypes.bool,
    time: PropTypes.string.isRequired,
    onBeforeClick: PropTypes.func,
    onAfterClick: PropTypes.func,
};
