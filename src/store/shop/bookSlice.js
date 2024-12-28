/* eslint-disable no-unused-vars */
// features/booksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Async thunk to fetch books from the API
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (filters, { rejectWithValue }) => {
    try {
      console.log(filters)

      const response = await axiosInstance.get(`books?${filters}`)
      return response.data
    } catch (error) {
      // Reject with error message
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)
// Async thunk to fetch a single book by ID
export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async bookId => {
    const response = await axiosInstance.get(`books/${bookId}`)
    return response.data.data
  }
)

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch all books
      .addCase(fetchBooks.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Fetch Book by ID
      .addCase(fetchBookById.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (!Array.isArray(state.books)) {
          state.books = []
        }
        const bookIndex = state?.books.findIndex(
          book => book._id === action.payload._id
        )
        if (bookIndex !== -1) {
          state.books[bookIndex] = action.payload
        } else {
          state.books.push(action.payload)
        }
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default booksSlice.reducer
