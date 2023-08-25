import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Section from '../Components/Section'
import { useNavigate } from 'react-router-dom'



function Home() {
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")!==null)
    {
      navigate("/home");
    }
  },[])
  return (
    <div>
      <Navbar />
      <Section />
    </div>
  )
}

export default Home
