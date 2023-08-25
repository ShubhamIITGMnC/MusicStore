import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch } from 'react-redux';
import { updataCard } from '../Redux/activeBucket/activeBucketAction';
import { useSelector } from 'react-redux';

function EditCard({setEdit,card}) {
    const dispatch=useDispatch();
    const {cards,activeBucket} = useSelector(store=>{return store.activeBucket})
    const [name,setName] = useState(card.name);
    const [url,setUrl] = useState(card.url);
    const saveHandler=(e)=>{
        e.preventDefault();
        const data={
            name:name,
            url:url,
            bucketId:activeBucket._id
        }
        dispatch(updataCard({setEdit:setEdit,cards:cards,data,card:card}));
    }
    return (
        <div className='w-[100%] h-[100%]'>
            <div className='flex  justify-center items-center h-[100%] w-[100%] md:w-[70%] mx-auto '>

                <form onSubmit={saveHandler} className="gap-[20px] flex flex-col p-[20px] bg-white rounded-[10px] w-[80%] drop-shadow-lg border-[1px] border-gray-400 z-[100]" >
                    <div className='flex text-center justify-between text-[18px] font-bold'>
                        <span>Edit Card</span>
                        <span className='cursor-pointer' onClick={()=>{setEdit(false)}}><CloseOutlinedIcon/></span>
                    </div>
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} autoComplete="on" required={true} className="py-[4px] outline-none border-b-[1px] border-b-gray-400" type="text" placeholder="Video Name" name="video-name" />
                    <input value={url} onChange={(e)=>{setUrl(e.target.value)}} autoComplete="on" required={true} className="py-[4px] outline-none border-b-[1px] border-b-gray-400" type="url" placeholder="Video URL" name="video-url" />
                    <button type='submit' className='rounded-md px-3 py-[3px] text-[18px] font-bold  bg-[#ff4343]  text-white' >Save</button>
                </form>
            </div>
        </div>
    )
} 

export default EditCard
