import {configureStore} from '@reduxjs/toolkit';//just a redux so need to create a store
import ItemsSlice from '../data/ItemsSlice';
import fetchStatusSlice from '../data/fetchStatusSlice';
import bagSlice from '../data/bagSlice';

const store = configureStore({
    reducer:{
        items:ItemsSlice,
        fetchStatus: fetchStatusSlice,
        bag:bagSlice,
    }
});

export default store;