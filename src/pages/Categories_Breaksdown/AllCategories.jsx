import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../store/shop/sidebarSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AllCategories = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const { categories } = useSelector(state => state?.sidebar)

  console.log(categories)

  return (
    <div className='bg-gray-100 relative py-4'>
      <div className='container'>
        <div className='gap-4 pt-24 md:pt-44'>
          <h1 className='text-center w-full md:text-3xl'>সকল বিষয়</h1>
          <ul className='grid grid-cols-2 px-2 md:flex flex-wrap gap-2 md:gap-4 mt-2 md:mt-8'>
            {categories.map(category => (
              <Link
                key={category?._id}
                to={`/category/categories/${category._id}`}
              >
                <li className='flex md:min-w-52 md:max-w-64 flex-col items-center border py-2 md:py-6 px-2 bg-white hover:bg-sky-200 cursor-pointer'>
                  <h2 className='text-base md:text-2xl line-clamp-1 text-ellipsis'>
                    {category?.name}
                  </h2>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AllCategories
