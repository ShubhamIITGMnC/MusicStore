import showToast from "../../showToast";
import { fetchactiveBucketFail,fetchactiveBucketLoading,fetchactiveBucketSuccess,fetchCards } from "./activeBucketSlice";
import { setLoader } from "../loader/loaderAction";

export const setActiveBucket = ({activeBucket})=>async (dispatch)=>{
    try{
        dispatch(setLoader(true));
        dispatch(fetchactiveBucketLoading());
        dispatch(fetchactiveBucketSuccess(activeBucket));
        let result=await fetch(`${process.env.REACT_APP_BASE_URL}/api/getAllcard/${activeBucket._id}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json();
        if(result.success)
        {
            dispatch(fetchCards(result.cards));
        }
        dispatch(setLoader(false));
    }catch(error){
        console.log(error.message);
        dispatch(fetchactiveBucketFail());
    }
}


export const deleteCard = ({card,cards})=>async (dispatch)=>{
    try{
        dispatch(setLoader(true));
        let result=await fetch(`${process.env.REACT_APP_BASE_URL}/api/deleteCard/${card._id}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json();
        if(result.success)
        {
            const ncards=[...cards];
            for(let i=0;i<ncards.length;i++)
            {
                if(ncards[i]._id===card._id)
                {
                    ncards.splice(i,1);
                    break;
                }
            }
            dispatch(fetchCards(ncards));
            showToast({
                msg:"Successfully deleted",
                type:"success"
            });
        }
        dispatch(setLoader(false));
    }catch(error){
        console.log(error.message);
        dispatch(fetchactiveBucketFail());
    }
}


export const createCard = ({data,cards,setAdd})=>async (dispatch)=>{
    try{
        dispatch(setLoader(true));
        let result=await fetch(`${process.env.REACT_APP_BASE_URL}/api/createCard`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        result = await result.json();
        if(result.success)
        {
            let ncards=[...cards,result.card];
            dispatch(fetchCards(ncards));
            showToast({
                msg:"Successfully added",
                type:"success"
            });
            setAdd(false);
        }
        dispatch(setLoader(false));
    }catch(error){
        console.log(error.message);
        dispatch(fetchactiveBucketFail());
    }
}

export const updataCard = ({data,cards,card,setEdit})=>async (dispatch)=>{
    try{
        dispatch(setLoader(true));
        let result=await fetch(`${process.env.REACT_APP_BASE_URL}/api/updateCard/${card._id}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        result = await result.json();
        
        if(result.success)
        {
            let ncards=[...cards];
            for(let i=0;i<ncards.length;i++)
            {
                if(ncards[i]._id===card._id)
                {
                    ncards[i]=result.card;
                    break;
                }
            }
            showToast({
                msg:"Successfully updated",
                type:"success"
            });
            setEdit(false);
            dispatch(fetchCards(ncards));
        }
        dispatch(setLoader(false));
    }catch(error){
        console.log(error.message);
        dispatch(fetchactiveBucketFail());
    }
}

