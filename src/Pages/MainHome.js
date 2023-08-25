import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Main from '../Components/Main'
import { useNavigate } from 'react-router-dom'


function MainHome() {
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("token")===null)
        {
          navigate("/");
        }
      },[])

    return (
        <div>
            <Navbar />
            <Main />
        </div>
    )
}

export default MainHome
