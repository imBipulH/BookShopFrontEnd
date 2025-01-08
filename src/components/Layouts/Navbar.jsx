import { useEffect, useRef, useState } from 'react'
import { FaBars, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { GoPerson } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../../store/shop/cartSlice'
import { logout, verifyLogin } from '../../store/shop/authSlice'
import axiosInstance from '../../utils/axiosInstance'
import { CiLogout } from 'react-icons/ci'
import {
  clearSuggestions,
  fetchSearchSuggestions,
  initializeFuse,
  performFuseSearch
} from '../../store/shop/searchSlice'
import Suggestions from './ui/Suggestions'
import { fetchBooks } from '../../store/shop/bookSlice'
const Navbar = () => {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileMenu, setProfileMenu] = useState(false)
  const { cart } = useSelector(state => state?.cart || [])
  const { user } = useSelector(state => state?.auth || null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const { suggestions, fuseResults } = useSelector(state => state?.search)
  // console.log(suggestions, 'FuseResults', fuseResults)

  // Get window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const setupSearch = async () => {
    const books = await dispatch(fetchBooks()).unwrap()
    // Initialize Fuse.js with the books data
    dispatch(initializeFuse(books))
  }

  useEffect(() => {
    setupSearch() // Initialize search on component mount
  }, [])

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 400)

    return () => {
      clearTimeout(timer) // Clear the timeout on cleanup
    }
  }, [searchTerm])

  useEffect(() => {
    if (debouncedTerm.trim().length > 2) {
      dispatch(performFuseSearch({ query: debouncedTerm }))
      dispatch(fetchSearchSuggestions(debouncedTerm))
    } else {
      dispatch(clearSuggestions())
    }
  }, [debouncedTerm, dispatch])

  const handleSearchChange = event => {
    const value = event.target.value
    setSearchTerm(value)
  }

  useEffect(() => {
    dispatch(verifyLogin())
    dispatch(fetchCart())
  }, [dispatch])

  const cartItemCount = cart?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  )

  const logoutUser = async () => {
    try {
      await axiosInstance.post('logout')
      dispatch(logout())
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const categories = [
    { label: 'সকল বই', link: '/category' },
    { label: 'ধরন', link: '/category' },
    { label: 'বিষয়', link: '/allcategories' },
    { label: 'প্রকাশনী', link: '/publishers' },
    { label: 'লেখক', link: '/authors' },
    { label: 'ই-বুক', link: '/category' },
    { label: 'HSC ও ভর্তি প্রস্তুতি', link: '/category' },
    { label: 'ইসলামী বই', link: '/category' },
    { label: 'ইংরেজি ভাষার বই', link: '/category' },
    { label: 'পশ্চিমাদের বই', link: '/category' }
    // { label: 'অডিও বই', link: '/category' }
  ]

  // Ref for horizontal scrolling
  const categoryRef = useRef(null)

  // Horizontal Scroll for category
  const scrollCategory = direction => {
    if (categoryRef.current) {
      const scrollAmount = 150
      categoryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const toggleProfileMenu = () => setProfileMenu(!profileMenu)
  return (
    <div className='bg-white top-0 left-0 shadow-sm fixed w-full z-50'>
      <div className='container flex flex-col'>
        <div className='flex mt-2 w-dvw sm:w-full items-center justify-between gap-6 py-1 px-2 sm:py-4 sm:px-6'>
          {/* Hamburger Menu (Mobile Only) */}
          <button
            className='text-gray-600 sm:hidden'
            onClick={toggleMenu}
            aria-label='Toggle Menu'
          >
            <FaBars className='text-2xl' />
          </button>

          {/* Logo */}
          <Link to='/'>
            <div className='flex items-center space-x-1'>
              <div className='font-bold text-base sm:text-xl text-sky-600'>
                BOOKSHOP
              </div>
              <span className='text-gray-500'>.com</span>
            </div>
          </Link>

          {/* Search Bar (Hidden on mobile) */}
          <div className='relative hidden md:block flex-1 max-w-lg'>
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Search by Books...'
              className=' w-full py-2 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-sky-500 focus:outline-none hidden md:block'
            />
            {windowWidth > 767 && fuseResults.length > 0 && (
              <ul className='absolute top-full rounded-t-2xl left-0 w-full py-2 bg-white border mt-1 z-10 max-h-[80dvh] overflow-y-scroll'>
                {fuseResults.map(book => (
                  <Suggestions key={book._id} book={book} />
                ))}
              </ul>
            )}
          </div>

          {/* Overlay to auto hide profile menu */}
          {profileMenu && (
            <div
              onClick={toggleProfileMenu}
              className='fixed inset-0 z-40'
            ></div>
          )}

          <div className='relative flex items-center space-x-3 md:space-x-6'>
            <div className='flex items-center space-x-3 md:space-x-6'>
              <Link to='/wish-list'>
                <button className='text-gray-600 pt-1 hover:text-sky-600'>
                  <FaRegHeart className='text-xl sm:text-3xl' />
                </button>
              </Link>
              <Link to='/cart'>
                <button className='text-gray-600 pt-1 hover:text-sky-600 relative'>
                  <IoCartOutline className='text-2xl sm:text-4xl' />
                  <span className='absolute -top-1 -right-1 text-xs py-0.5 md:text-md bg-sky-500 text-white rounded-full px-1'>
                    {cartItemCount}
                  </span>
                </button>
              </Link>

              {user ? (
                <button
                  onClick={toggleProfileMenu}
                  className='flex items-center gap-2 top-4 right-4 z-50 bg-sky-600 text-white p-2 px-4 rounded-full shadow-lg'
                >
                  <GoPerson className='text-sm hidden md:block sm:text-2xl cursor-pointer' />
                  {`${user?.firstName} `}
                </button>
              ) : (
                <div>
                  <Link to='/login'>
                    <button className='text-xs sm:text-base hidden md:block py-2 px-4 text-white bg-sky-600 rounded hover:bg-sky-700'>
                      Login/Register
                    </button>
                  </Link>

                  {/* For Mobile Device */}
                  <Link to='/login'>
                    <p onClick={() => setProfileMenu(!profileMenu)}>
                      <GoPerson className='text-2xl md:hidden block sm:text-3xl cursor-pointer' />
                    </p>
                  </Link>
                </div>
              )}
            </div>

            {/* <p className='w-2 bg-red-500 md:hidden'></p> */}
            <div onClick={() => setProfileMenu(!profileMenu)}>
              {user && (
                <div
                  className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform ${
                    profileMenu ? 'translate-x-0' : 'translate-x-full'
                  } transition-transform duration-300 ease-in-out`}
                >
                  {/* Header */}
                  <div className='p-4 bg-sky-600 text-white flex items-center justify-between'>
                    <h2 className='text-lg font-semibold'>My Profile</h2>
                    <button onClick={toggleProfileMenu} className='text-white'>
                      &times;
                    </button>
                  </div>

                  {/* Menu Items */}
                  <ul className='p-4 space-y-4'>
                    <li>
                      <a
                        href='/my-orders'
                        className='block text-gray-800 hover:text-gray-500'
                      >
                        My Orders
                      </a>
                    </li>
                    <li>
                      <a
                        href='/my-wishlist'
                        className='block text-gray-800 hover:text-gray-500'
                      >
                        My Wishlist
                      </a>
                    </li>
                    <li>
                      <a
                        href='/account-settings'
                        className='block text-gray-800 hover:text-gray-500'
                      >
                        Account Settings
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={logoutUser}
                        className=' text-gray-800 hover:text-gray-500 flex items-center gap-2'
                      >
                        <span>
                          <CiLogout className='text-xl mt-0.5' />
                        </span>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Searchbar for mobile only */}
        <div className='w-full flex justify-center md:hidden my-1 mx-auto text-center'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search by Books...'
            className='w-full py-2 px-4 border border-gray-300 rounded-full focus:ring-0 focus:ring-sky-500 focus:outline-none'
          />
          {windowWidth < 768 && suggestions.length > 0 && (
            <ul className='absolute top-full rounded-t-2xl left-0 w-full py-2 bg-white border mt-1 z-10 max-h-[80dvh] overflow-y-scroll'>
              {suggestions.map(book => (
                <Suggestions key={book._id} book={book} />
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Menu (Slide-in from left) */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-40 transform transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ul className='space-y-2 p-4'>
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  to={category.link}
                  className='block py-2 px-4 text-gray-700 hover:bg-sky-600 hover:text-white rounded'
                  onClick={() => setMenuOpen(false)} // Close menu after click
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay to close menu when clicked outside */}
        {menuOpen && (
          <div
            className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30'
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        {/* category on navbar (Desktop Only) */}
        <div className='bg-white py-2 hidden md:block relative'>
          <div className='flex items-center px-4'>
            <button
              onClick={() => scrollCategory('left')}
              className='text-sky-600 hover:text-sky-700 px-2'
            >
              <FaChevronLeft />
            </button>
            <div
              ref={categoryRef}
              to='/category'
              className='flex space-x-4 overflow-hidden py-2'
            >
              {categories?.map((category, index) => (
                <Link
                  key={index}
                  to={category.link}
                  className='flex-shrink-0 py-2 px-4 bg-white border border-gray-300 rounded hover:bg-sky-600 hover:text-white transition'
                >
                  {category.label}
                </Link>
              ))}
            </div>
            {/* Right Arrow */}
            <button
              onClick={() => scrollCategory('right')}
              className='text-sky-600 hover:text-sky-700 px-2'
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
