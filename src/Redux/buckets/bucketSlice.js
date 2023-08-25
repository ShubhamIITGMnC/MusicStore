import { createSlice } from "@reduxjs/toolkit";

const initialState={
    buckets:[],
    isLoading:false,
    error:""
}


const bucketSlice=createSlice({
    name:"buckets",
    initialState,
    reducers:{
        fetchBucketsLoading:(state)=>{
            state.isLoading=true;
        },
        fetchBucketsSuccess:(state,{payload})=>{
            state.isLoading=false;
            state.buckets=payload;
        },
        fetchBucketsFail:(state,{payload})=>{
            state.isLoading=false;
            state.error=payload
        }
    }

})

const {reducer,actions}=bucketSlice;

export const {fetchBucketsLoading,fetchBucketsSuccess,fetchBucketsFail}=actions;

export default reducer;