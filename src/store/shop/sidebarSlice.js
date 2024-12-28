import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Thunks to fetch sidebar data
export const fetchCategories = createAsyncThunk(
  'sidebar/fetchCategories',
  async () => {
    const response = await axiosInstance.get('categories')
    return response.data
  }
)

export const fetchAuthors = createAsyncThunk(
  'sidebar/fetchAuthors',
  async () => {
    const response = await axiosInstance.get('author')
    return response.data
  }
)

export const fetchPublishers = createAsyncThunk(
  'sidebar/fetchPublishers',
  async () => {
    const response = await axiosInstance.get('publisher')
    return response.data
  }
)

export const fetchLanguages = createAsyncThunk(
  'sidebar/fetchLanguages',
  async () => {
    const response = await axiosInstance.get('languages')
    return response.data
  }
)

// Sidebar slice
const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    categories: [],
    authors: [],
    publishers: [],
    languages: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle Categories
      .addCase(fetchCategories.pending, state => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Handle Authors
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authors = action.payload
      })
      // Handle Publishers
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.publishers = action.payload
      })
      // Handle Languages
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languages = action.payload
      })
  }
})

export default sidebarSlice.reducer
