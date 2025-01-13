import { useEffect, useState } from 'react'
import Sidebar from '../../components/Layouts/Sidebar'
import ProductCard from '../../components/ui/ProductCard'
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs'
import { LuListFilter } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../../store/shop/bookSlice'
import {
  fetchAuthors,
  fetchCategories,
  fetchPublishers
} from '../../store/shop/sidebarSlice'
import Breadcrumb from './Breadcumb'
import { useParams } from 'react-router-dom'
import { languages } from '../../components/Data'

const Category = () => {
  const dispatch = useDispatch()
  const { type, id } = useParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const { books } = useSelector(state => state.books)
  const { totalPages } = useSelector(state => state.books)
  const [itemsPerPage, setItemsPerPage] = useState(30)
  const [currentPage, setCurrentPage] = useState(1)
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

  const [range, setRange] = useState({ start: 1, end: itemsPerPage })

  console.log('Category page Rendering..')

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, books.totalItems || 0)
    setRange({ start, end })
  }, [currentPage, itemsPerPage, books])

  const storedFilters = JSON.parse(sessionStorage.getItem('filters')) || {}

  const updatedFilters = {
    ...storedFilters,
    page: currentPage,
    limit: itemsPerPage,
    [type]: id ? [id] : filters[type]
  }
  sessionStorage.setItem('filters', JSON.stringify(updatedFilters))

  const fetchBooksWithPagination = () => {
    const queryParams = new URLSearchParams(updatedFilters).toString()
    console.log('Query Parameters:', queryParams)
    dispatch(fetchBooks(queryParams))
  }

  useEffect(() => {
    fetchBooksWithPagination()
  }, [id, type, itemsPerPage, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage])

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchAuthors())
    dispatch(fetchPublishers())
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

  const { categories, authors, publishers } = useSelector(
    state => state.sidebar
  )

  const dataByType = {
    categories,
    authors,
    publishers,
    languages
  }

  const getNamesFromIds = (ids, type) => {
    const data = dataByType[type]
    if (!Array.isArray(data)) {
      return []
    }
    return ids
      .map(id => data?.find(item => item._id === id)?.name)
      .filter(Boolean) // Removes undefined if the ID doesn't match
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Books', path: '/books' },
    ...Object.keys(filters).flatMap(type =>
      getNamesFromIds(filters[type], type).map(name => ({
        label: name,
        type
      }))
    )
  ]

  const handleFilterRemove = (type, name) => {
    const updatedFilters = {
      ...filters,
      [type]: filters[type].filter(
        id => getNamesFromIds([id], type)[0] !== name
      )
    }

    // Update the state and storage
    setFilters(updatedFilters)
    sessionStorage.setItem('filters', JSON.stringify(updatedFilters))
    fetchBooksWithPagination() // Update the books list
  }

  return (
    <div className='bg-gray-100 relative py-4'>
      <div className='container'>
        <div className='flex gap-4 pt-24 md:pt-40'>
          {/* Sidebar (Visible only on larger screens) */}
          <div className='hidden md:block'>
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>
          <div className='flex-1'>
            {/* Products Section */}
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <div className='px-2'>
                  <Breadcrumb
                    items={breadcrumbItems}
                    onRemove={label => {
                      const filterType = breadcrumbItems.find(
                        item => item.label === label
                      )?.type
                      if (filterType) handleFilterRemove(filterType, label)
                    }}
                  />
                  <p className='text-sm md:text-lg text-gray-600 mt-1'>
                    {`Showing ${range.start} to ${range.end} of ${books.totalItems} items`}{' '}
                  </p>
                </div>

                {/* Items per page and sort options */}
                <div className='flex items-center'>
                  <div className='hidden md:flex items-center gap-4 pr-6'>
                    <div className='flex items-center gap-1 '>
                      <p>Items per page:</p>
                    </div>
                    <select
                      className='border px-4 py-2 rounded'
                      onChange={e => setItemsPerPage(parseInt(e.target.value))} // Auto-close on selection
                    >
                      <option value='30'>30</option>
                      <option value='20'>20</option>
                      <option value='40'>40</option>
                      <option value='50'>50</option>
                      <option value='60'>60</option>
                      <option value='80'>80</option>
                    </select>
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
              </div>

              {/* Products Grid */}
              <div className='grid grid-cols-2 gap-2 sm:flex flex-wrap justify-items-center md:gap-4 mt-2 md:mt-8'>
                {books.data &&
                  books.data.map((book, i) => (
                    <ProductCard key={i} book={book} />
                  ))}
              </div>
            </div>

            {/* Pagination Buttons */}
            <div className='flex justify-center mt-6'>
              {totalPages > 1 && (
                <div className='flex items-center gap-2'>
                  <button
                    className='border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`border px-4 py-2 rounded ${
                        currentPage === index + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className='border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'
                    disabled={currentPage === books.totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
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
            <h2 className='text-lg w-full font-semibold mb-4 text-center bg-white fixed py-2 border-b border-b-gray-300 flex justify-center items-center gap-2 z-50'>
              <LuListFilter />
              Filter Options
            </h2>

            <div className='flex flex-col gap-2 pt-12 items-center z-50'>
              <Sidebar filters={filters} setFilters={setFilters} />
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
              onChange={e => handleSort(e)}
              // Auto-close on selection
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
