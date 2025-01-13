/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { AddressModal } from '../../components/ui/checkout/SaveAddress'
import { IoLocationOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { getAddresses, selectAddresses } from '../../store/shop/addressSlice'
import AddressDropdown from '../../components/ui/checkout/AddressDropodown'
import { IoMdCash } from 'react-icons/io'
import { FaCreditCard, FaWallet } from 'react-icons/fa'
import CheckoutSummery from '../../components/ui/checkout/CheckoutSummery'
import Products from '../../components/ui/checkout/Products'
import bkashLogo from '../../../src/assets/bkash.png'
import nagadLogo from '../../../src/assets/nagad.png'
import rocketLogo from '../../../src/assets/rocket.png'
import { createOrder } from '../../store/shop/orderSlice'
// import sslCardsLogo from '../../../src/assets/rok-ssl-card-icon.png.png'

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

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const addresses = useSelector(selectAddresses)
  const { cart } = useSelector(state => state.cart)

  console.log(selectedAddress)

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card')
  const [selectedWallet, setSelectedWallet] = useState('')

  const walletOptions = [
    { name: 'bKash', color: 'bg-red-100', img: bkashLogo },
    {
      name: 'Nagad',
      color: 'bg-orange-100',
      img: nagadLogo
    },
    {
      name: 'Rocket',
      color: 'bg-purple-100',
      img: rocketLogo
    }
  ]

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

  useEffect(() => {
    dispatch(getAddresses())
  }, [dispatch])

  const formatAddress = address => {
    return `${address.name}, ${address.phone}, ${address.city}, ${address.country}, ${address.addressDetails}`
  }

  const handleAddressSelect = selectedAddressId => {
    setSelectedAddressId(selectedAddressId)
    const addressData = addresses.find(addr => addr._id === selectedAddressId)
    setSelectedAddress(formatAddress(addressData))
  }

  const handleConfirmOrder = () => {
    if (!selectedAddressId) {
      alert('Please select an address')
      return
    }
    if (!cart || cart.length === 0 || !cart?.some(item => item.isMarked)) {
      alert('No items selected for checkout')
      return
    }

    const markedItems = cart.filter(item => item.isMarked)

    const orderData = {
      shippingAddressId: selectedAddressId,
      items: markedItems.map(item => ({
        productId: item._id,
        quantity: item.quantity
      })),
      paymentMethod: selectedPaymentMethod,
      wallet: selectedPaymentMethod === 'Wallet' ? selectedWallet : null,
      orderNotes: orderNotes
    }
    console.log('orderData', orderData)

    dispatch(createOrder(orderData))
      .unwrap()
      .then(response => {
        alert('Order placed successfully')
        console.log(response)
      })
      .catch(error => {
        console.error(error)
        alert(`Failed to place order: ${error.message}`)
      })
  }

  return (
    <div className='checkout-page container mx-auto p-2 md:p-6 mt-12 md:mt-36'>
      <div className='flex flex-col md:flex-row gap-4'>
        {/* Address Details */}
        <div className='flex-1  address-details bg-white shadow-md p-6 rounded-md mb-6'>
          <div
            className=' flex items-center justify-between
          mb-4'
          >
            <h2 className='text-base md:text-xl font-semibold'>
              Address Details
            </h2>
          </div>

          <div className='flex gap-2 items-center mb-2'>
            <div className='flex items-center justify-center aspect-square h-6 bg-sky-200 rounded-md '>
              <IoLocationOutline className='text-xl' />
            </div>
            <label className='block text-sm text-gray-700'>
              Choose an Address:
            </label>
            <button
              className='bg-sky-100 ml-auto text-xs sm:text-sm text-sky-800 py-1 px-2 rounded-md'
              onClick={() => setIsModalOpen(true)}
            >
              Add New Address
            </button>
          </div>
          {/* <p>{selectedAddress}</p> */}
          <div className='flex flex-col'>
            <div className='App'>
              <AddressDropdown
                addresses={addresses}
                selectedAddress={selectedAddressId}
                handleAddressSelect={handleAddressSelect}
              />
            </div>{' '}
          </div>
        </div>
        {/* Checkout Summary */}
        {windowWidth > 767 && <CheckoutSummery cart={cart} />}
      </div>

      {/* Products Section */}
      <div className='product-details bg-white shadow-md p-2 md:p-6 rounded-md mb-6'>
        <h2 className='text-xl font-semibold mb-2 md:mb-4'>Products</h2>
        {cart && cart.length > 0
          ? cart
              ?.filter(item => item.isMarked)
              .map(item => <Products key={item._id} item={item} />)
          : null}
      </div>

      {/* Payment Options */}
      <div>
        <div className=' bg-sky-50 p-2 rounded-md shadow-md'>
          <h4 className='font-semibold mb-2 text-center text-lg text-gray-800'>
            Select Payment Method
          </h4>
          <div className='grid grid-cols-3 gap-1'>
            <PaymentButton
              name='Card'
              title='Credit/Debit Card'
              icon={<FaCreditCard className='text-2xl' />}
              onClick={() => setSelectedPaymentMethod('Card')}
            />
            <PaymentButton
              name='Wallet'
              title='Mobile Wallet'
              icon={<FaWallet className='text-2xl' />}
              onClick={() => setSelectedPaymentMethod('Wallet')}
            />
            <PaymentButton
              name='Cash-on-delivery'
              title='Cash on delivery'
              icon={
                <IoMdCash className='text-3xl' />
                // <img
                //   src='../../../src/assets/cash-on-delivery.png'
                //   className='h-6'
                // />
              }
              onClick={() => setSelectedPaymentMethod('Cash-on-delivery')}
            />
          </div>
        </div>

        {/* Card Payment Form */}
        {selectedPaymentMethod === 'Card' && (
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
              <FloatingLabelInput label='cvv' type='text' placeholder='CVV' />
            </div>
          </div>
        )}

        {/* Mobile Wallet Form Options */}
        {selectedPaymentMethod === 'Wallet' && (
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
        {selectedPaymentMethod === 'Cash-on-delivery' && (
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
            onChange={e => setOrderNotes(e.target.value)}
            placeholder='Add any special instructions here...'
            className='w-full p-2 mb-1 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-500'
            rows='2'
          />
        </div>
      </div>

      {windowWidth < 768 && <CheckoutSummery cart={cart} />}

      {/* Confirm Order */}
      <button
        onClick={handleConfirmOrder}
        className='bg-sky-600 hidden md:block text-white py-3 px-6 rounded-md w-full'
      >
        Confirm Order
      </button>

      {/* Address Modal */}
      {isModalOpen && (
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default CheckoutPage
