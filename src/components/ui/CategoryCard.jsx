/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const CategoryCard = ({ className, category }) => {
  console.log(category)

  return (
    <Link
      to='/category'
      className={`px-4 py-2  shadow-lg  bg-sky-50 embla__slide__category flex-none w-[24%] ${className} `}
    >
      <div className='min-w-fit'>
        <h2 className='mb-2 font-semibold text-xl'>
          {category?.category?.name}
        </h2>
        <div className='grid grid-cols-2 gap-2'>
          {category?.books.map(cat => (
            <div key={cat?._id} className='mb-2'>
              <div className='h-36 shadow-lg aspect-square flex justify-center'>
                <img
                  src={cat?.coverImage}
                  alt='Category Image'
                  className='object-cover'
                />
              </div>
              <h3 className='mt-1 text-xs md:text-md font-medium text-center'>
                {cat?.title}
              </h3>
            </div>
          ))}
        </div>
        <p className='text-center text-primary mt-2'>See more . . .</p>
      </div>
    </Link>
  )
}

export default CategoryCard
