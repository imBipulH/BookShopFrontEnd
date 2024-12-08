import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Home from './pages/Home/Home'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Category from './pages/Category/Category'
import Product_Details from './pages/Product-Details/Product_Details'
import Cart from './pages/Cart/Cart'
import WishList from './pages/Profile/WishList'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/category' element={<Category />} />
      <Route path='/product' element={<Product_Details />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/wish-list' element={<WishList />} />
    </Routes>
  )
}

export default App
