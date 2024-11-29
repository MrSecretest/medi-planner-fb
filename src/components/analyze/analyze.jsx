import PropTypes from "prop-types";
import fileAdd from "../../media/file.png"
import fileExist from "../../media/file_exist.png"


export default function Analyze({ name, time, beforeType, onBeforeClick, onAfterClick }){
    return(
            <div className="analyze">
                <div className="analyze-before">
                    <img src={beforeType ? fileExist : fileAdd}  alt="img" onClick={onBeforeClick}></img>
                </div>
                    <div className="analyze-content">{`${name} at ${time}`}</div>
                    <div className="analyze-after" onClick={onAfterClick}></div>
                </div>
    )
}

Analyze.defaultProps = {
    name: "Default Name",
    beforeType: false,
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
