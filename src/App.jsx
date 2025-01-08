import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Home from './pages/Home/Home'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Category from './pages/Category/Category'
import Product_Details from './pages/Product-Details/Product_Details'
import Cart from './pages/Cart/Cart'
import WishList from './pages/Profile/WishList'
import Registration from './pages/auth/Registration'
import ForgetPassword from './pages/auth/ForgetPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import Layout from './components/Layouts/Layout'
import CheckoutPage from './pages/Cart/CheckOut'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { verifyLogin } from './store/shop/authSlice'
import CheckoutPage1 from './pages/Cart/Checkout[1]'
import Authors from './pages/Categories_Breaksdown/Authors'
import AllCategories from './pages/Categories_Breaksdown/AllCategories'
import Publishers from './pages/Categories_Breaksdown/Publishers'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyLogin())
  }, [dispatch])
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/ForgetPassword' element={<ForgetPassword />} />
        <Route path='/category/:type?/:id?' element={<Category />} />
        <Route path='/book/:bookId' element={<Product_Details />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wish-list' element={<WishList />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/checkout1' element={<CheckoutPage1 />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/allcategories' element={<AllCategories />} />
        <Route path='/publishers' element={<Publishers />} />
      </Routes>
    </Layout>
  )
}

export default App
