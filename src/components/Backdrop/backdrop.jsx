import { motion } from "framer-motion";  // Make sure you are importing from framer-motion
import "./backdrop.css"
export default function Backdrop({ children, onclick }) {
    return (
        <motion.div
            className="backdrop"
            onClick={onclick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
}
