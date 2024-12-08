/* eslint-disable react/prop-types */
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export const LeftArrow = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 bg-transparent/10 hover:bg-gray-300 text-white py-8 px-3 ${className}`}
  >
    <FaChevronLeft className='text-2xl' />
  </button>
)

export const RightArrow = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 right-0 bg-transparent/10 hover:bg-gray-300 text-white py-8 px-3 ${className}`}
  >
    <FaChevronRight className='text-2xl' />
  </button>
)
