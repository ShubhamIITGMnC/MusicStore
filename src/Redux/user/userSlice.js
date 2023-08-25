import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isLoading:false,
    error:""
}


const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        fetchUserLoading:(state)=>{
            state.isLoading=true;
        },
        fetchUserSuccess:(state,{payload})=>{
            state.isLoading=false;
            state.user=payload;
        },
        fetchUserFail:(state,{payload})=>{
            state.isLoading=false;
            state.error=payload
        }
    }

})

const {reducer,actions}=userSlice;

export const {fetchUserLoading,fetchUserSuccess,fetchUserFail}=actions;

export default reducer;