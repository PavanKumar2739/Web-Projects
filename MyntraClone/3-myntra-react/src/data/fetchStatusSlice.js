import {  createSlice } from "@reduxjs/toolkit";


const initialState = {
    fetchDone : false, //false : pending, true : done
    currentlyFetching : false,
}
//track if the fetching is done or not to use onload on the main page 
const fetchStatusSlice = createSlice({
    name : 'fetchStatus',
    initialState,
    reducers:{
        markFetchDone : (state)=>{
             state.fetchDone = true;
        },
        markIsFetching : (state)=>{
            state.currentlyFetching = true;
        },
        markIsFetchingFinished : (state,action)=>{
            state.currentlyFetching = false;
        },

    }
});

export const {markFetchDone,markIsFetching,markIsFetchingFinished} = fetchStatusSlice.actions;

export default fetchStatusSlice.reducer;

