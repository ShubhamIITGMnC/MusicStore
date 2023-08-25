import React from 'react'
import bg from "../Images/bg.jpg"
import { useNavigate } from 'react-router-dom'

function Section() {
    const navigate=useNavigate();
    return (
        <div className='flex justify-center items-center' style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "calc(100vh - 68px)", marginTop: "68px" }}>
            <div className='flex flex-col justify-center items-center w-[80%] text-white gap-1'>
                <div className='text-[24px] font-bold text-center'>
                    Make your music collection with YMusic
                </div>
                <div className='mt-[10px] flex justify-center items-center'>
                    <button className='rounded-md px-3 py-[3px] text-[18px] font-bold  bg-black' onClick={()=>{navigate("/auth")}} >Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Section
