/* eslint-disable react/prop-types */
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export const LeftArrow = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-black/30 hover:from-black/50 to-transparent text-white px-2 py-4 rounded-lg shadow-lg hover:scale-110 hover:shadow-xl focus:outline-none transition-transform duration-300 ${className}`}
  >
    <FaChevronLeft className='text-3xl' />
  </button>
)

export const RightArrow = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 right-0 bg-gradient-to-l from-black/30 hover:from-black/50 to-black/10 text-white px-2 py-4 rounded-lg shadow-lg hover:scale-110 hover:shadow-xl focus:outline-none  transition-transform duration-300 ${className}`}
  >
    <FaChevronRight className='text-3xl' />
  </button>
)
