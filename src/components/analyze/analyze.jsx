import PropTypes from "prop-types";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import BlockIcon from '@mui/icons-material/Block';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import Modal from "../Modal/modal";
import { motion, AnimatePresence } from "motion/react";

export default function Analyze({ name, time, note, onAfterClick }) {
    const [showNote, setShowNote] = useState(false);

    const close = () => setShowNote(false);
    const open = () => setShowNote(true);

    return (
        <>
            <div className="analyze">
                {note ?
                    <div className="analyze-before" onClick={() => (showNote ? close() : open())}>
                        <StickyNote2Icon />
                    </div> :
                    <div className="analyze-before-deactivated">
                        <BlockIcon />
                    </div>}

                <div className="analyze-content">{`${name} | ${time}`}</div>
                <div className="analyze-after" onClick={onAfterClick}>
                    <DeleteForeverIcon />
                </div>
            </div>
            <AnimatePresence
                initial={false}
                mode='wait'
                onExitComplete={() => null}
            >
                {showNote &&
                    <motion.div key="modal" exit={{ opacity: 0 }}>
                        <Modal modalOpen={showNote} handleClose={close} text={note} />
                    </motion.div>}
            </AnimatePresence>

        </>
    );
}

Analyze.defaultProps = {
    name: "Default Name",
    time: "00:00",
    onAfterClick: () => { },
};

Analyze.propTypes = {
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    onAfterClick: PropTypes.func,
};
