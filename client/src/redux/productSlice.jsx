import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await axios.get('https://mobile-website-plj8.onrender.com/api/products');
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;