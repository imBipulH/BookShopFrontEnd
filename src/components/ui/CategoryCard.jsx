/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom'

const CategoryCard = ({ className, category }) => {
  const navigate = useNavigate()

  const handleCategoryClick = () => {
    navigate(`/books/categories/${category?.category?._id}`)
  }

  return (
    <div
      className={` md:px-4 py-2 shadow-lg bg-sky-50 embla__slide__category flex flex-col justify-between md:flex-none  ${className}  h-full `}
    >
      <div className='w-full '>
        <h2
          onClick={handleCategoryClick}
          className='mb-2 font-semibold text-xl cursor-pointer'
        >
          {category?.category?.name}
        </h2>
        <div className='grid grid-cols-2 gap-2'>
          {category?.books.map(cat => (
            <Link to={`/book/${cat?._id}`} key={cat?._id} className='mb-2'>
              <div className='h-36 shadow-lg aspect-square flex justify-center'>
                <img
                  src={cat?.coverImage}
                  alt='Category Image'
                  className='object-cover'
                />
              </div>
              <h3 className='mt-1 max-w-[150px] text-xs md:text-md font-medium text-center line-clamp-1 text-ellipsis '>
                {cat?.title}
              </h3>
            </Link>
          ))}
        </div>{' '}
      </div>
      <p
        onClick={handleCategoryClick}
        className='text-center text-primary mt-2 cursor-pointer'
      >
        See more . . .
      </p>
    </div>
  )
}

export default CategoryCard
