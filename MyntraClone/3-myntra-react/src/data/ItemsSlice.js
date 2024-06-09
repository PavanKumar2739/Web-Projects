import {  createSlice } from "@reduxjs/toolkit";
import { defaultitems } from "./items";

const initialState = {
    items : [],
}
const ItemsSlice = createSlice({
    name : 'items',
    initialState,
    reducers:{
        addInitialItems : (state,action)=>{
            console.log(action)
             state.items = action.payload;
        }
    }
});

export const {addInitialItems} = ItemsSlice.actions;

export default ItemsSlice.reducer;

