import { useEffect, useState } from 'react'
import { AddressModal } from '../../components/ui/checkout/SaveAddress'
import { Link } from 'react-router-dom'
import { IoLocationOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { getAddresses, selectAddresses } from '../../store/shop/addressSlice'
import AddressDropdown from '../../components/ui/checkout/AddressDropodown'

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addresses = useSelector(selectAddresses)

  useEffect(() => {
    dispatch(getAddresses())
  }, [dispatch])

  const formatAddress = address => {
    return `${address.name}, ${address.phone}, ${address.city}, ${address.country}, ${address.addressDetails}`
  }

  console.log(addresses)

  const handleAddressSelect = selectedAddressId => {
    setSelectedAddressId(selectedAddressId)
    const addressData = addresses.find(addr => addr._id === selectedAddressId)
    setSelectedAddress(formatAddress(addressData))
  }

  return (
    <div className='checkout-page container mx-auto p-6 mt-36'>
      <div className='flex gap-4'>
        {/* Address Details */}
        <div className='flex-1  address-details bg-white shadow-md p-6 rounded-md mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Address Details</h2>

          <div className='flex gap-2'>
            <IoLocationOutline className='p-2 text-4xl bg-sky-200 rounded-md duration-150' />
            <p>{selectedAddress}</p>
          </div>

          <label className='block text-gray-700 mb-2'>Choose an Address:</label>
          <div className='App'>
            <AddressDropdown
              addresses={addresses}
              selectedAddress={selectedAddressId}
              handleAddressSelect={handleAddressSelect}
            />
          </div>

          <button
            className='bg-blue-500 text-white py-2 px-4 rounded-md'
            onClick={() => setIsModalOpen(true)}
          >
            Add New Address
          </button>
        </div>
        {/* Checkout Summary */}
        <div className=' md:w-1/3 h-fit shadow-xl px-6 py-4 bg-white'>
          <h3 className='text-xl mb-2 border-b pb-2'>Checkout Summary</h3>
          <div className='flex justify-between items-center text-base'>
            {/* <p>
              Subtotal (Qty:{' '}
              {cart
                ?.filter(item => item.isMarked)
                .reduce((total, item) => total + item.quantity, 0)}{' '}
              )
            </p>
            <p>TK {subtotal}</p> */}
          </div>
          <div className='flex justify-between items-center text-base border-b py-2'>
            <p>Shipping Fee</p>
            {/* <p>{`TK ${shippingFee}`}</p> */}
          </div>
          <div className='mt-2 flex justify-between items-center text-base'>
            <p>Total</p>
            {/* <p>{`TK ${totalAmount}`}</p> */}
          </div>
          <div
            // ref={contentRef}
            // style={{
            //   maxHeight: activeVoucherTab
            //     ? `${contentRef.current?.scrollHeight}px`
            //     : '0px',
            //   overflow: 'hidden',
            //   transition: 'max-height 0.3s ease-out'
            // }}
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
          <Link to='/checkout'>
            <button className='w-full py-3 mt-2 bg-sky-600 hover:bg-sky-700 transition-all duration-200 text-white text-xl font-semibold rounded-md'>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
      {/* Products Section */}
      <div className='product-details bg-white shadow-md p-6 rounded-md mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Products</h2>
        <div className='flex justify-between items-center text-gray-700 border-b pb-2 mb-2'>
          <p>Book Title 1</p>
          <p>$25.00</p>
        </div>
        <div className='flex justify-between items-center text-gray-700 border-b pb-2 mb-2'>
          <p>Book Title 2</p>
          <p>$25.00</p>
        </div>
      </div>

      {/* Payment Options */}
      <div className='payment-options bg-white shadow-md p-6 rounded-md mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Payment Options</h2>
        <label className='flex items-center mb-4'>
          <input type='radio' name='payment' value='ssl' className='mr-2' />
          SSL Commerce
        </label>
        <label className='flex items-center mb-4'>
          <input type='radio' name='payment' value='cod' className='mr-2' />
          Cash on Delivery
        </label>
      </div>

      {/* Confirm Order */}
      <button className='bg-green-500 text-white py-2 px-6 rounded-md w-full'>
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
