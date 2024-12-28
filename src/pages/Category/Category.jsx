import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import ProductCard from '../../components/ui/ProductCard'
import ReviewFilter from '../../components/ui/sidebar.ui/ReviewFilter'
import SelectFilter from '../../components/ui/sidebar.ui/SelectFilter'
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs'
import { LuListFilter } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../../store/shop/bookSlice'
import {
  fetchAuthors,
  fetchCategories,
  fetchPublishers
} from '../../store/shop/sidebarSlice'
import { languages } from '../../components/Data'

const Category = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const dispatch = useDispatch()
  const { books } = useSelector(state => state.books)
  const { categories, authors, publishers } = useSelector(
    state => state.sidebar
  )

  const [filters, setFilters] = useState(() => {
    return (
      JSON.parse(sessionStorage.getItem('filters')) || {
        categories: [],
        authors: [],
        publishers: [],
        languages: [],
        sort: null,
        sortOrder: null
      }
    )
  })

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchAuthors())
    dispatch(fetchPublishers())
    dispatch(fetchBooks())
  }, [dispatch])

  const handleSort = event => {
    event.preventDefault()
    setIsSortOpen(false)
    const value = event.target.value
    let field
    let order

    switch (value) {
      case 'priceLowToHigh':
        field = 'price'
        order = 'asc'
        break
      case 'priceHighToLow':
        field = 'price'
        order = 'desc'
        break
      case 'discountHighToLow':
        field = 'discountPercentage'
        order = 'desc'
        break
      case 'discountLowToHigh':
        field = 'discountPercentage'
        order = 'asc'
        break
      case 'nameAsc':
        field = 'title'
        order = 'asc'
        break
      case 'nameDesc':
        field = 'title'
        order = 'desc'
        break
      default:
        field = 'title'
        order = 'asc'
    }

    const existingFilters =
      JSON.parse(sessionStorage.getItem('filters')) || filters

    const updatedFilters = { ...existingFilters, sort: field, sortOrder: order }
    setFilters(updatedFilters)
    sessionStorage.setItem('filters', JSON.stringify(updatedFilters))

    const queryParams = []

    for (const key in updatedFilters) {
      if (updatedFilters[key] && updatedFilters[key].length > 0) {
        if (Array.isArray(updatedFilters[key])) {
          queryParams.push(`${key}=${updatedFilters[key].join(',')}`)
        } else {
          queryParams.push(`${key}=${updatedFilters[key]}`)
        }
      }
    }
    const queryString = queryParams.join('&')
    dispatch(fetchBooks(queryString))
  }

  const handleOutsideClick = (event, setState) => {
    if (event.target.id === 'modal-background') {
      setState(false)
    }
  }

  return (
    <div className='bg-gray-100 relative py-4'>
      <div className='container'>
        <div className='flex gap-4 justify-between pt-36'>
          {/* Sidebar (Visible only on larger screens) */}
          <div className='hidden md:block min-w-64'>
            <Sidebar />
          </div>

          {/* Products Section */}
          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <div className='px-2'>
                <h1 className='text-2xl font-semibold'>Story</h1>
                <p>(Showing 1 to 60 of 10000 items)</p>
              </div>
              <div className='hidden md:flex items-center gap-4 pr-6'>
                <div className='flex items-center gap-1 '>
                  <BsSortUpAlt className='mt-[2px]' />
                  <p>Sort By:</p>
                </div>
                <select
                  className='border px-4 py-2 rounded'
                  onChange={e => handleSort(e)} // Auto-close on selection
                >
                  <option value=''>Sort By</option>
                  <option value='priceLowToHigh'>Price: Low to High</option>
                  <option value='priceHighToLow'>Price: High to Low</option>
                  <option value='discountHighToLow'>
                    Discount: High to Low
                  </option>
                  <option value='discountLowToHigh'>
                    Discount: Low to High
                  </option>
                  <option value='nameAsc'>Name: A to Z</option>
                  <option value='nameDesc'>Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 gap-2 sm:flex justify-items-center sm:gap-4 flex-wrap mt-2 sm:mt-8'>
              {/* {[...Array(30)].map((_, index) => (
                <ProductCard key={index} />
              ))} */}
              {books.data &&
                books.data.map((book, i) => (
                  <ProductCard key={i} book={book} />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Buttons for Mobile */}
      <div className='md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 grid grid-cols-7 justify-items-center py-2'>
        <div className='col-span-3'>
          <button
            className='flex items-center gap-1 text-center text-sky-600 px-6 py-3 rounded-md font-medium'
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <LuListFilter />
            Filter
          </button>
        </div>
        <div className='colo-span-1'>
          <p className='h-10 w-[1px] bg-sky3 z-50'></p>
        </div>
        <div className='col-span-3'>
          <button
            className='flex min-w-fit items-center gap-1 text-center text-sky-600 px-6 py-3 rounded-md font-medium'
            onClick={() => setIsSortOpen(true)}
          >
            <BsSortDownAlt />
            Sort By
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div
          id='modal-background'
          className='fixed h-full w-full bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
          onClick={e => handleOutsideClick(e, setIsFilterOpen)}
        >
          <div
            className='bg-white rounded-lg p- w-full h-[85%] overflow-y-scroll relative '
            onClick={e => e.stopPropagation()} // Prevent modal close on content click
          >
            <h2 className='text-lg w-full font-semibold mb-4 text-center bg-white fixed py-2 border-b border-b-gray-300 flex justify-center items-center gap-2'>
              <LuListFilter />
              Filter Options
            </h2>

            <div className='flex flex-col gap-2 pt-12 items-center'>
              <SelectFilter title='Categories' options={categories} />
              <SelectFilter title='Authors' options={authors} />
              <SelectFilter title='Publishers' options={publishers} />
              <SelectFilter title='Languages' options={languages} />
              <ReviewFilter />
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {isSortOpen && (
        <div
          id='modal-background'
          className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
          onClick={e => handleOutsideClick(e, setIsSortOpen)}
        >
          <div
            className='bg-white rounded-lg p-6 w-11/12 max-w-sm'
            onClick={e => e.stopPropagation()} // Prevent modal close on content click
          >
            <h2 className='text-lg font-semibold mb-4'>Sort Options</h2>
            <select
              className='border w-full px-4 py-2 rounded'
              onChange={() => setIsSortOpen(false)} // Auto-close on selection
            >
              <option value=''>Sort By</option>
              <option value='priceLowToHigh'>Price: Low to High</option>
              <option value='priceHighToLow'>Price: High to Low</option>
              <option value='discountHighToLow'>Discount: High to Low</option>
              <option value='discountLowToHigh'>Discount: Low to High</option>
              <option value='nameAsc'>Name: A to Z</option>
              <option value='nameDesc'>Name: Z to A</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default Category
