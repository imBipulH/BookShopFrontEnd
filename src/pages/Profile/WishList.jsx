import { TiTick } from 'react-icons/ti'
import Navbar from '../../components/Navbar'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'

const WishList = () => {
  const WishListItem = () => {
    return (
      <div className='flex h-fit flex-1 gap-2 md:gap-4 p-2 md:px-8 border-b border-b-primary bg-sky-50 py-2 shadow-xl'>
        {/* <input type='checkbox' className='w-5 cursor-pointer' /> */}
        <div className='flex items-center max-w-20 md:max-w-40'>
          <img
            src='https://via.placeholder.com/150x150'
            className='max-h-28 md:max-h-40'
          />
        </div>
        <div>
          <h2 className='text-sm md:text-xl'>Spoken English</h2>
          <span className='text-xs md:text-md text-black inline mr-1'>by</span>
          <p className='text-xs md:text-base text-primary cursor-pointer inline'>
            Ashwini Shankar
          </p>
          <div className='flex items-center gap-2 text-base'>
            <p className='text-xs md:text-md'>Category: </p>
            <p className='text-xs md:text-md text-primary cursor-pointer'>
              English Books
            </p>
          </div>
          <div className='flex flex-wrap sm:gap-2 items-center '>
            <div className='flex items-center gap-2'>
              <TiTick className='bg-green-500 text-white rounded-full text-base' />
              <p>In stock</p>
            </div>
            <p className='text-sm text-black'>(Only 4 copies available)</p>
          </div>
          <div className=' hidden sm:block gap-1 sm:gap-2 mt-2 items-center'>
            <FaRegTrashAlt className='text-sm md:text-3xl hover:text-red-500 hover:bg-red-200 rounded-md md:p-1.5 transition-all duration-200 cursor-pointer' />
          </div>
        </div>
        <div className='flex min-w-fit flex-col items-end sm:gap-1 mt-2 text-right  sm:ml-auto'>
          <p className='text-xs md:text-sm text-white bg-red-500 px-1 sm:px-2'>
            40% Off
          </p>
          <p className='text-lg md:text-xl font-semibold'>308 Tk</p>
          <p className='line-through text-gray-500'>500 Tk</p>
          <div className='flex gap-4 sm:gap-2 mt-2 items-center'>
            <FaRegTrashAlt className='text-sm md:text-3xl block sm:hidden hover:text-red-500 hover:bg-red-200 rounded-md md:p-1.5 transition-all duration-200 cursor-pointer' />

            <button className='flex items-center gap-1 rounded border px-2 sm:px-4 py-1 sm:py-2 border-sky-500 bg-sky-600 transition-all duration-200 hover:bg-sky-500 text-white '>
              <IoCartOutline className='text-lg sm:text-2xl' />
              <span className='hidden sm:block'>Add to Cart </span>
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='bg-global_bg pt-28 md:pt-40 pb-8'>
      <div className='container'>
        <Navbar />
        <div className=''>
          <h1 className='text-center py-2 sm:py-4 sm:text-2xl sm:font-semibold bg-sky-100'>
            My Wish List
          </h1>
          <div className='flex flex-col'>
            <WishListItem />
            <WishListItem />
            <WishListItem />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishList
