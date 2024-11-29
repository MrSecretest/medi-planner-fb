import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Button from '../button/button';
import './auth.css';
import logo from '../../media/logo.png';

export default function Log_in({ handleCloseAuthView }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook for navigation



  const handleLogIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      localStorage.setItem('userId', user.uid);
      handleCloseAuthView();
      navigate("/reminder");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <img src={logo} width={100} alt="Logo" />
        <div className="auth-fields">
          <p>Log In</p>
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
          <div className="error-msg">
            {error && <h1 className="error-msg-h1">{error}</h1>}
          </div>
          <div className="buttons">
            <Button type="secondary" onClick={handleLogIn}>
              Proceed
            </Button>
            <Button type="red" onClick={handleCloseAuthView}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
