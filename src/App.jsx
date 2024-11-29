import React, { useEffect, useState } from "react";
import logo from "./media/logo.png";
import logoBlue from "./media/logo-blue.png";
import "./styles/main.css";
import Button from "./components/button/button";
import LogIn from "./components/auth/log_in";
import SignUp from "./components/auth/sign_up";

export default function Main() {
  useEffect(()=>{
    localStorage.removeItem("currentDate");
  }, [Main])

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
      {authView === "sign_up" && (
        <SignUp
          handleCloseAuthView={handleCloseAuthView}
          handleLogInClick={handleLogInClick}
        />
      )}
      {authView === "log_in" && (
        <LogIn handleCloseAuthView={handleCloseAuthView} />
      )}
      <div className="container-centered">
        <div className="images-container">
          <img
            src={logoBlue}
            width={152}
            alt="Logo"
            className="logo back-img"
          />
          <img src={logo} width={152} alt="Logo" className="logo front-img" />
        </div>

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
      </div>
    </div>
  );
}
