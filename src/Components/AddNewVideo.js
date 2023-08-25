import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { createCard } from '../Redux/activeBucket/activeBucketAction';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import showToast from '../showToast';

function AddNewVideo({ setAdd }) {
    const { cards, activeBucket } = useSelector(store => { return store.activeBucket })
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const saveHandler = (e) => {
        e.preventDefault();
        if (activeBucket === null) {
            setAdd(false);
            showToast({
                msg: "Create/Choose a bucket",
                type: "error"
            });
            return;
        }
        const data = {
            name: name,
            url: url,
            bucketId: activeBucket._id
        }
        dispatch(createCard({ cards: cards, data, setAdd: setAdd }));
    }
    return (
        <div className='w-[100%] h-[100%]'>
            <div className='flex  justify-center items-center h-[100%] w-[100%] md:w-[70%] mx-auto '>

                <form onSubmit={saveHandler} className="gap-[20px] flex flex-col p-[20px] bg-white rounded-[10px] w-[80%] drop-shadow-lg border-[1px] border-gray-400 z-50" >
                    <div className='flex text-center justify-between text-[18px] font-bold'>
                        <span>Add new video</span>
                        <span className='cursor-pointer' onClick={() => { setAdd(false) }}><CloseOutlinedIcon /></span>
                    </div>
                    <input value={name} onChange={(e) => { setName(e.target.value) }} autoComplete="on" required={true} className="py-[4px] outline-none border-b-[1px] border-b-gray-400" type="text" placeholder="Video Name" name="video-name" />
                    <input value={url} onChange={(e) => { setUrl(e.target.value) }} autoComplete="on" required={true} className="py-[4px] outline-none border-b-[1px] border-b-gray-400" type="url" placeholder="Video URL" name="video-url" />
                    <button type='submit' className='rounded-md px-3 py-[3px] text-[18px] font-bold  bg-[#ff4343]  text-white' >Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddNewVideo
