import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

export const fetchWishlist = createAsyncThunk(
  'wishList/fetchWishlist',
  async () => {
    try {
      const response = await axiosInstance.get('wishlist')
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }
)

export const addItemToWishlist = createAsyncThunk(
  'wishList/addItemToWishlist',
  async bookId => {
    try {
      const response = await axiosInstance.post('wishlist/add', { bookId })

      return response.data
    } catch (error) {
      console.error('Error adding item to wishlist:', error)
    }
  }
)

export const removeItemFromWishlist = createAsyncThunk(
  'wishList/removeItemFromWishlist',
  async bookId => {
    try {
      const response = await axiosInstance.post('wishlist/remove', { bookId })
      return response.data
    } catch (error) {
      console.error('Error removing item from wishlist:', error)
    }
  }
)

const wishListSlice = createSlice({
  name: 'wishList',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWishlist.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        console.log(action.payload)

        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        console.log(action.payload)

        state.items = action.payload
      })
  }
})

export default wishListSlice.reducer
