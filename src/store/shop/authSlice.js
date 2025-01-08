import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`register`, userData)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`login`, credentials)
      console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Token verification for loginUser
export const verifyLogin = createAsyncThunk(
  'auth/verifyLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('verify')
      return response.data // Contains user data
    } catch (error) {
      return rejectWithValue(error.response.data || 'Verification failed')
    }
  }
)

// Verify Email
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `verify-email`,
        verificationData
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Initial State
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false
}

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null
      state.token = null
      state.success = false
      localStorage.removeItem('token')
    }
  },
  extraReducers: builder => {
    // Register User
    builder.addCase(registerUser.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(registerUser.fulfilled, state => {
      state.loading = false
      state.success = true
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    // Login User
    builder.addCase(loginUser.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.success = true
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    // Verify Login
    builder.addCase(verifyLogin.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(verifyLogin.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user.user // Set user from response
    })
    builder.addCase(verifyLogin.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.user = null // Clear user on failed verification
    })

    // Verify Email
    builder.addCase(verifyEmail.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(verifyEmail.fulfilled, state => {
      state.loading = false
      state.success = true
    })
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

// Export Actions
export const { logout } = authSlice.actions

// Export Reducer
export default authSlice.reducer

// Selectors
export const selectAuth = state => state?.auth
export const selectUser = state => state?.auth?.user?.user
export const selectToken = state => state.auth.token
export const selectAuthLoading = state => state?.auth?.loading
// export const selectAuthLoading = state => console.log(state.auth)
export const selectAuthError = state => state.auth.error
export const selectAuthSuccess = state => state.auth.success
