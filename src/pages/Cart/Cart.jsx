import { TiTick } from 'react-icons/ti'
import Navbar from '../../components/Navbar'
import { FiMinus, FiPlus } from 'react-icons/fi'
import {
  FaAngleDown,
  FaAngleUp,
  FaRegHeart,
  FaRegTrashAlt
} from 'react-icons/fa'
import { useRef, useState } from 'react'

const CartItems = () => {
  return (
    <div className='flex h-fit flex-1 gap-2 md:gap-4 p-2 md:px-8 border-b border-b-primary bg-sky-50 py-2 shadow-xl'>
      <input type='checkbox' className='w-5 cursor-pointer' />
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
        <div className='flex gap-1 sm:gap-2 mt-2 items-center'>
          <FaRegTrashAlt className='text-sm md:text-3xl hover:text-red-500 hover:bg-red-200 rounded-md md:p-1.5 transition-all duration-200 cursor-pointer' />
          <FaRegHeart className=' md:text-3xl rounded-md mr-2 cursor-pointer hover:bg-sky-200 md:p-1.5 transition-all duration-200 hover:text-primary' />
          <div className='flex gap-2 items-center'>
            <button className='text-base border p-1 bg-gray-100'>
              <FiMinus />
            </button>
            <input
              type='number'
              min='1'
              value={55}
              className='w-8 md:w-14 h-8 outline-none md:text-lg font-semibold text-center no-spinner'
            />
            <button className='text-lg border bg-gray-200 hover:bg-sky2 p-1'>
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
      <div className='flex min-w-fit flex-col items-end sm:gap-1 mt-2 text-right  sm:ml-auto'>
        <p className='text-xs md:text-sm text-white bg-red-500 px-1 sm:px-2'>
          40% Off
        </p>
        <p className='text-lg md:text-xl font-semibold'>308 Tk</p>
        <p className='line-through text-gray-500'>500 Tk</p>
      </div>
    </div>
  )
}
const Cart = () => {
  const [activeVoucherTab, setActiveVoucherTab] = useState(false)
  const contentRef = useRef()
  return (
    <div className='bg-global_bg pt-28 md:pt-40 pb-8'>
      <div className='container'>
        <Navbar />
        <div className='flex flex-col md:flex-row gap-2 md:gap-8'>
          <div className='flex-1 flex flex-col gap-0'>
            <h1 className='text-xl bg-sky-50 px-8 font-semibold'>
              Shopping Cart
            </h1>
            <div className='flex items-center justify-between bg-sky-50 py-4 px-8 border-b border-b-primary'>
              <div className='flex items-center gap-2 py-1'>
                <input
                  type='checkbox'
                  className='w-5 aspect-square cursor-pointer'
                />
                <p>Select All</p>
              </div>
              <p className='text-gray-500 text-sm'>(13 items)</p>
            </div>
            <CartItems />
            <CartItems />
            <CartItems />
            <CartItems />
          </div>
          <div className=' md:w-1/3 h-fit shadow-xl px-6 py-4 bg-white'>
            <h3 className='text-xl mb-2 border-b pb-2'>Checkout Summary</h3>
            <div className='flex justify-between items-center text-base'>
              <p>Subtotal (3 items)</p>
              <p>588 Tk.</p>
            </div>
            <div className='flex justify-between items-center text-base border-b py-2'>
              <p>Shipping Fee</p>
              <p>60 Tk.</p>
            </div>
            <div className='mt-2 flex justify-between items-center text-base'>
              <p>Total</p>
              <p>৳648 Tk.</p>
            </div>
            <div
              onClick={() => setActiveVoucherTab(!activeVoucherTab)}
              className='flex mt-4 items-center justify-between cursor-pointer'
            >
              <p className=''>Apply voucher/promo code (If any)</p>
              {activeVoucherTab ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div
              ref={contentRef}
              style={{
                maxHeight: activeVoucherTab
                  ? `${contentRef.current?.scrollHeight}px`
                  : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-out'
              }}
              className='w-full mx-auto'
            >
              <div className='w-full mx-auto flex justify-center gap-2 my-1 md:my-3'>
                <input
                  type='text'
                  className='min-w-16 border py-1.5 text-base md:text-lg outline-primary text-sky7 font-semibold md:font-bold text-center border-sky-300 rounded-md'
                  placeholder='Enter your code'
                />
                <button className='px-4 font-bold font-roboto bg-sky-600 hover:bg-sky-700 transition-all duration-200 text-white rounded-md'>
                  Apply
                </button>
              </div>
            </div>
            <button className='w-full py-3 mt-2 bg-sky-600 hover:bg-sky-700 transition-all duration-200 text-white text-xl font-semibold rounded-md'>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
