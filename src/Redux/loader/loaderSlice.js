import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loader: false,
    isLoading: false,
    error: ""
}
const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        fetchloaderLoading: (state) => {
            state.isLoading = true;
        },
        fetchloaderSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.loader = payload;
        },
        fetchloaderFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }

})

const { reducer, actions } = loaderSlice;

export const { fetchloaderLoading, fetchloaderSuccess, fetchloaderFail } = actions;

export default reducer;