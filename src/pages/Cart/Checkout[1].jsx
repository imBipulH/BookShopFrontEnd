/* eslint-disable react/prop-types */
import {
  FaAngleDown,
  FaAngleUp,
  FaCreditCard,
  FaWallet,
  FaCashRegister
} from 'react-icons/fa'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

// Floating Label Input Component
const FloatingLabelInput = ({ label, type, placeholder }) => {
  const [focus, setFocus] = useState(false)

  return (
    <div className='relative mb-2 w-full'>
      <input
        type={type}
        id={label}
        className={`w-full px-2 py-2 text-base border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 peer`}
        placeholder=' ' // empty placeholder for the label to float
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <label
        htmlFor={label}
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          focus || document.getElementById(label)?.value
            ? 'text-xs text-sky-600 -top-[3px] bg-[#F0F9FF] py-[2px] px-[5px]'
            : 'text-base text-gray-500'
        }`}
      >
        {placeholder}
      </label>
    </div>
  )
}

const CheckoutPage1 = () => {
  const [activeVoucherTab, setActiveVoucherTab] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [selectedWallet, setSelectedWallet] = useState('')

  const contentRef = useRef()

  const walletOptions = [
    { name: 'bKash', color: 'bg-red-100', img: '../../src/assets/bkash.png' },
    {
      name: 'Nagad',
      color: 'bg-orange-100',
      img: '../../src/assets/nagad.png'
    },
    {
      name: 'Rocket',
      color: 'bg-purple-100',
      img: '../../src/assets/rocket.png'
    }
  ]

  const PaymentButton = ({ onClick, icon, title, name }) => {
    return (
      <button
        onClick={onClick}
        className={`w-full py-2 text-center border rounded-md transition-all duration-300
        ${
          selectedPaymentMethod == name
            ? 'bg-sky-600 text-white border-sky-700 shadow-lg'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-sky-200'
        } 
         focus:outline-none hover:shadow-md`}
      >
        <div className='flex justify-center w-full'>{icon}</div>
        <h5 className='font-semibold whitespace-nowrap responsive-title'>
          {title}
        </h5>
      </button>
    )
  }

  return (
    <div className='bg-global_bg pt-28 md:pt-40 pb-8'>
      <div className='container'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-8'>
          {/* Left Section - Shipping and Payment Details */}
          <div className='flex-1 flex flex-col gap-1 md:gap-4'>
            {/* Shipping Information */}
            <div className='bg-sky-50 py-4 px-8 border-b border-b-primary rounded-md'>
              <h2 className='text-lg font-semibold mb-4'>
                Shipping Information
              </h2>

              {/* First Name & Last Name */}
              <div className='flex gap-4 mb-4'>
                <FloatingLabelInput
                  label='firstName'
                  type='text'
                  placeholder='First Name'
                />
                <FloatingLabelInput
                  label='lastName'
                  type='text'
                  placeholder='Last Name'
                />
              </div>

              {/* Phone Number & Email */}
              <div className='flex gap-4 mb-4'>
                <FloatingLabelInput
                  label='phoneNumber'
                  type='text'
                  placeholder='Phone Number'
                />
                <FloatingLabelInput
                  label='email'
                  type='email'
                  placeholder='Email'
                />
              </div>

              {/* Country, City, and Area */}
              <div className='flex gap-4 mb-4'>
                <select
                  name='country'
                  className='w-1/3 p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500'
                >
                  <option value='Bangladesh'>Bangladesh</option>
                </select>
                <select
                  name='city'
                  className='w-1/3 p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500'
                >
                  <option value='Dhaka'>Dhaka</option>
                  {/* Add other cities as needed */}
                </select>
                <select
                  name='area'
                  className='w-1/3 p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500'
                >
                  <option value='Area 1'>Area 1</option>
                  {/* Add other areas as needed */}
                </select>
              </div>

              {/* Address Details */}
              <textarea
                placeholder='বাসা/ফ্ল্যাট নম্বর, পাড়া-মহল্লার নাম, পরিচিতির এলাকা উল্লেখ করুন'
                className='w-full p-3 mb-4 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500'
                rows='4'
              />
            </div>

            <div className=' bg-sky-50 p-2 rounded-md shadow-md'>
              <h4 className='font-semibold mb-2 text-center text-lg text-gray-800'>
                Select Payment Method
              </h4>
              <div className='grid grid-cols-3 gap-1'>
                <PaymentButton
                  name='card'
                  title='Credit/Debit Card'
                  icon={<FaCreditCard className='text-2xl' />}
                  onClick={() => setSelectedPaymentMethod('card')}
                />
                <PaymentButton
                  name='wallet'
                  title='Mobile Wallet'
                  icon={<FaWallet className='text-2xl' />}
                  onClick={() => setSelectedPaymentMethod('wallet')}
                />
                <PaymentButton
                  name='cod'
                  title='Cash on delivery'
                  icon={<FaCashRegister className='text-2xl' />}
                  onClick={() => setSelectedPaymentMethod('cod')}
                />
              </div>
            </div>

            {/* Card Payment Form */}
            {selectedPaymentMethod === 'card' && (
              <div className=' bg-[#F0F9FF] p-2 rounded-md shadow-md'>
                <h4 className='font-semibold text-center mb-1 text-base'>
                  Card Payment Details
                </h4>
                <div className='mb-1'>
                  <FloatingLabelInput
                    label='cardNumber'
                    type='text'
                    placeholder='Card Number'
                  />
                </div>
                <div className='flex gap-2 mb-1'>
                  <FloatingLabelInput
                    label='expiryDate'
                    type='text'
                    placeholder='Expiry Date (MM/YY)'
                  />
                  <FloatingLabelInput
                    label='cvv'
                    type='text'
                    placeholder='CVV'
                  />
                </div>
              </div>
            )}

            {/* Mobile Wallet Form Options */}
            {selectedPaymentMethod === 'wallet' && (
              <div className='bg-[#F0F9FF] p-2 rounded-md shadow-md'>
                <h4 className='font-semibold text-center mb-2 text-lg'>
                  Choose Your Mobile Wallet
                </h4>
                <div className='grid grid-cols-3 gap-1'>
                  {walletOptions.map(wallet => (
                    <button
                      key={wallet.name}
                      className={`w-full h-12 text-center border rounded-md flex flex-col items-center justify-center transition-all duration-300 ${
                        selectedWallet === wallet.name
                          ? `${wallet.color} border-sky-500`
                          : 'bg-white border-gray-300'
                      }`}
                      onClick={() => setSelectedWallet(wallet.name)}
                    >
                      <img
                        className='h-[70%]'
                        src={wallet.img}
                        alt={`${wallet.name} Logo`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {selectedPaymentMethod === 'cod' && (
              <div className=' bg-[#F0F9FF] p-2 rounded-md shadow-md'>
                <h4 className='font-semibold text-center text-base'>
                  Cash on Delivery
                </h4>
                <p className='text-base text-center'>
                  You will pay in cash when the product is delivered to your
                  doorstep. Please have the exact amount ready for payment.
                </p>
              </div>
            )}

            {/* Order Notes */}
            <div className='bg-sky-50 px-2 py-1 rounded-md'>
              <h2 className='text-base text-center font-semibold mb-2'>
                Order Notes (Optional)
              </h2>
              <textarea
                placeholder='Add any special instructions here...'
                className='w-full p-2 mb-1 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500'
                rows='2'
              />
            </div>
          </div>

          {/* Right Section - Checkout Summary */}
          <div className='w-full md:w-1/3 h-fit sticky top-[160px] self-start px-6 py-4 bg-white rounded-md shadow-xl'>
            <h3 className='text-xl mb-4 font-semibold border-b pb-2'>
              Checkout Summary
            </h3>
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
              <p className='font-semibold text-xl text-red-600'>৳648 Tk.</p>
            </div>

            {/* Voucher / Promo Code */}
            <div
              onClick={() => setActiveVoucherTab(!activeVoucherTab)}
              className='flex mt-4 items-center justify-between cursor-pointer'
            >
              <p>Apply voucher/promo code (If any)</p>
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
                  className='min-w-16 border py-2 text-base md:text-lg outline-primary text-sky7 font-semibold md:font-bold text-center border-sky-300 rounded-md'
                  placeholder='Enter your code'
                />
                <button className='px-4 font-bold font-roboto bg-sky-600 hover:bg-sky-700 transition-all duration-200 text-white rounded-md'>
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to='/order-confirmation'>
              <button className='w-full py-3 mt-4 bg-sky-600 hover:bg-sky-700 transition-all duration-200 text-white text-xl font-semibold rounded-md'>
                Complete Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage1
