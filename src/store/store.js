import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './shop/bookSlice'
import cartReducer from './shop/cartSlice'
import sidebarReducer from './shop/sidebarSlice'
import authReducer from './shop/authSlice'
import addressReducer from './shop/addressSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    address: addressReducer
  }
})
