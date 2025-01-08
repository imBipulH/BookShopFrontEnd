import { IoCartOutline } from 'react-icons/io5'
import Accordion from './ui/Tabs'
import { FaRegHeart } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
import { StarRating } from '../../components/ui/StarRating'
import { SimilarProduct } from '../../components/ui/SimilarProduct'
import { useEffect, useRef, useState } from 'react'
import { MyDocument } from '../../components/ui/PdfView'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookById } from '../../store/shop/bookSlice'
import { addToCart } from '../../store/shop/cartSlice'

const Product_Details = () => {
  const { bookId } = useParams()
  const dispatch = useDispatch()
  const { books } = useSelector(state => state.books)
  const cartStatus = useSelector(state => state.cart.status)
  const book = books?.length > 0 ? books?.find(b => b._id === bookId) : null
  useEffect(() => {
    if (!book) {
      dispatch(fetchBookById(bookId))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dispatch, bookId, book])

  const [openModal, setOpenModal] = useState(false)
  const modalRef = useRef(null)

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: bookId, quantity: 1 }))
  }

  const handleOutsideClick = e => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenModal(false) // Close modal if click is outside
    }
  }
  const calculatePrice = () => {
    return (
      <p className='text-3xl text-center md:text-start text-sky-700 font-semibold'>
        <span className='text-2xl'>TK. </span>
        {book?.discountPercentage > 0 ? book?.discountPrice : book?.price}
      </p>
    )
  }

  return (
    <div className='bg-global_bg relative'>
      <div className='container  font-roboto'>
        {/* Product details start */}
        <div className='bg-white'>
          <div className='flex flex-col md:flex-row pt-44 gap-4 justify-between'>
            <div className='border p-4 mx-4 md:max-h-[460px]'>
              {book?.coverImage ? (
                <img
                  src={book?.coverImage}
                  className=' h-full md:max-h-96 md:max-w-80
              '
                />
              ) : (
                <img src='https://via.placeholder.com/320x420' />
              )}
            </div>
            <div className='flex flex-1 flex-col md:items-start'>
              <h3 className='text-3xl text-center'>{book?.title}</h3>
              <p className='my-2 text-center'>
                by{' '}
                <span className='text-sky-600 cursor-pointer'>
                  {book?.author?.name}
                </span>
              </p>
              <p className='w-[80vw] mx-auto h-[1px] bg-sky-300 md:hidden'></p>
              <div className='flex flex-col md:flex-row md:gap-8 px-4 md:px-0 w-full'>
                <div className='w-fit max-w-2/3 md:mt-0 mt-2'>
                  <div className='flex gap-2 my-1'>
                    <p>Category:</p>
                    <span className='text-sky-700'>এইচএসসি: আবশ্যিক বিষয়</span>
                  </div>
                  <div className='md:flex gap-2 my-2 hidden '>
                    <p>Edition:</p>
                    <span className='text-sky-700'>1st published, 2020</span>
                  </div>
                  <div className='hidden md:flex gap-2 my-2'>
                    <p>Country</p>
                    <span className='text-sky-700'>Bangladesh</span>
                  </div>
                </div>
                <div>
                  <div className='flex gap-2 my-2'>
                    <p>Publishers:</p>
                    <span className='text-sky-700'>Tamaulipas</span>
                  </div>
                  <div className='flex gap-2 my-2'>
                    <p>Total pages:</p>
                    <span className='text-sky-700'>288</span>
                  </div>
                  <div className='flex gap-2 my-2'>
                    <p>Language</p>
                    <span className='text-sky-700'>Bangla & English</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2 px-4 md:px-0'>
                <StarRating rating='4.5' />
                <p className='mt-[2px]'>19 ratings | 6 reviews</p>
              </div>

              <p className='w-3/4 h-[1px] mx-auto md:ml-0 bg-sky-300 my-4'></p>
              <div className='flex md:flex-col gap-2 md:gap-0 justify-center md:justify-start'>
                {calculatePrice()}
                {book?.discountPercentage > 0 && (
                  <div className='flex items-center my-2 gap-2 text-lg'>
                    <p className='line-through text-base text-gray-500'>
                      <span className='text-lg'>৳ </span>
                      {book?.price}
                    </p>
                    <p className='bg-red-500 px-1 rounded-sm text-white'>
                      -{book?.discountPercentage}%
                    </p>
                    <p className='text-base'>
                      You save Tk.
                      {Math.round(
                        (book?.price * book?.discountPercentage) / 100
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className='flex md:justify-start justify-center gap-2 items-center '>
                <TiTick className='bg-green-500 text-white rounded-full text-xl' />
                <p>In stock</p>
                <p className='text-sm text-black'>(Only 4 copies available)</p>
              </div>
              <p className='w-3/4 h-[1px] mx-auto md:ml-0 bg-sky-300 my-4'></p>
              <div className='flex mx-auto md:ml-0 gap-4'>
                <p className='min-w-36 flex  items-center gap-1'>
                  <span>
                    <img
                      src='../../../src/assets/cash-on-delivery.png'
                      className='h-5'
                    />
                  </span>
                  Cash On Delivery
                </p>
                <p className='flex items-center gap-1'>
                  <span>
                    <img
                      src='../../../src/assets/exchange.png'
                      className='h-5'
                    />
                  </span>
                  7 Days Happy Return
                </p>
              </div>
              <div className='md:flex hidden mx-auto md:ml-0 gap-4 my-4'>
                <button
                  onClick={() => setOpenModal(!openModal)}
                  className='min-w-36 border rounded px-4 py-2 border-sky-500 transition-all duration-200 hover:bg-sky-500 hover:text-white'
                >
                  একটু পড়ে দেখুন
                </button>
                <button
                  onClick={handleAddToCart}
                  className='relative flex items-center gap-1 rounded border px-4 py-2 border-sky-500 bg-sky-600 transition-all duration-200 hover:bg-sky-500 text-white '
                >
                  <span>
                    <IoCartOutline className='text-2xl' />
                  </span>
                  {cartStatus === 'loading' ? (
                    <img
                      className='absolute h-full w-full inset-0'
                      src='../../../src/assets/loading-loader.gif'
                    />
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
              <div>
                <p className='flex justify-center items-center gap-1 hover:text-primary transition-all border border-transparent hover:border-primary px-3 py-1 rounded-[4px] cursor-pointer text-base'>
                  <span className='mr-1'>
                    <FaRegHeart />
                  </span>
                  Add to wishlist
                </p>
              </div>
            </div>
          </div>
          {/* <div className='w-1/5'> Related products code </div> */}
        </div>
        {/* Product details End */}
        <div className='md:min-h-[500px] pt-8 bg-white shadow-xl'>
          <Accordion />
        </div>
        <p className='w-full h-8 bg-global_bg'></p>
        <SimilarProduct />
      </div>
      {openModal && (
        <div
          className='z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className='bg-white p-4 rounded-lg shadow-lg relative z-10'
          >
            <MyDocument />
          </div>
        </div>
      )}
      <div className='fixed md:hidden bg-white bottom-0 w-full left-0 z-50'>
        <div className='flex justify-between bg-white gap-1 my-1'>
          <button
            onClick={() => setOpenModal(!openModal)}
            className='w-1/2 border rounded px-4 py-3 border-sky-500 transition-all duration-200 hover:bg-sky-500 hover:text-white'
          >
            একটু পড়ে দেখুন
          </button>
          <button
            onClick={handleAddToCart}
            className='w-1/2 flex justify-center items-center gap-1 rounded border px-4 py-3 border-sky-500 bg-sky-900 transition-all duration-200 hover:bg-sky-500 text-white '
          >
            <span>
              <IoCartOutline className='text-2xl' />
            </span>
            {cartStatus === 'loading' ? (
              <img src='../../../src/assets/loading-loader.gif' />
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product_Details
