import React from 'react'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditCard from './EditCard';
import { useState } from 'react';
import { deleteCard } from '../Redux/activeBucket/activeBucketAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowBucket from './ArrowBucket';
import VideoModal from './VideoModal';
import { createHistory } from '../Redux/history/historyAction';
import moment from "moment"


function Card({ card }) {
    const dispatch = useDispatch();
    const [copy,setCopy] = useState(false);
    const [video, setVideo] = useState(false);
    const { cards, activeBucket } = useSelector(store => { return store.activeBucket })
    const { buckets } = useSelector(store => { return store.buckets })
    const {allHistory}=useSelector(store=>{return store.allHistory});
    const [edit, setEdit] = useState(false);
    const [arrow, setArrow] = useState(false);

    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(deleteCard({ cards: cards, card: card }));
    }
    const watchHandler=(e)=>{
        e.preventDefault();
        setVideo(true);
        const nowtime=moment();
        let data={
            name:card.name,
            url:card.url,
            cardId:card._id,
            date: nowtime.format('DD-MM-YYYY'),
            time: nowtime.format('HH:mm'),
        };
        dispatch(createHistory({data,allHistory}));
        return ;
    }
    return (
        <div className='flex justify-center'>
            <div className='w-[100%] h-[150px] border-[1px] shadow-lg rounded-md flex flex-col p-2 '>
                <div className=' text-center text-[20px] font-medium text-gray-500'>
                    {card.name}
                </div>
                <div className='flex mt-[20px] justify-between w-[80%] mx-auto'>
                    <div className='cursor-pointer text-[#ff4343] hover:font-bold' onClick={watchHandler}>
                        Watch Video
                    </div>
                    <div className='cursor-pointer text-[#ff4343] hover:font-bold' onClick={() => { navigator.clipboard.writeText(card.url) ;setCopy(true);setTimeout(()=>{setCopy(false)},1500)}}>
                        {!copy?"Copy Link":"Copied"}
                    </div>
                </div>
                <div className='flex mt-[20px] justify-between w-[80%] mx-auto text-[#ff4343] relative'>
                    <div className='cursor-pointer' onClick={() => { setArrow(true) }}>
                        {!arrow && <ArrowForwardOutlinedIcon />}
                    </div>
                    <div className='flex gap-3'>
                        <div className='cursor-pointer' onClick={() => { setEdit(true) }}>
                            <EditRoundedIcon />
                        </div>
                        <div className='cursor-pointer' onClick={deleteHandler}>
                            <DeleteRoundedIcon />
                        </div>
                    </div>
                    {
                        arrow && <div className='absolute top-0 flex flex-col bg-[#f1f1f1] px-[10px] shadow-lg border-[1px] border-gray-200 py-[5px] rounded-sm'>
                            <div className='cursor-pointer w-[20%]' onClick={() => { setArrow(false) }}><CloseOutlinedIcon /></div>
                            <div className='flex flex-col gap-[8px] max-h-[300px] overflow-y-auto'>
                                {
                                    buckets.map((b) => {
                                        return <ArrowBucket card={card} key={b._id} bucket={b} currbucket={activeBucket} setArrow={setArrow} />
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            {edit && <div className='fixed top-0 left-0 w-[100%] h-[100%]  z-50 bg-[#535151a2]'>
                <EditCard card={card} setEdit={setEdit} />
            </div>
            }
            {
                video && <div className='fixed top-0 left-0 w-[100%] h-[100%]  z-50 bg-[#535151a2]'>
                    <VideoModal card={card} setVideo={setVideo} />
                </div>
            }
        </div>
    )
}

export default Card
