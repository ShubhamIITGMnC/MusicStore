import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allHistory: [],
    isLoading: false,
    error: ""
}


const allHistorySlice = createSlice({
    name: "allHistory",
    initialState,
    reducers: {
        fetchallHistoryLoading: (state) => {
            state.isLoading = true;
        },
        fetchallHistorySuccess: (state, { payload }) => {
            state.isLoading = false;
            payload.sort((x, y) => {
                return new Date(x.createdAt) < new Date(y.createdAt) ? 1 : -1
            })
            state.allHistory = payload;
        },
        fetchallHistoryFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }

})

const { reducer, actions } = allHistorySlice;

export const { fetchallHistoryLoading, fetchallHistorySuccess, fetchallHistoryFail } = actions;

export default reducer;