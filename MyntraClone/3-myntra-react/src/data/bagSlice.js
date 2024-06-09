import { createSlice } from "@reduxjs/toolkit"

const initialState={
    bagList :[]
}
const bagSlice = createSlice({
    name:'bag',
    initialState,
    reducers:{
        addToBag:(state,action)=>{
           state.bagList.push(action.payload);
        },
        removeFromBag:(state,action)=>{
            state.bagList= state.bagList.filter(id=>id !== action.payload);
         }
    }
    
});

export const {addToBag,removeFromBag} = bagSlice.actions;

export default bagSlice.reducer;