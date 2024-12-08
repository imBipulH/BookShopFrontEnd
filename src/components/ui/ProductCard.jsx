/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const ProductCard = ({
  names = 'Product Name this is long name of the product',
  rating = 4,
  className
}) => {
  return (
    <Link to='/product'>
      <div
        className={`bg-white rounded-md p-2 max-w-60 sm:w-52 border cursor-pointer group relative ${className}`}
      >
        <div className=' bg-white h-36 overflow-hidden relative'>
          <div className='flex justify-center w-full bg-red-300'>
            <img
              className='h-full group-hover:scale-110 transition-all duration-300  object-cover'
              src='https://via.placeholder.com/200x200'
              alt='Product Image'
            />
          </div>
          {/* Hover Buttons */}
          <div className='absolute inset-0 flex items-end justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 via-transparent to-transparent'>
            <button
              className='p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all'
              title='Add to Wishlist'
            >
              <FiHeart size={18} />
            </button>
            <button
              className='p-2 bg-white rounded-full shadow-md hover:bg-sky-500 hover:text-white transition-all'
              title='Add to Cart'
            >
              <FiShoppingCart size={18} />
            </button>
          </div>
        </div>
        <div className=' bg-sky-50'>
          <div className='h-20'>
            <h3 className='text-base my-2 line-clamp-2 text-ellipsis'>
              {names}
            </h3>
            <h4 className='text-sm '>Robindranath Thakur</h4>
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
              <div className='flex items-center gap-1'>
                <p className='text-gray-500 text-sm line-through'>TK 650</p>
                <span className='bg-red-500 text-white text-xs px-1 rounded-sm mr-2'>
                  40%
                </span>{' '}
              </div>
              <p className='text-gray-900 text-lg font-semibold'>TK 450</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
