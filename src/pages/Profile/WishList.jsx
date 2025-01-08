/* eslint-disable react/prop-types */
import { TiTick } from 'react-icons/ti'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  fetchWishlist,
  removeItemFromWishlist
} from '../../store/shop/wishListSlice'
import { addToCart } from '../../store/shop/cartSlice'

const WishList = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.wishList)

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])

  const handleDeleteWishList = bookId => {
    dispatch(removeItemFromWishlist(bookId))
  }
  const handleAddToCart = book => {
    dispatch(addToCart({ productId: book?._id, quantity: 1 }))
  }

  console.log('Wishlist items', items?.books)

  const WishListItem = ({ book }) => {
    const { cart } = useSelector(state => state?.cart)
    const isInCart = cart.some(item => item.productId._id == book?._id)

    return (
      <div
        key={book?._id}
        className='flex h-fit flex-1 gap-2 md:gap-4 p-2 md:px-8 border-b border-b-primary bg-sky-50 py-2 shadow-xl'
      >
        {/* <input type='checkbox' className='w-5 cursor-pointer' /> */}
        <div className='flex items-center justify-center w-20 h-24 md:h-36 md:w-28'>
          <img
            src={book?.coverImage || 'https://via.placeholder.com/150x150'}
            className='h-full object-cover'
          />
        </div>
        <div>
          <h2 className='text-sm md:text-xl'>{book?.title}</h2>
          <span className='text-xs md:text-md text-black inline mr-1'>by</span>
          <p className='text-xs md:text-base text-primary cursor-pointer inline'>
            Ashwini Shankar
          </p>
          <div className='flex items-center gap-2 text-base'>
            <p className='text-xs md:text-md'>Category: </p>
            <p className='text-xs md:text-md text-primary cursor-pointer'>
              English Books
            </p>
          </div>
          <div className='flex flex-wrap sm:gap-2 items-center '>
            <div className='flex items-center gap-2'>
              <TiTick className='bg-green-500 text-white rounded-full text-base' />
              <p>In stock</p>
            </div>
            <p className='text-sm text-black'>(Only 4 copies available)</p>
          </div>
          <div
            onClick={() => handleDeleteWishList(book?._id)}
            className=' hidden sm:block gap-1 sm:gap-2 mt-2 items-center'
          >
            <FaRegTrashAlt className='text-sm md:text-3xl hover:text-red-500 hover:bg-red-200 rounded-md md:p-1.5 transition-all duration-200 cursor-pointer' />
          </div>
        </div>
        <div className='flex min-w-fit flex-col items-end sm:gap-1 mt-2 text-right  sm:ml-auto'>
          <p className='text-xs md:text-sm text-white bg-red-500 px-1 sm:px-2'>
            40% Off
          </p>
          <p className='text-lg md:text-xl font-semibold'>308 Tk</p>
          <p className='line-through text-gray-500'>500 Tk</p>
          <div className='flex gap-4 sm:gap-2 mt-2 items-center'>
            <FaRegTrashAlt className='text-sm md:text-3xl block sm:hidden hover:text-red-500 hover:bg-red-200 rounded-md md:p-1.5 transition-all duration-200 cursor-pointer' />
            {isInCart ? (
              <button className='flex items-center gap-1 rounded border px-2 sm:px-4 py-1 sm:py-2 bg-gray-400 transition-all duration-200  text-white '>
                Added
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(book)}
                className='flex items-center gap-1 rounded border px-2 sm:px-4 py-1 sm:py-2 border-sky-500 bg-sky-600 transition-all duration-200 hover:bg-sky-500 text-white '
              >
                <IoCartOutline className='text-lg sm:text-2xl' />
                <span className='hidden sm:block'>Add to Cart </span>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='bg-global_bg pt-28 md:pt-40 pb-8'>
      <div className='container'>
        <div className=''>
          <h1 className='text-center py-2 sm:py-4 sm:text-2xl sm:font-semibold bg-sky-100'>
            My Wish List
          </h1>
          <div className='flex flex-col'>
            {items?.books?.map(book => {
              return <WishListItem key={book.id} book={book} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishList
