import { useDispatch, useSelector } from 'react-redux'
import { fetchPublishers } from '../../store/shop/sidebarSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Publishers = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPublishers())
  }, [dispatch])

  const { publishers } = useSelector(state => state?.sidebar)

  console.log(publishers)

  return (
    <div className='bg-gray-100 relative py-4'>
      <div className='container'>
        <div className='gap-4 pt-24 md:pt-44'>
          <h1 className='text-center w-full md:text-3xl'>সকল প্রকাশনী</h1>
          <ul className='grid grid-cols-2 px-2 md:flex flex-wrap gap-2 md:gap-4 mt-2 md:mt-8'>
            {publishers.map(publisher => (
              <Link
                key={publisher._id}
                to={`/category/publishers/${publisher._id}`}
              >
                <li className='flex md:min-w-52 md:max-w-64 flex-col items-center border py-2 md:py-6 px-2 bg-white hover:bg-sky-200 cursor-pointer'>
                  <h2 className='text-base md:text-2xl line-clamp-1 text-ellipsis'>
                    {publisher?.name}
                  </h2>
                  <p className='text-sm mt-2 md:text-base'>{`${publisher?.descriptions}`}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Publishers
