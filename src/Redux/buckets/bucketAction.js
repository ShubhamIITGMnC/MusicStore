import { fetchBucketsFail, fetchBucketsSuccess, fetchBucketsLoading } from "./bucketSlice";
import { fetchCards ,fetchactiveBucketSuccess} from "../activeBucket/activeBucketSlice";
import { setLoader } from "../loader/loaderAction";
import showToast from "../../showToast";


export const fetchBuckets = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        dispatch(fetchBucketsLoading());
        let result = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bucket/getAllBuckets`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
        result = await result.json();
        if (result.success) {
            dispatch(fetchBucketsSuccess(result.buckets));
        }
        dispatch(setLoader(false));
    } catch (error) {
        dispatch(fetchBucketsFail(error.message));
    }
}

export const addBucket = ({ data, Buckets, setNewcat }) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        let result = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bucket/create`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
        result = await result.json();
        if (result.success) {
            setNewcat("");
            let newAllBuckets = [...Buckets, result.bucket]
            dispatch(fetchBucketsSuccess(newAllBuckets))
            showToast({
                msg:"Successfully added",
                type:"success"
            });
        }
        dispatch(setLoader(false));
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBucket = ({ b, Buckets ,cards,activeBucket}) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        let result = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bucket/deleteBucket/${b._id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        })
        result = await result.json();
        if (result.success) {
            if(activeBucket!==null)
            {
                if(activeBucket._id===b._id)
                {
                    dispatch(fetchCards([]));
                    dispatch(fetchactiveBucketSuccess(null))
                }
            }
            let newAllBuckets = [...Buckets];
            for (let i = 0; i < newAllBuckets.length; i++) {
                if (newAllBuckets[i]._id === b._id) {
                    newAllBuckets.splice(i, 1);
                    break;
                }
            }
            showToast({
                msg:"Successfully deleted",
                type:"success"
            });
            dispatch(fetchBucketsSuccess(newAllBuckets));
        }
        dispatch(setLoader(false));
    } catch (error) {
        console.log(error.message);
    }
}

export const updateBucket = ({ b, Buckets, data }) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        let result = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bucket/updateBucket/${b._id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
        result = await result.json();
        if (result.success) {
            let newAllBuckets = [...Buckets];
            for (let i = 0; i < newAllBuckets.length; i++) {
                if (newAllBuckets[i]._id === b._id) {
                    newAllBuckets[i] = result.bucket;
                    break;
                }
            }
            dispatch(fetchBucketsSuccess(newAllBuckets));
            showToast({
                msg:"Successfully updated",
                type:"success"
            });
        }
        dispatch(setLoader(false));
    } catch (error) {
        console.log(error.message);
    }
}

export const shiftCard = ({ bucket, currbucket, card, cards ,setArrow}) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        if(currbucket._id===bucket._id) 
        {
            dispatch(setLoader(false));
            return ;
        }
        const data = {
            name: card.name,
            url: card.url,
            bucketId: bucket._id
        }
        let result = await fetch(`${process.env.REACT_APP_BASE_URL}/api/updateCard/${card._id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        result = await result.json();
        if (result.success) {
            let nc = [...cards];
            for (let i = 0; i < nc.length; i++) {
                if (nc[i]._id === card._id) {
                    nc.splice(i, 1);
                    break;
                }
            }
            setArrow(false);
            dispatch(fetchCards(nc));
            showToast({
                msg:"Successfully shifted",
                type:"success"
            });
        }
        dispatch(setLoader(false));
    } catch (error) {
        console.log(error.message);
    }
}