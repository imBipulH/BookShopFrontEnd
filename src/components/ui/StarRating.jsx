import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io'

/* eslint-disable react/prop-types */
export const StarRating = ({ rating, maxStars = 5 }) => {
  return (
    <div className='flex items-center'>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1
        if (rating >= starValue) {
          // Full Star
          return (
            <span key={index} className='text-yellow-500 text-2xl'>
              <IoMdStar />
            </span>
          )
        } else if (rating >= starValue - 0.5) {
          // Half Star
          return (
            <span key={index} className='text-yellow-500 text-2xl'>
              <IoMdStarHalf />
            </span>
          )
        } else {
          // Empty Star
          return (
            <span key={index} className='text-gray-300 text-2xl'>
              <IoMdStarOutline />
            </span>
          )
        }
      })}
    </div>
  )
}
