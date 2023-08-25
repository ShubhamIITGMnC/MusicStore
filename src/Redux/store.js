import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice"
import bucketReducer from "./buckets/bucketSlice"
import activeBucketReducer from "./activeBucket/activeBucketSlice";
import historyReducer from "./history/historySlice"
import loaderReducer from "./loader/loaderSlice"

const store=configureStore({
    reducer:{
        user:userSlice,
        buckets:bucketReducer,
        activeBucket:activeBucketReducer,
        allHistory:historyReducer,
        loader:loaderReducer
    }
})

export default store;