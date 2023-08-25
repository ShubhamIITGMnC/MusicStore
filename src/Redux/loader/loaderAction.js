import { fetchloaderSuccess } from "./loaderSlice";


export const setLoader=(flag)=>(dispatch)=>{
    try{
        dispatch(fetchloaderSuccess(flag))
    }catch(error)
    {
        console.log(error.message);
    }
}