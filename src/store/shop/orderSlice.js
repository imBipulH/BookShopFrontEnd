import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('order/create', orderData, {
        withCredentials: true
      })
      console.log('Order Response: ', response)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('order/my-order', {
        withCredentials: true
      })
      console.log('Order Response: ', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null
  },
  reducers: {
    resetOrderState: state => {
      state.order = null
      state.loading = false
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        console.log(action.payload)
        // state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getOrder.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { resetOrderState } = orderSlice.actions

export default orderSlice.reducer
