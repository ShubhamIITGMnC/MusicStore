import React from 'react';
import { createUser } from '../Redux/user/userAction';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import showToast from '../showToast';
import { CircularProgress } from '@mui/material';




function SignUp({setPot}) {
    const dispatch= useDispatch();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");
    const [loading,setLoading] = useState(false);
    const clearData=()=>{
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
        setPot(1);
    }
    const handleClick=(e)=>{
        e.preventDefault();
        if(password!==cpassword)
        {
            showToast({
                msg:"Passowrd is not matched with confirm password",
                type:"error"
            });
            return ;
        }
        if(password==="") return ;
        const data={
            name:name,
            email:email,
            password:password
        }
        dispatch(createUser({data,clearData,setLoading}));
    }
    return (
        <div className='w-[100%] h-[100vh] flex justify-center items-center'>
            <div className="flex flex-col gap-1 justify-center items-center mt-[20px] w-[100%] sm:w-[50%]">
                <div className='text-center text-[18px] font-bold'>Sign Up</div>
                <form className="gap-[20px] flex flex-col p-[20px] bg-white rounded-[10px] w-[80%] drop-shadow-lg border-[1px] border-gray-400" onSubmit={handleClick} >
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} autoComplete="on" required={true} className="py-[4px] outline-none border-b-[1px] border-b-gray-400" type="text" placeholder="Name" name="name" />
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="on" required={true} className="py-[4px] outline-none border-b-[1px] border-b-gray-400" type="email" placeholder="Email" name="email" />
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} autoComplete="on" minLength="6" required={true} className="py-[4px] outline-none border-b-[1px] border-b-gray-400" type="password" placeholder="Password" name="password" />
                    <input value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} autoComplete="on" minLength="6" required={true} className="py-[4px] outline-none border-b-[1px] border-b-gray-400" type="text" placeholder="Confirm Password" name="cpassword" />
                    <button type='submit' className='rounded-md px-3 py-[3px] text-[18px] font-bold  bg-[#ff4343]  text-white' >{loading?<CircularProgress color="inherit" />:"Continue"}</button>
                    <div className='text-center flex justify-center items-center flex-col md:flex-row md:gap-1'><span>Already have an account?</span> <span className='text-[#ff4343] cursor-pointer font-medium' onClick={()=>{setPot(1)}}>Login</span></div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
