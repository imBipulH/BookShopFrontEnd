import { useRef, useState } from 'react'
import { FaBars, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { GoPerson } from 'react-icons/go'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const categories = [
    'সকল বই',
    'ধরন',
    'বিষয়',
    'প্রকাশনী',
    'প্রবেশিকা ২০২৪',
    'ই-বুক',
    'HSC ও ভর্তি প্রস্তুতি',
    'ইসলামী বই',
    'ইংরেজি ভাষার বই',
    'পশ্চিমাদের বই',
    'অডিও বই'
  ]

  // Ref for horizontal scrolling
  const categoryRef = useRef(null)

  // Horizontal Scroll for Categories
  const scrollCategories = direction => {
    if (categoryRef.current) {
      const scrollAmount = 150
      categoryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  const toggleMenu = () => setMenuOpen(!menuOpen)
  return (
    <div className='bg-white top-0 left-0 shadow-sm fixed w-full z-50'>
      <div className='container flex flex-col'>
        <div className='flex w-dvw sm:w-full items-center justify-between gap-6 py-1 px-2 sm:py-4 sm:px-6'>
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
              placeholder='Search by Books...'
              className='w-full py-2 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-sky-500 focus:outline-none'
            />
          </div>

          <div className='flex items-center space-x-3 md:space-x-6'>
            <Link to='/wish-list'>
              <button className='text-gray-600 pt-1 hover:text-sky-600'>
                <FaRegHeart className='text-xl sm:text-3xl' />
              </button>
            </Link>
            <Link to='/cart'>
              <button className='text-gray-600 pt-1 hover:text-sky-600 relative'>
                <IoCartOutline className='text-2xl sm:text-4xl' />
                <span className='absolute -top-1 -right-1 text-xs bg-sky-500 text-white rounded-full px-1.5'>
                  2
                </span>
              </button>
            </Link>

            <GoPerson className='text-2xl md:hidden block sm:text-3xl cursor-pointer' />
            <p className='w-2 md:hidden'></p>
            <button className='text-xs sm:text-base hidden md:block py-2 px-4 text-white bg-sky-600 rounded hover:bg-sky-700'>
              Login / Register
            </button>
          </div>
        </div>

        {/* Searchbar for mobile only */}
        <div className='w-full flex justify-center md:hidden my-1 mx-auto text-center'>
          <input
            type='text'
            placeholder='Search by Books...'
            className='w-full py-2 px-4 border border-gray-300 rounded-full focus:ring-0 focus:ring-sky-500 focus:outline-none'
          />
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
                  to={`/category/${category}`}
                  className='block py-2 px-4 text-gray-700 hover:bg-sky-600 hover:text-white rounded'
                  onClick={() => setMenuOpen(false)} // Close menu after click
                >
                  {category}
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

        {/* Categories on navbar (Desktop Only) */}
        <div className='bg-white py-2 hidden md:block relative'>
          <div className='flex items-center px-6'>
            <button
              onClick={() => scrollCategories('left')}
              className='text-sky-600 hover:text-sky-700 px-2'
            >
              <FaChevronLeft />
            </button>
            <Link
              ref={categoryRef}
              to='/category'
              className='flex space-x-4 overflow-hidden py-2'
            >
              {categories.map((category, index) => (
                <button
                  key={index}
                  className='flex-shrink-0 py-2 px-4 bg-white border border-gray-300 rounded hover:bg-sky-600 hover:text-white transition'
                >
                  {category}
                </button>
              ))}{' '}
            </Link>
            {/* Right Arrow */}
            <button
              onClick={() => scrollCategories('right')}
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
