import React from 'react'
import { useState } from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import "./Bucket.css"
import { useSelector } from 'react-redux';
import { deleteBucket } from '../Redux/buckets/bucketAction';
import { updateBucket } from '../Redux/buckets/bucketAction';
import { useDispatch } from 'react-redux';
import { setActiveBucket } from '../Redux/activeBucket/activeBucketAction';


function Bucket({ bucket, active }) {
    const dispatch = useDispatch();
    const { buckets } = useSelector(store => { return store.buckets });
    const {activeBucket,cards}= useSelector(store=>{return store.activeBucket})
    const [txt, setTxt] = useState(bucket.name);
    const [editMode, setEditMode] = useState(false);
    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(deleteBucket({ b: bucket, Buckets: buckets,activeBucket,cards }));
    }
    const updateHandler = () => {
        let flag = false;
        for (let i = 0; i < txt.length; i++) {
            if (txt[i] !== ' ') {
                flag = true;
                break;
            }
        }
        if (!flag) {
            setTxt(bucket.name);
            return;
        }
        const data = {
            name: txt
        }
        dispatch(updateBucket({ b: bucket, Buckets: buckets, data: data }))
    }

    const makeActive = () => {
        dispatch(setActiveBucket({ activeBucket: bucket }));
    }

    return active ? (

        <div id='bucketContainer' className="flex justify-between items-center  text-[16px]  bg-[#ff4343] text-white  z-10 border-b-[1px] border-gray-400 cursor-pointer " >
            <div className='w-[75%]' onClick={makeActive}>
                <input onChange={(e) => { setTxt(e.target.value) }} type="text" bg- value={txt} disabled={editMode === false ? true : false} className={editMode === false ? `outline-none  py-3 pl-[12px]  z-1 bg-[#ff4343] cursor-pointer` : `outline-none  py-3 pl-[12px]   border-[2px] rounded-md bg-[#ff4343] cursor-pointer`} />
            </div>
            <div className='py-3 px-[8px] flex gap-2 cursor-pointer w-[25%]'>
                {editMode === false && <div className='icon' onClick={() => { setEditMode(true) }}><EditRoundedIcon /></div>}
                {editMode === true && <div className='icon' onClick={() => { setEditMode(false); updateHandler() }} ><CheckRoundedIcon /></div>}
                <div className='icon' onClick={deleteHandler}><DeleteRoundedIcon /></div>
            </div>
        </div>
    ) :
        <div id='bucketContainer' className="flex justify-between items-center text-gray-500 text-[16px]  hover:bg-[#ff4343]  z-10 border-b-[1px] border-gray-400 cursor-pointer">
            <div className='w-[75%]' onClick={makeActive}>
                <input onChange={(e) => { setTxt(e.target.value) }} type="text" bg- value={txt} disabled={editMode === false ? true : false} className={editMode === false ? `outline-none  py-3 pl-[12px]  z-1 cursor-pointer` : `outline-none  py-3 pl-[12px]   border-[2px] rounded-md cursor-pointer`} />
            </div>
            <div className='py-3 px-[8px] flex gap-3 cursor-pointer w-[25%] '>
                {editMode === false && <div className='icon ' onClick={() => { setEditMode(true) }}><EditRoundedIcon /></div>}
                {editMode === true && <div className='icon' onClick={() => { setEditMode(false); updateHandler() }} ><CheckRoundedIcon /></div>}
                <div className='icon' onClick={deleteHandler}><DeleteRoundedIcon /></div>
            </div>
        </div>
}

export default Bucket
