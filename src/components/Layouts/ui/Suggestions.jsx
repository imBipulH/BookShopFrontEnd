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

  const isInCart = cart.some(item => item?.productId?._id == book?._id)

  const handleSuggestionClick = book => {
    dispatch(clearSuggestions())
    navigate(`/book/${book?._id}`)
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: book._id, quantity: 1 }))
  }

  const calculatePrice = () => {
    if (book?.discountPercentage > 0) {
      return (
        <span className='text-gray-900 text-sm md:text-md font-semibold'>{`TK ${book?.discountPrice}`}</span>
      )
    }
    return (
      <span className='text-gray-900 text-sm md:text-md font-semibold'>{`TK ${book?.price}`}</span>
    )
  }

  return (
    <li
      key={book?._id}
      className='flex justify-between items-center px-1 hover:bg-gray-100'
    >
      <div
        className='flex w-full justify-between items-center gap-2 p-2  cursor-pointer'
        onClick={() => handleSuggestionClick(book)}
      >
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className='w-12 aspect-square rounded-md object-cover'
          />
        ) : (
          <span className='w-12 aspect-square rounded-md bg-gray-400'></span>
        )}
        <div className='flex justify-between items-center w-full'>
          <div className='flex flex-col'>
            <span> {book?.title}</span>
            <span className='text-sm text-start'>by {book?.author?.name} </span>
          </div>
          <div className='text-xs md:text-sm  min-w-fit'>
            {book?.discountPercentage > 0 && (
              <span className='line-through text-gray-400'>
                TK{book?.price}
              </span>
            )}{' '}
            {calculatePrice()}
          </div>
        </div>
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
