import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  item: [],
  status: null,
  errors: null
}
export const productFetch = createAsyncThunk("products/productFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://test-express-vercel-chi.vercel.app/product")
      return response?.data
    } catch (error) {
      return rejectWithValue("an error occurred")
    }
  }
)
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(productFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.payload
      });
  }

})

export default productSlice.reducer