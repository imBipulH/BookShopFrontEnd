import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../store/shop/orderSlice'

const MyOrders = () => {
  const { order } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrder())
  }, [])

  console.log(order)

  return (
    <div>
      {' '}
      <div className='bg-global_bg pt-28 md:pt-40 pb-8'>
        <div className='container'>
          <div className=''>
            <h1 className='text-center py-2 sm:py-4 sm:text-2xl sm:font-semibold bg-sky-100'>
              My Orders
            </h1>
            {order?.map(order => (
              <div key={order._id} className='px-4 py-2 bg-sky-100 mb-4'>
                <div className='flex gap-20 bg-white p-4 text-xl rounded-lg'>
                  <div>
                    <p className='font-semibold'>
                      Order Id: <span>{order?._id}</span>
                    </p>
                    <p>{`${order?.items?.length} items`}</p>
                  </div>
                  <p>{`BDT ${order?.totalPrice}`}</p>
                  <div className='flex flex-col text-xl'>
                    <p>{`Order Status: ${order?.status}`}</p>
                    <p>{`Order Date: ${new Date(
                      order?.createdAt
                    ).toLocaleDateString()}`}</p>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='flex-1 text-xl '>
                    {order && (
                      <div className='grid grid-cols-4 p-4 font-semibold'>
                        <p>Item Details</p>
                        <p>Qty</p>
                        <p>Price</p>
                      </div>
                    )}
                    {order?.items?.map(item => (
                      <div
                        key={item._id}
                        className='grid grid-cols-4 p-4 text-xl'
                      >
                        <div className='flex gap-2'>
                          <div className='h-20 w-16'>
                            <img
                              alt={item?.productId?.title}
                              src={item?.productId?.coverImage}
                              className='h-full object-cover'
                            />
                          </div>
                          <div>
                            <p className='text-2xl'>{item?.productId?.title}</p>
                            <p className='text-lg'>
                              by <span>{item?.productId?.author?.name}</span>
                            </p>
                          </div>
                        </div>
                        <p>{item?.quantity}</p>
                        <p>{item?.productId?.price}</p>
                      </div>
                    ))}
                  </div>
                  <div>Shipping Address & Order Details</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyOrders
