import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async Thunk for fetching search suggestions
export const fetchSearchSuggestions = createAsyncThunk(
  'search/fetchSuggestions',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`books/search?query=${query}`)
      console.log('Query:', query, 'response:', response)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    suggestions: [],
    loading: false,
    error: null
  },
  reducers: {
    clearSuggestions (state) {
      state.suggestions = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchSuggestions.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearchSuggestions.fulfilled, (state, action) => {
        state.loading = false
        state.suggestions = action.payload
      })
      .addCase(fetchSearchSuggestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
  }
})

export const { clearSuggestions } = searchSlice.actions
export default searchSlice.reducer
