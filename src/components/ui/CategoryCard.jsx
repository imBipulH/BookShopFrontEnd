/* eslint-disable react/prop-types */

import img from '../../../src/assets/photo.jpeg'
import img3 from '../../../src/assets/anjali-mehta-q7LqBzBG8rA-unsplash.jpg'
import img4 from '../../../src/assets/taylor-heery-KPlmk0u5flA-unsplash.jpg'
import img2 from '../../../src/assets/books-shelf-with-bookmark-arrangement.jpg'
import { Link } from 'react-router-dom'

const CategoryCard = ({ className, category }) => {
  return (
    <Link
      to='/category'
      className={`px-4 py-2  shadow-lg  bg-sky-50 embla__slide__category flex-none w-[24%] ${className} `}
    >
      <div className='min-w-fit'>
        <h2 className='mb-2 font-semibold text-xl'>{category}</h2>
        <div className='grid grid-cols-2 gap-2'>
          <div className='mb-2'>
            <div className='h-36 shadow-lg aspect-square flex justify-center'>
              <img src={img2} alt='Category Image' className='object-cover' />
            </div>
            <h3 className='mt-1 text-lg font-medium text-center'>
              Sub Category
            </h3>
          </div>
          <div className='mb-2'>
            <div className='h-36 shadow-lg aspect-square flex justify-center'>
              <img src={img} alt='Category Image' className='object-cover' />
            </div>
            <h3 className='mt-1 text-lg font-medium text-center'>
              Sub Category
            </h3>
          </div>
          <div>
            <div className='h-36 shadow-lg aspect-square flex justify-center'>
              <img src={img3} alt='Category Image' className='object-cover' />
            </div>
            <h3 className='mt-1 text-lg font-medium text-center'>
              Sub Category
            </h3>
          </div>
          <div>
            <div className='h-36 shadow-lg aspect-square flex justify-center'>
              <img src={img4} alt='Category Image' className='object-cover' />
            </div>
            <h3 className='mt-1 text-lg font-medium text-center'>
              Sub Category
            </h3>
          </div>
        </div>
        <p className='text-center text-primary mt-2'>See more . . .</p>
      </div>
    </Link>
  )
}

export default CategoryCard
