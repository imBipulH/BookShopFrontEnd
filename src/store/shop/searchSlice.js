import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import Fuse from 'fuse.js'

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
let fuseInstance = null

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    suggestions: [],
    fuseResults: [],
    allBooks: [],
    loading: false,
    error: null
  },
  reducers: {
    clearSuggestions (state) {
      state.suggestions = []
      state.fuseResults = []
      state.error = null
    },
    initializeFuse (state, action) {
      const books = action.payload.data
      const options = {
        keys: ['title', 'author.name', 'isbn', 'category.name'],
        threshold: 0.4,
        distance: 100
      }
      fuseInstance = new Fuse(books, options)
    },
    performFuseSearch (state, action) {
      const { query } = action.payload
      if (fuseInstance) {
        const results = fuseInstance.search(query).map(result => result.item)
        state.fuseResults = results
      }
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

export const { clearSuggestions, initializeFuse, performFuseSearch } =
  searchSlice.actions
export default searchSlice.reducer
