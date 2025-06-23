import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../authSlice';

const stores = configureStore({
    reducer: {
        auth: authSliceReducer
    }
})

export default stores;