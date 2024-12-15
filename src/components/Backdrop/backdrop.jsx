import { motion } from "framer-motion";  // Make sure you are importing from framer-motion
import "./backdrop.css"
export default function Backdrop({ children, onclick }) {
    return (
        <motion.div
            className="backdrop"
            onClick={onclick}
            initial={{ opacity: 0, backdropFilter: "blur(0px)"}}
            animate={{ opacity: 1, backdropFilter: "blur(5px)"}}
            exit={{ opacity: 0, backdropFilter: "blur(0px)"}}
            transition={{ duration: 0.3 }}
            layout
        >
            {children}
        </motion.div>
    );
}
