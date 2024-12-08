import { useEffect, useRef } from 'react'
import ReviewFilter from './ui/sidebar.ui/ReviewFilter'
import SelectFilter from './ui/sidebar.ui/SelectFilter'

const categories = [
  { id: 1, name: 'Fiction', parent: 'Books' },
  { id: 2, name: 'Non-Fiction', parent: 'Books' },
  { id: 3, name: 'Comics', parent: 'Books' },
  { id: 4, name: 'Biography', parent: 'Books' },
  { id: 5, name: 'Thriller', parent: 'Books' },
  { id: 6, name: 'Romance', parent: 'Books' },
  { id: 7, name: 'Romance', parent: 'Books' },
  { id: 8, name: 'Romance', parent: 'Books' },
  { id: 9, name: 'Romance', parent: 'Books' },
  { id: 10, name: 'Romance', parent: 'Books' },
  { id: 11, name: 'Romance', parent: 'Books' },
  { id: 12, name: 'Romance', parent: 'Books' }
]

const authors = [
  { id: 1, name: 'J.K. Rowling' },
  { id: 2, name: 'George R.R. Martin' },
  { id: 3, name: 'Agatha Christie' }
  // ...more authors
]

const publishers = [
  { id: 1, name: 'Penguin Random House' },
  { id: 2, name: 'HarperCollins' },
  { id: 3, name: 'Simon & Schuster' }
  // ...more publishers
]

const languages = [
  { id: 1, name: 'English' },
  { id: 2, name: 'Spanish' },
  { id: 3, name: 'French' }
  // ...more languages
]
const Sidebar = () => {
  const sidebarRef = useRef(null)
  const sidebarContentRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current && sidebarContentRef.current) {
        const scrollTop = window.scrollY
        const viewportHeight = window.innerHeight

        const contentHeight =
          sidebarContentRef.current.getBoundingClientRect().height
        const sidebarTop =
          sidebarRef.current.getBoundingClientRect().top + window.pageYOffset

        const pageHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight

        if (contentHeight <= viewportHeight || pageHeight <= viewportHeight) {
          sidebarContentRef.current.style.transform = ''
          sidebarContentRef.current.style.position = ''
          sidebarContentRef.current.style.top = ''
          return
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={sidebarRef} className='relative pb-4'>
      <div className='flex flex-col space-y-4' ref={sidebarContentRef}>
        {/* <SelectCategory /> */}
        <SelectFilter title='Categories' options={categories} />
        <SelectFilter title='Authors' options={authors} />
        <SelectFilter title='Publishers' options={publishers} />
        <SelectFilter title='Languages' options={languages} />
        <ReviewFilter />
      </div>
    </div>
  )
}

export default Sidebar
