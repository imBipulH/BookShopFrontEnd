/* eslint-disable react/prop-types */
import { useState } from 'react'
import Table from './Table'

const demoData = [
  {
    title: 'ছোটদের জায়নামায',
    author: 'মাওলানা জুবায়ের হুসাইন ফয়জী',
    publisher: 'মাকতাবাতুল ফুরকান',
    isbn: '9789849492931',
    edition: '1st Published, 2020',
    numberOfPages: 48,
    country: 'বাংলাদেশ',
    language: 'বাংলা'
  }
  // Add more data items here
]

const TabButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={` w-fit text-center px-6 py-2 rounded-t-lg ${
        isActive
          ? 'bg-white font-semibold border-primary  border-t-4 border-x-2 bg-gradient-to-b from-sky-200 to-transparent'
          : 'hover:border-sky3 border border-transparent border-b-1 border-b-sky-300'
      }`}
    >
      {label}
    </button>
  )
}

const TabButtonTwo = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`w-fit py-2 px-6 text-center rounded-t-lg ${
        isActive
          ? 'bg-white font-semibold border-primary  border-t-4 border-x-2 bg-gradient-to-b from-sky-100 to-transparent'
          : 'hover:border-sky3 border border-transparent border-b-1 border-b-sky-300'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

const TabButtons = () => {
  const [activeTab, setActiveTab] = useState('summary')
  const [activeAccordion, setActiveAccordion] = useState('review')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0) // For hover effect
  const [question, setQuestion] = useState('')

  const handleReviewSubmit = () => {
    if (review.trim() && rating > 0) {
      alert(`Review Submitted: \nRating: ${rating} stars\nReview: ${review}`)
      setReview('')
      setRating(0)
    } else {
      alert('Please provide both a rating and a written review.')
    }
  }

  const handleQuestionSubmit = () => {
    if (question.trim()) {
      alert(`Question Posted: ${question}`)
      setQuestion('')
    }
  }

  return (
    <div className='flex justify-between bg-white mt-8 gap-8'>
      {/* Left Column: Accordion */}
      <div className='w-full border-gray-300 rounded-md'>
        <div className='flex justify-start'>
          <TabButton
            label='Summary'
            isActive={activeTab === 'summary'}
            onClick={() => setActiveTab('summary')}
          />
          <TabButton
            label='Specification'
            isActive={activeTab === 'specification'}
            onClick={() => setActiveTab('specification')}
          />
          <TabButton
            label='Author'
            isActive={activeTab === 'author'}
            onClick={() => setActiveTab('author')}
          />
          <p className='flex-1 border-b border-b-primary'></p>
        </div>
        <div className='p-4 h-full max-h-80 overflow-y-auto '>
          {activeTab === 'summary' && (
            <ul className='list-disc list-inside py-4 text-gray-700'>
              <li>ব্যাকরণগত চিত্র বিষয়ক সংক্ষিপ্ত বর্ণনা।</li>
              <li>প্রয়োজনীয় সকল তথ্যাবলি।</li>
              <li>নিম্নস্তর থেকে টপিকগুলো শিক্ষণ-কৌশল।</li>
              <li>টপিক ভিত্তিক গুরুত্বপূর্ণ প্রশ্ন ও সমাধান।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
              <li>বিশেষ ছাত্রছাত্রীদের আরও সহজ বিষয়বস্তু।</li>
            </ul>
          )}
          {activeTab === 'specification' && <Table data={demoData} />}
          {activeTab === 'author' && (
            <p>Author details will be displayed here.</p>
          )}
        </div>
      </div>

      {/* Right Column: Accordion */}
      <div className='w-full rounded-md'>
        {/* Write a Review Accordion */}
        <div>
          <div className='flex justify-start'>
            <TabButtonTwo
              label='Write a Review'
              onClick={() => setActiveAccordion('review')}
              isActive={activeAccordion === 'review'}
            />
            <TabButtonTwo
              label='Ask a Question'
              onClick={() => setActiveAccordion('question')}
              isActive={activeAccordion === 'question'}
            />
            <p className='flex-1 border-b border-b-primary'></p>
          </div>
          {activeAccordion === 'review' && (
            <div className='p-4'>
              {/* <h2 className='text-base font-semibold mb-2'>
                Please review this product
              </h2> */}
              {/* Rating Section */}
              <div className='mb-4'>
                <p className='text-gray-700'>Rate this product</p>
                <div className='flex items-center gap-8'>
                  <div className='flex items-center space-x-1'>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`text-3xl ${
                          (hoverRating || rating) >= star
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className='text-sm text-gray-600 mt-1'>
                      You rated: {rating} star(s)
                    </p>
                  )}
                </div>{' '}
              </div>
              {/* Review Textarea */}
              <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                rows='4'
                className='w-full border border-gray-300 outline-none rounded-md p-2 focus:ring focus:ring-blue-200'
                placeholder='Write your review here...'
              ></textarea>
              <button
                onClick={handleReviewSubmit}
                className='mt-2 bg-btnBg text-white py-2 px-4 rounded transition-all hover:bg-sky-500'
              >
                Submit Review
              </button>
            </div>
          )}
        </div>

        {/* Ask a Question Accordion */}
        <div>
          {activeAccordion === 'question' && (
            <div className='p-4'>
              <h2 className='text-lg font-semibold mb-2'>Ask a Question</h2>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                rows='4'
                className='w-full border border-gray-300 outline-none rounded-md p-2 focus:ring focus:ring-green-200'
                placeholder='Post your question here...'
              ></textarea>
              <button
                onClick={handleQuestionSubmit}
                className='mt-2 bg-green-500 text-white py-2 px-4 rounded transition-all hover:bg-green-600'
              >
                Post Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TabButtons
