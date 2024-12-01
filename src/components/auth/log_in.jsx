import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import Button from '../button/button';
import './auth.css';
import logo from '../../media/logo.png';
import { motion } from 'motion/react';
import { BounceLoader } from 'react-spinners';
import GoogleIcon from '@mui/icons-material/Google';
import CalendarButton from '../calendar/calendarButton';

export default function Log_in({ handleCloseAuthView, handleSignUpClick }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook for navigation
  const [currentlyLoading, setCurrentlyLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      navigate('/reminder');
    }
  }, [userId, navigate]);

  const handleLogIn = async () => {
    try {
      setCurrentlyLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      localStorage.setItem('userId', user.uid);
      handleCloseAuthView();
      navigate('/reminder');
    } catch (err) {
      setError(err.message);
      setCurrentlyLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('userId', user.uid);
      handleCloseAuthView();
      navigate('/reminder');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="auth-bg"
    >
      <div className="auth-container">
        <img src={logo} width={100} alt="Logo" />
        <div className="auth-fields">
          <p style={{ fontWeight: 'bold' }}>Log In</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: currentlyLoading ? 1 : 0, scale: currentlyLoading ? 1 : 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BounceLoader speedMultiplier={2} color="#5370BE" />
          </motion.div>
          <motion.div
            className="error-msg"
            animate={{ opacity: error !== '' ? 1 : 0, scale: error !== '' ? 1 : 0.8 }}
          >
            {error && <h1 className="error-msg-h1">{error}</h1>}
          </motion.div>
          <div className="buttons">
            <CalendarButton type="primary" onClick={handleGoogleSignIn}>
              <GoogleIcon />
            </CalendarButton>
            <Button type="secondary" onClick={handleLogIn}>
              Proceed
            </Button>
            <Button type="red" onClick={handleCloseAuthView}>
              Close
            </Button>
            <a href="#" onClick={handleSignUpClick}>Don't have an account yet?</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
