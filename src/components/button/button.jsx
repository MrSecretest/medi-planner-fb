import { useEffect, useState } from 'react'
import './button.css'

export default function Button({children, type, onClick}){
    const [ButtonClass, setButtonClass] = useState('');
    useEffect(() =>{
    if (type == 'primary')
    {
        setButtonClass('btn-primary')
    }
    else if (type=='secondary')
    {
        setButtonClass('btn-secondary')
    }
    else{
        setButtonClass('btn-red')
    }
    })

    return(
    <>
        <div className={`btn ${ButtonClass}`} onClick={onClick}>
            <p className="btn-text">{children}</p>
        </div>
    </>)
}