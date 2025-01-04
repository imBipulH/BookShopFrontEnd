/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearSuggestions } from '../../../store/shop/searchSlice'
import { IoCartOutline } from 'react-icons/io5'
import { FiPlus } from 'react-icons/fi'
import { addToCart } from '../../../store/shop/cartSlice'

const Suggestions = ({ book }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector(state => state?.cart)

  const isInCart = cart.some(item => item.productId._id == book?._id)

  const handleSuggestionClick = ({ book }) => {
    dispatch(clearSuggestions())
    navigate(`/book/${book?._id}`)
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: book._id, quantity: 1 }))
  }

  return (
    <li
      key={book?._id}
      className='flex justify-between items-center px-1 hover:bg-gray-100'
    >
      <div
        className='flex items-center gap-2 px-4 py-2  cursor-pointer'
        onClick={() => handleSuggestionClick(book)}
      >
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className='w-12 h-12 rounded-md object-cover'
          />
        ) : (
          <span className='w-12 h-12 rounded-md bg-gray-400'></span>
        )}
        {book.title} - {book.authorName} - {book.publisherName} -{book.price} -{' '}
        {book?.discountPercentage}
      </div>

      {isInCart ? (
        <p className='text-sm md:text-base text-center min-w-16 py-2 md:py-2 md:min-w-[70px] rounded-md bg-gray-300 text-gray-600'>
          Added
        </p>
      ) : (
        <div
          onClick={handleAddToCart}
          className='flex items-center justify-center gap-0 min-w-16 md:min-w-[70px] py-2 md:px-2 hover:bg-sky-700 bg-sky-500 rounded-md text-white cursor-pointer'
        >
          <FiPlus className='text-sm md:text-xl' />
          <IoCartOutline className='text-xl md:text-3xl' />
        </div>
      )}
    </li>
  )
}

export default Suggestions
