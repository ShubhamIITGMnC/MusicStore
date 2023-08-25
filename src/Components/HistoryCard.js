import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import { deleteHistory } from '../Redux/history/historyAction';

function HistoryCard({history,allHistory}) {
    const dispatch=useDispatch();
    const deleteHandler=(e)=>{
        e.preventDefault();
        dispatch(deleteHistory({history,allHistory}));
    }
  return (
    <div className='flex shadow-lg justify-between items-center w-[95%] mx-auto border-[1px] py-[5px] px-[10px] border-gray-500 rounded-md'>
      <div className='flex flex-col'>
        <div>{history.name}</div>
        <a href={history.url} className='text-[#ff4343] cursor-pointer hover:underline'>{history.url}</a>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-[5px] items-center'>
        <div>{history.date}</div>
        <div>{history.time}</div>
        <div className='text-[#ff4343] cursor-pointer' onClick={deleteHandler}><DeleteRoundedIcon/></div>
      </div>
    </div>
  )
}

export default HistoryCard
