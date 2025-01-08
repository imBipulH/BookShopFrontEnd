// features/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async thunk to fetch cart items
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axiosInstance.get('cart')
  return response.data // Assuming `data` contains the cart object
})

// Async thunk to add an item to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('cart', {
        productId,
        quantity
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add to cart'
      )
    }
  }
)

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`cart/update`, {
        productId,
        quantity
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update cart item quantity'
      )
    }
  }
)

// Update item selection
export const updateItemSelection = createAsyncThunk(
  'cart/updateItemSelection',
  async ({ productId, selected }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('cart/select-item', {
        productId,
        selected
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Update all items selection
export const updateAllSelection = createAsyncThunk(
  'cart/updateAllSelection',
  async ({ selected }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('cart/select-all', { selected })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`cart/${productId}`)
      dispatch(fetchCart()) // Refresh cart data
      return response.data.cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete cart item'
      )
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Cart items
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null // For potential errors
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cart = action.payload?.items || []
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Add to Cart
      .addCase(addToCart.pending, state => {
        state.status = 'loading'
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cart = action.payload.items // Update the cart with the backend response
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload // Store the error message
      })

      // Update the Cart
      .addCase(updateCartItemQuantity.pending, state => {
        state.isLoading = true
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = action.payload.items
      })
      .addCase(updateCartItemQuantity.rejected, state => {
        state.isLoading = false
        state.cart = []
      })

      // Delete Item
      .addCase(deleteCartItem.pending, state => {
        state.status = 'loading'
      })
      .addCase(deleteCartItem.fulfilled, state => {
        state.status = 'succeeded'
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      // Selections of items
      .addCase(updateItemSelection.fulfilled, (state, action) => {
        console.log('state', state, 'action', action)

        state.cart = action.payload.items // Update cart with the new data
      })
      .addCase(updateAllSelection.fulfilled, (state, action) => {
        state.cart = action.payload.items // Update cart with the new data
      })
  }
})

export default cartSlice.reducer
