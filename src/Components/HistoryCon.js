import React from 'react'
import HistoryCard from './HistoryCard'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { clearAll } from '../Redux/history/historyAction';


function HistoryCon() {
    const dispatch=useDispatch();
    const {allHistory} = useSelector(store=>{return store.allHistory});
   
    const clearHandler =(e)=>{
        e.preventDefault();
        dispatch(clearAll());
    }
  return (
    <div className='mt-[72px] flex flex-col'>
      <div className='flex  justify-between px-[30px] border-gray-400 border-b-[2px] '>
        <div className='text-[20px] font-bold py-[10px]'>
            History
        </div>
        <div className='text-[20px] font-bold text-[#ff4343] hover:underline py-[10px] cursor-pointer' onClick={clearHandler}>
            Clear All
        </div>
      </div>
      <div className='flex flex-col gap-[10px] mt-[10px] pb-[10px]'>
        {
            allHistory.map((h)=>{
                return <HistoryCard key={h._id} history={h} allHistory={allHistory} />
            })
        }
        
      </div>
    </div>
  )
}

export default HistoryCon
