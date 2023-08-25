import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function UserAuth() {
  const navigate=useNavigate();
  const [pot,setPot] = useState(1);
  useEffect(()=>{
    if(localStorage.getItem("token")!==null)
    {
      navigate("/home");
    }
  },[])
  return (
    <div>
      <Navbar/>
      <div>
        {(pot===1)&&<Login setPot={setPot}/>}
        {(pot===2)&&<SignUp setPot={setPot}/>}
      </div>
    </div>
  )
}

export default UserAuth
