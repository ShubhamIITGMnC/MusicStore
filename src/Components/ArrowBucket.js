import React from 'react'
import { shiftCard } from '../Redux/buckets/bucketAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function ArrowBucket({bucket,card,currbucket,setArrow}) {
    const dispatch=useDispatch();
    const {cards} = useSelector(store=>{return store.activeBucket})
    const shiftHandler=(e)=>{
        e.preventDefault();
        dispatch(shiftCard({bucket,card,currbucket,cards,setArrow}));
    }
  return (
    <div className='w-[100%] py-[2px] cursor-pointer border-b-[1px] border-gray-400 hover:bg-white px-[3px]' onClick={shiftHandler}>
      {bucket.name}
    </div>
  )
}

export default ArrowBucket
