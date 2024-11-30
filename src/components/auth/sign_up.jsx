import './auth.css'
import logo from '../../media/logo.png';
import Button from '../button/button';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 
import { motion } from 'motion/react';
export default function Sign_up({handleCloseAuthView, handleLogInClick})
{
    const [email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[error, setError] = useState('');

    const handleSignUp = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, pass);
          alert('Account created successfully!');
          handleLogInClick();
        } catch (err) {
          setError(err.message);
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
                    <div className='error-msg'>
                    {error &&
                    (
                        <h1 className='error-msg-h1' >{error}</h1>
                    )}
                    </div>

                    <div className='buttons'>
                        <Button onClick={handleSignUp} type='secondary' >Proceed</Button>
                        <Button type='red' onClick={handleCloseAuthView}>Close</Button>
                    </div>

                </form>
            </div>
        </motion.div>
    )
}