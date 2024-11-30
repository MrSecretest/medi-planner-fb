import { motion} from "framer-motion"; // Make sure to use framer-motion
import PropTypes from "prop-types";  // Import PropTypes to validate props
import Backdrop from "../Backdrop/backdrop";
import "./modal.css"
import CalendarButton from "../calendar/calendarButton";
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ handleClose, text }) {


    return (
        <Backdrop onClick={handleClose}>
            <motion.div className="modal"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.1 }}
            >
            <div
                
                onClick={(e) => e.stopPropagation()}
                className="modal-top"
            >
                {text}
            </div>
            <div className="modal-bottom">
                <CalendarButton onClick={handleClose}>
                    <CloseIcon/>
                </CalendarButton>
            </div>
            </motion.div>
        </Backdrop>
    );
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,  // Make sure to validate the text prop
};
