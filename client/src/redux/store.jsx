import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});
