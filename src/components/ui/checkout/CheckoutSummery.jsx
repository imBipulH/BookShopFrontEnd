/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import {
  calculateShippingFee,
  calculateSubtotal,
  calculateTotalAmount
} from './cartUtils'

const CheckoutSummery = ({ cart }) => {
  const subtotal = Math.round(calculateSubtotal(cart))
  const shippingFee = calculateShippingFee(cart)
  const totalAmount = Math.round(calculateTotalAmount(subtotal, shippingFee))

  return (
    <div className=' md:w-1/3 h-fit shadow-xl px-6 py-4 bg-white'>
      <h3 className='text-xl mb-2 border-b pb-2'>Checkout Summary</h3>
      <div className='flex justify-between items-center text-base'>
        <p>
          Subtotal (Qty:{' '}
          {cart
            ?.filter(item => item.isMarked)
            .reduce((total, item) => total + item.quantity, 0)}
          )
        </p>
        <p>TK {subtotal}</p>
      </div>
      <div className='flex justify-between items-center text-base border-b py-2'>
        <p>Shipping Fee</p>
        <p>{`TK ${shippingFee}`}</p>
      </div>
      <div className='mt-2 flex justify-between items-center text-base'>
        <p>Total</p>
        <p>{`TK ${totalAmount}`}</p>
      </div>
      {/*  // Apply voucher/coupon
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
             </div> */}
      <Link to='/checkout'>
        <button className='w-full py-3 mt-6 bg-sky-600 hover:bg-sky-700 transition-all duration-200 text-white text-xl font-semibold rounded-md'>
          Place Order
        </button>
      </Link>
    </div>
  )
}

export default CheckoutSummery
