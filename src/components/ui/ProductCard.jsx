/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../store/shop/cartSlice'
import { addItemToWishlist } from '../../store/shop/wishListSlice'

const ProductCard = ({ book, rating = 4, className }) => {
  const dispatch = useDispatch()

  const handleAddToCart = event => {
    event.stopPropagation()
    dispatch(addToCart({ productId: book?._id, quantity: 1 }))
  }

  const handleAddToWishlist = () => {
    dispatch(addItemToWishlist(book._id))
  }

  const calculatePrice = () => {
    if (book?.discountPercentage > 0) {
      return (
        <p className='text-gray-900 text-lg font-semibold'>{`TK ${book?.discountPrice}`}</p>
      )
    }
    return (
      <p className='text-gray-900 text-lg font-semibold'>{`TK ${book?.price}`}</p>
    )
  }

  return (
    <div
      className={`bg-white rounded-md p-2 max-w-60 min-w-44 sm:w-52 border cursor-pointer group relative ${className}`}
    >
      <Link to={`/book/${book?._id}`}>
        <div className=' bg-sky-50 hover:shadow-md h-36 overflow-hidden relative'>
          <div className='flex justify-center h-full w-full '>
            <img
              className='h-full group-hover:scale-110 transition-all duration-300'
              src={
                book?.coverImage ||
                '../../../src/assets/taylor-heery-KPlmk0u5flA-unsplash.jpg'
              }
              alt='Product Image'
            />
          </div>
        </div>
        <div className=' bg-white'>
          <div className='h-20'>
            <h3 className='text-base my-2 line-clamp-2 text-ellipsis'>
              {book?.title}
            </h3>
            <h4 className='text-sm '>{book?.author.name}</h4>
          </div>
          <div>
            {/* Dynamic Rating */}
            <div className='flex items-center justify-center my-2 space-x-1'>
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={`h-3 w-3 ${
                    index < rating ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <div className='flex justify-between items-baseline'>
              {book?.discountPercentage > 0 ? (
                <div className='flex items-center gap-1'>
                  <p className='text-gray-500 text-sm line-through'>
                    {`TK ${book?.price}`}
                  </p>
                  <span className='bg-red-500 text-white text-xs px-1 rounded-sm mr-2'>
                    {`${book?.discountPercentage}%`}
                  </span>
                </div>
              ) : (
                <div className='flex items-center gap-1'>
                  <p className='text-gray-500 text-sm'>&nbsp;</p>
                </div>
              )}
              {calculatePrice()}
            </div>
          </div>
        </div>
      </Link>
      {/* Hover Buttons */}
      <div className='absolute top-[120px] w-[calc(100%-16px)] left-2 flex items-end justify-center  opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0px_-5px_60px_-5px_rgba(0,0,0,0.6)]'>
        <button
          onClick={handleAddToWishlist}
          className='p-2 bg-white w-full shadow-md hover:bg-red-500 hover:text-white transition-all'
          title='Add to Wishlist'
        >
          <FiHeart size={18} className='mx-auto' />
        </button>
        <button
          onClick={handleAddToCart}
          className='p-2 bg-white w-full shadow-md hover:bg-sky-500 hover:text-white transition-all'
          title='Add to Cart'
        >
          <FiShoppingCart size={18} className='mx-auto' />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
