import './auth.css'
import logo from '../../media/logo.png';
import Button from '../button/button';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 
import { motion } from 'motion/react';
import { BounceLoader } from 'react-spinners';


export default function Sign_up({handleCloseAuthView, handleLogInClick})
{
    const [email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[error, setError] = useState('');
    const [currentlyLoading, setCurrentlyLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            setCurrentlyLoading(true);
            await createUserWithEmailAndPassword(auth, email, pass);
            handleLogInClick();
        } catch (err) {
            setError(err.message);
            setCurrentlyLoading(false);
        }
      };
    
    return(
         <motion.div 
            className='auth-bg'
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 0.1}}>
            <div className='auth-container'>
                <img src={logo} width={100} alt="Logo" />
                <form className='auth-fields'>
                    <p>Sign Up</p>
                    <input onChange={(e) => setEmail(e.target.value)} id='email' type="text" placeholder='login'></input>
                    <input onChange={(e) => setPass(e.target.value)} id='pass' type="pass" placeholder='password'></input>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: currentlyLoading ? 1 : 0, scale: currentlyLoading ? 1 : 0.8 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{
                            width: "100%",
                            height: "60px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        >
                        <BounceLoader
                            speedMultiplier={2}
                            color="#5370BE"
                        />
                    </motion.div>
                    <motion.div className="error-msg"
                        animate={{ opacity: error!='' ? 1 : 0, scale: error!='' ? 1 : 0.8 }}>
                        {error && <h1 className="error-msg-h1">{error}</h1>}
                    </motion.div>

                    <div className='buttons'>
                        <Button onClick={handleSignUp} type='secondary' >Proceed</Button>
                        <Button type='red' onClick={handleCloseAuthView}>Close</Button>
                    </div>

                </form>
            </div>
        </motion.div>
    )
}