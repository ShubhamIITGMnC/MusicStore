import React from 'react'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../Redux/user/userAction';
import { useDispatch } from 'react-redux';
import { fetchHistory } from '../Redux/history/historyAction';
import showToast from '../showToast';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';



const Navbar = () => {
    const {loader} = useSelector(store=>{return store.loader})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token"); 
        navigate("/"); 
        dispatch(updateUser())
        showToast({
            msg:"Successfully logged out",
            type:"success"
        });
    }
    return (
        <div className='bg-white w-[100%] fixed top-0 z-10 shadow-md '>
            <div className='container w-[100%] px-[30px] py-4 mx-auto flex items-center justify-between'>
                <div className='text-[26px]  font-bold  flex justify-center item-center'>
                    <span className='cursor-pointer' onClick={() => { navigate("/"); }}>YMusic</span>
                </div>
                <div className=' flex gap-[5px] justify-center item-center'>
                    {localStorage.getItem("token") !== null && <button className='rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]  font-bold  bg-[#ff4343]  text-white' onClick={() => { navigate("/history");dispatch(fetchHistory()) }} >History</button>
                    }
                    {localStorage.getItem("token") !== null ? <button className='rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]  font-bold  bg-[#ff4343]  text-white' onClick={logoutHandler} >LogOut</button> :
                        <button className='rounded-md px-3 py-[3px] text-[18px] font-bold  bg-[#ff4343]  text-white' onClick={() => { navigate("/auth") }}>Get Started</button>
                    }

                </div>
            </div>
            <div>
                {loader&&<LinearProgress color='primary'/>}
            </div>
        </div>
    )
}

export default Navbar