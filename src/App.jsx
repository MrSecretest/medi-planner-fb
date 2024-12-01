import React, { useEffect, useState } from "react";
import logo from "./media/logo.png";
import "./styles/main.css";
import Button from "./components/button/button";
import LogIn from "./components/auth/log_in";
import SignUp from "./components/auth/sign_up";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
export default function Main() {
  useEffect(() => {
    localStorage.removeItem("currentDate");
  }, [Main])
  const constraintsRef = useRef(null)
  const [authView, setAuthView] = useState(null);

  const handleSignUpClick = () => {
    setAuthView("sign_up");
  };

  const handleLogInClick = () => {
    setAuthView("log_in");
  };

  const handleCloseAuthView = () => {
    setAuthView(null);
  };

  return (
    <div className="main-analyzes-bg">
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          mass: 0.75,
          stiffness: 100
        }}
        className="container-centered">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 600, damping: 10 }}
          whileDrag={{ scale: 1.2 }}
          drag
          dragConstraints={constraintsRef}
          className="images-container"
          ref={constraintsRef}>
          <motion.img
            transition={{ duration: 0.3 }}
            src={logo} width={152} alt="Logo" className="logo front-img" />
        </motion.div>

        <div className="title-container">
          <p className="title-name" data-text="MediPlanner">
            MediPlanner
          </p>
        </div>
        <p className="title-p">
          Track your{" "}
          <span className="title-span">health</span> effortlessly with this
          intuitive platform. Upload{" "}
          <span className="title-span">medical test results</span>,{" "}
          <span className="title-span">monitor your progress</span>, and{" "}
          <span className="title-span">plan future checkups</span>.
        </p>
        <div className="button-cont">
          <Button type="secondary" onClick={handleSignUpClick}>
            Sign Up
          </Button>
          <Button type="primary" onClick={handleLogInClick}>
            Log In
          </Button>
        </div>
      </motion.div>
      <AnimatePresence>
        {authView === "sign_up" && (
          <SignUp
            handleCloseAuthView={handleCloseAuthView}
            handleLogInClick={handleLogInClick}
          />
        )}
        {authView === "log_in" && (
          <LogIn
            handleCloseAuthView={handleCloseAuthView}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
