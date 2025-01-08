/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo, useEffect, useMemo, useRef } from 'react'
import ReviewFilter from '../ui/sidebar.ui/ReviewFilter'
import SelectFilter from '../ui/sidebar.ui/SelectFilter'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAuthors,
  fetchCategories,
  fetchPublishers
} from '../../store/shop/sidebarSlice'
import { languages } from '../Data'
import { fetchBooks } from '../../store/shop/bookSlice'
import { debounce, throttle } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'

const Sidebar = memo(({ filters, setFilters }) => {
  const navigate = useNavigate()
  const { type, id } = useParams()
  const dispatch = useDispatch()
  const sidebarRef = useRef(null)
  const sidebarContentRef = useRef(null)
  const footerRef = useRef(document.querySelector('footer'))
  const { categories, authors, publishers } = useSelector(
    state => state.sidebar
  )

  function handleFilter (getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters }
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption)
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption)
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
    }

    setFilters(cpyFilters)
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchAuthors())
    dispatch(fetchPublishers())
  }, [dispatch])

  const getBooks = async () => {
    const queryParams = []

    for (const key in filters) {
      if (filters[key] && filters[key].length > 0) {
        if (Array.isArray(filters[key])) {
          queryParams.push(`${key}=${filters[key].join(',')}`)
        } else {
          queryParams.push(`${key}=${filters[key]}`) // Manually join with commas
        }
      }
    }
    const queryString = queryParams.join('&')
    dispatch(fetchBooks(queryString))
  }

  const debouncedGetBooks = debounce(() => {
    getBooks()
  }, 300)

  useEffect(() => {
    debouncedGetBooks()
  }, [filters])

  const handleScroll = () => {
    if (sidebarRef.current && sidebarContentRef.current && footerRef.current) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      const contentHeight =
        sidebarContentRef.current.getBoundingClientRect().height
      const sidebarTop =
        sidebarRef.current.getBoundingClientRect().top + window.pageYOffset
      const viewportHeight = window.innerHeight
      // Check if footer is in the viewport
      const footerInView =
        footerRef.current.getBoundingClientRect().top <= viewportHeight

      const pageHeight = document.documentElement.scrollHeight - viewportHeight

      if (contentHeight <= viewportHeight || pageHeight <= viewportHeight) {
        sidebarContentRef.current.style.transform = ''
        sidebarContentRef.current.style.position = ''
        sidebarContentRef.current.style.top = ''
        return
      }

      if (footerInView) {
        // Reset sidebar to normal behavior
        sidebarContentRef.current.style.transform = ''
        sidebarContentRef.current.style.position = ''
        // sidebarContentRef.current.style.top = ''
        sidebarRef.current.style.height = '100%'
        sidebarRef.current.style.display = 'flex'
        return
      } else {
        sidebarContentRef.current.style.transform = ''
        sidebarContentRef.current.style.position = ''
        sidebarContentRef.current.style.top = ''
        sidebarRef.current.style.height = ''
        sidebarRef.current.style.display = 'block'
      }

      if (scrollTop >= contentHeight - viewportHeight + sidebarTop) {
        // Apply translateY for sticky effect
        sidebarContentRef.current.style.transform = `translateY(-${
          contentHeight - viewportHeight + sidebarTop
        }px)`
        sidebarContentRef.current.style.position = 'fixed'
        sidebarContentRef.current.style.top = '140px'
      } else {
        // Reset styles when not sticky
        sidebarContentRef.current.style.transform = ''
        sidebarContentRef.current.style.position = ''
        sidebarContentRef.current.style.top = ''
      }
    }
  }
  useEffect(() => {
    footerRef.current = document.querySelector('footer')
  }, [])

  const throttledHandleScroll = throttle(handleScroll, 200)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  console.log('Sidebar Rendered')

  async function handleReset (sectionId) {
    const updatedFilters = { ...filters }
    delete updatedFilters[sectionId] // Remove the section from filters
    setFilters(updatedFilters) // Update the state
    sessionStorage.setItem('filters', JSON.stringify(updatedFilters)) // Update sessionStorage

    if (type && id) {
      navigate('/category')
    }

    await getBooks()
  }

  const memoizedCategories = useMemo(() => categories, [categories])
  const memoizedFilters = useMemo(() => filters, [filters])
  return (
    <div
      ref={sidebarRef}
      className='relative transition-transform duration-300 ease-in-out flex-col justify-end items-baseline block min-w-64'
    >
      <div className='flex flex-col space-y-4 ' ref={sidebarContentRef}>
        <SelectFilter
          title='Categories'
          options={memoizedCategories}
          filters={memoizedFilters}
          handleFilter={handleFilter}
          getBooks={getBooks}
          handleReset={() => handleReset('categories')}
        />
        <SelectFilter
          title='Authors'
          options={authors}
          filters={memoizedFilters}
          handleFilter={handleFilter}
          getBooks={getBooks}
          handleReset={() => handleReset('authors')}
        />
        <SelectFilter
          title='Publishers'
          options={publishers}
          filters={memoizedFilters}
          handleFilter={handleFilter}
          getBooks={getBooks}
          handleReset={() => handleReset('publishers')}
        />
        <SelectFilter
          title='Languages'
          options={languages}
          filters={memoizedFilters}
          handleFilter={handleFilter}
          getBooks={getBooks}
          handleReset={() => handleReset('languages')}
        />
        <ReviewFilter />
      </div>
    </div>
  )
})

export default Sidebar
