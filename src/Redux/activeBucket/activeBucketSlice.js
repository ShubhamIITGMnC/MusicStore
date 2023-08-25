import { createSlice } from "@reduxjs/toolkit";

const initialState={
    activeBucket:null,
    cards:[],
    isLoading:false,
    error:""
}


const activeBucketSlice=createSlice({
    name:"activeBucket",
    initialState,
    reducers:{
        fetchactiveBucketLoading:(state)=>{
            state.isLoading=true;
        },
        fetchactiveBucketSuccess:(state,{payload})=>{
            state.isLoading=false;
            state.activeBucket=payload;
        },
        fetchactiveBucketFail:(state,{payload})=>{
            state.isLoading=false;
            state.error=payload;
        },
        fetchCards:(state,{payload})=>{
            state.cards=payload;
        }
    }

})

const {reducer,actions}=activeBucketSlice;

export const {fetchactiveBucketLoading,fetchactiveBucketSuccess,fetchactiveBucketFail,fetchCards}=actions;

export default reducer;