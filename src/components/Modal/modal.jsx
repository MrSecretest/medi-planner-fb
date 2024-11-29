import { motion} from "framer-motion"; // Make sure to use framer-motion
import PropTypes from "prop-types";  // Import PropTypes to validate props
import Backdrop from "../Backdrop/backdrop";
import "./modal.css"
import CalendarButton from "../calendar/calendarButton";
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ handleClose, text }) {


    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.05 }}
                layout
                onClick={(e) => e.stopPropagation()}
                className="modal orange-gradient"
                
            >
                {text}
                <CalendarButton onClick={handleClose}>
                    <CloseIcon/>
                </CalendarButton>
            </motion.div>
            
        </Backdrop>
    );
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,  // Make sure to validate the text prop
};
