import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthors } from '../../store/shop/sidebarSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Authors = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthors())
  }, [dispatch])

  const { authors } = useSelector(state => state?.sidebar)

  return (
    <div className='bg-gray-100 relative py-4'>
      <div className='container'>
        <div className='gap-4 pt-24 md:pt-44'>
          <h1 className='text-center w-full md:text-3xl'>সকল লেখকগণ</h1>
          <ul className='grid grid-cols-2 px-2 md:flex flex-wrap gap-2 md:gap-4 mt-2 md:mt-8'>
            {authors.map(author => (
              <Link key={author?._id} to={`/books/authors/${author._id}`}>
                <li className='flex md:min-w-52 md:max-w-64 flex-col items-center border py-2 md:py-6 px-2 bg-white hover:bg-sky-200 cursor-pointer'>
                  <img
                    src={author?.image || '../../../src/assets/photo.jpeg'}
                    alt={author?.name}
                    className='w-16 md:w-24 aspect-square rounded-full object-cover'
                  />
                  <h2 className='text-base md:text-2xl mt-4 line-clamp-1 text-ellipsis'>
                    {author?.name}
                  </h2>
                  <p className='text-sm md:text-base'>{`${author?.follower} followers`}</p>
                  <button className='bg-sky-500 hover:bg-sky-700 text-white px-2 md:px-4 md:py-2 my-2 rounded-sm'>
                    Follow
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Authors
