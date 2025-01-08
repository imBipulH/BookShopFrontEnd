// addressSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance' // Custom axios instance

// Thunk to Create Address
export const createAddress = createAsyncThunk(
  'address/createAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('address', addressData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Thunk to Get All Addresses
export const getAddresses = createAsyncThunk(
  'address/getAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('address')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Thunk to Delete Address
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`address/${addressId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Initial State
const initialState = {
  addresses: [],
  loading: false,
  error: null,
  success: false
}

// Address Slice
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
    clearSuccess: state => {
      state.success = false
    }
  },
  extraReducers: builder => {
    // Create Address
    builder.addCase(createAddress.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.addresses.push(action.payload) // Add the new address
    })
    builder.addCase(createAddress.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    // Get All Addresses
    builder.addCase(getAddresses.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      state.loading = false
      state.addresses = action.payload // Set the addresses
    })
    builder.addCase(getAddresses.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    // Delete Address
    builder.addCase(deleteAddress.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.addresses = state.addresses.filter(
        address => address._id !== action.meta.arg
      ) // Remove the deleted address
    })
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

// Export Actions
export const { clearError, clearSuccess } = addressSlice.actions

// Export Reducer
export default addressSlice.reducer

// Selectors
export const selectAddresses = state => state.address.addresses
export const selectAddressLoading = state => state.address.loading
export const selectAddressError = state => state.address.error
export const selectAddressSuccess = state => state.address.success
