/* eslint-disable react/prop-types */

const Products = ({ item }) => {
  const calculatePrice = item => {
    if (item?.productId?.discountPercentage > 0) {
      return (
        <p className=' md:text-xl font-semibold'>
          {`TK ${item?.productId?.discountPrice}`}
        </p>
      )
    }
    return (
      <p className='md:text-xl font-semibold'>
        {`TK ${item?.productId?.price}`}
      </p>
    )
  }

  return (
    <div className='grid grid-cols-2 justify-between  items-center text-gray-700 border-b pb-2 mb-2'>
      <div className='flex justify-start items-center gap-2'>
        <div className='flex items-center justify-center w-10 h-16 md:h-20 md:w-16'>
          <img
            src={
              item?.productId?.coverImage ||
              'https://via.placeholder.com/150x150'
            }
            className='h-full object-cover'
          />
        </div>
        <p className='text-xs md:text-base'>{item?.productId?.title}</p>
      </div>
      <div className='flex gap-2 md:gap-6 text-xs md:text-base items-center justify-between'>
        <p className='flex text-xs md:text-base font-semibold'>
          <span className='mr-2 hidden'>Unit Price:</span>{' '}
          {calculatePrice(item)}
        </p>
        <p className='md:text-xl font-semibold'>{`Qty: ${item?.quantity}`}</p>
        <p className='md:text-xl font-semibold'>
          TK{' '}
          {(item?.productId?.discountPercentage > 0
            ? item?.productId?.discountPrice
            : item?.productId?.price) * item?.quantity}
        </p>
      </div>
    </div>
  )
}

export default Products
