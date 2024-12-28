/* eslint-disable react/prop-types */

export const AddressModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const handleBackdropClick = e => {
    // Close modal if clicked outside the modal content
    if (e.target.id === 'backdrop') onClose()
  }

  return (
    <div
      id='backdrop'
      className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
      onClick={handleBackdropClick}
    >
      <div className='bg-white rounded-lg w-1/2 p-6 shadow-lg relative'>
        <h2 className='text-xl font-bold mb-4'>Add New Shipping Address</h2>
        <form>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 mb-2'>Full Name</label>
              <input
                type='text'
                placeholder='Enter your first and last name'
                className='w-full border border-gray-300 rounded p-2'
              />
            </div>
            <div></div>
            <div>
              <label className='block text-gray-700 mb-2'>Phone Number</label>
              <input
                type='text'
                placeholder='Enter your phone number'
                className='w-full border border-gray-300 rounded p-2'
              />
            </div>
            <div>
              <label className='block text-gray-700 mb-2'>
                Alternative Phone Number
              </label>
              <input
                type='text'
                placeholder='Enter your phone number'
                className='w-full border border-gray-300 rounded p-2'
              />
            </div>
            <div>
              <label className='block text-gray-700 mb-2'>Region</label>
              <select className='w-full border border-gray-300 rounded p-2'>
                <option value='Dhaka'>Dhaka</option>
                <option value='Chittagong'>Chittagong</option>
              </select>
            </div>
            <div>
              <label className='block text-gray-700 mb-2'>City</label>
              <select className='w-full border border-gray-300 rounded p-2'>
                <option value='Dhaka-North'>Dhaka - North</option>
                <option value='Dhaka-South'>Dhaka - South</option>
              </select>
            </div>
            <div>
              <label className='block text-gray-700 mb-2'>Area</label>
              <input
                type='text'
                placeholder='Please choose your area'
                className='w-full border border-gray-300 rounded p-2'
              />
            </div>
            <div>
              <label className='block text-gray-700 mb-2'>
                Building/Street
              </label>
              <input
                type='text'
                placeholder='Building/House No/Floor/Street'
                className='w-full border border-gray-300 rounded p-2'
              />
            </div>
          </div>
          <div className='mt-4'>
            <label className='block text-gray-700 mb-2'>Address Details</label>
            <textarea
              placeholder='Example: House#123, Street#123, ABC Road'
              className='w-full border border-gray-300 rounded p-2'
            ></textarea>
          </div>
          <div className='mt-4'>
            <label className='block text-gray-700 mb-2'>Select Label</label>
            <div className='flex gap-4'>
              <button
                type='button'
                className='flex-1 border border-blue-500 text-blue-500 py-2 rounded flex items-center justify-center'
              >
                OFFICE
              </button>
              <button
                type='button'
                className='flex-1 border border-red-500 text-red-500 py-2 rounded flex items-center justify-center'
              >
                HOME
              </button>
            </div>
          </div>
          <div className='mt-6 flex justify-end gap-4'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 text-gray-700 py-2 px-4 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-6 rounded'
            >
              Save
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          &times;
        </button>
      </div>
    </div>
  )
}

// const CheckoutPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   return (
//     <div className='p-6'>
//       <button
//         className='bg-blue-500 text-white py-2 px-4 rounded'
//         onClick={() => setIsModalOpen(true)}
//       >
//         Add New Address
//       </button>
//       <AddressModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </div>
//   )
// }

// export default CheckoutPage
