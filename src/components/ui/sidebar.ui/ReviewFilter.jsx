import { useState } from 'react'
import { LuFilterX } from 'react-icons/lu'

const ReviewFilter = () => {
  const [selectedReview, setSelectedReview] = useState(null)

  const reviews = [
    { id: 5, label: '5 Stars' },
    { id: 4, label: '4 Stars & Up' },
    { id: 3, label: '3 Stars & Up' },
    { id: 2, label: '2 Stars & Up' },
    { id: 1, label: '1 Star & Up' }
  ]

  const handleReset = () => {
    // Clear the selected rating
    setSelectedReview(null)
  }

  const handleReviewChange = review => {
    setSelectedReview(review.id === selectedReview ? null : review.id)
  }

  return (
    <div className='w-64 border-r px-4 py-6 border rounded-md bg-white'>
      <div className='flex items-center justify-between mb-1'>
        <h2 className='text-lg font-bold mb-2'>Ratings</h2>
        <button
          className='mb-1 px-4 py-2 rounded hover:bg-sky-100 transition'
          onClick={handleReset}
        >
          <LuFilterX className='text-xl' />
        </button>
      </div>
      <p className='h-[1px] w-full bg-sky-300 mb-3'></p>
      <ul className='space-y-2'>
        {reviews.map(review => (
          <li key={review.id}>
            <label className='flex items-center space-x-2 px-1 cursor-pointer border border-transparent hover:border-sky-300'>
              <input
                type='radio'
                name='review'
                className='form-radio h-3 w-3'
                checked={selectedReview === review.id}
                onChange={() => handleReviewChange(review)}
              />
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns='http://www.w3.org/2000/svg'
                  fill={i < review.id ? 'currentColor' : 'none'}
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className={`w-6 h-6 ${
                    i < review.id ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                  />
                </svg>
              ))}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReviewFilter
