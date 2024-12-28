import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer () {
  return (
    <footer className='bg-gradient-to-br from-white-100 to-white-300 py-12 relative z-10'>
      <div className='container mx-auto bg-white rounded-lg p-8'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0'>
          {/* Logo and Trust Info */}
          <div className='text-center md:text-left'>
            <Link to='/'>
              <div className='flex items-center space-x-1'>
                <div className='font-bold text-base sm:text-xl text-sky-600'>
                  BOOKSHOP
                </div>
                <span className='text-gray-500'>.com</span>
              </div>
            </Link>

            <div className='flex items-center mt-2'>
              <span className='text-gray-500 text-sm font-semibold'>
                TrustScore
              </span>
              <div className='ml-2 flex items-center space-x-1'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <FaStar key={index} className='text-yellow-400' size={20} />
                  ))}
              </div>
            </div>

            <p className='mt-2 text-gray-500 text-sm'>457 Reviews</p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className='text-lg font-bold mb-4 text-indigo-600'>Company</h3>
            <ul className='space-y-2 text-gray-700'>
              {['Home', 'Our Story', 'Blog', 'Contact Us'].map(
                (item, index) => (
                  <li
                    key={index}
                    className='hover:text-indigo-600 transition-colors duration-300'
                  >
                    <a href='#' className='hover:underline'>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Orders Section */}
          <div>
            <h3 className='text-lg font-bold mb-4 text-indigo-600'>Orders</h3>
            <ul className='space-y-2 text-gray-700'>
              {[
                'My Orders',
                'Refund Policy',
                'Cancelations',
                'Help Center'
              ].map((item, index) => (
                <li
                  key={index}
                  className='hover:text-indigo-600 transition-colors duration-300'
                >
                  <a href='#' className='hover:underline'>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className='text-lg font-bold mb-4 text-indigo-600'>
              Resources
            </h3>
            <ul className='space-y-2 text-gray-700'>
              {[
                'Why do Customers Love Us',
                'Redeem Argentina and Turkey',
                'How to Sell?',
                'How to Become an Affiliate?'
              ].map((item, index) => (
                <li
                  key={index}
                  className='hover:text-indigo-600 transition-colors duration-300'
                >
                  <a href='#' className='hover:underline'>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className='border-t mt-8 pt-4 border-gray-300 text-center'>
          <p className='text-gray-600 text-xs mt-2'>Book © Copyright 2024</p>
          <div className='flex justify-center space-x-6 mt-2'>
            {['Privacy Policy', 'Terms of Service'].map((item, index) => (
              <a
                key={index}
                href='#'
                className='hover:text-indigo-600 transition-all duration-300'
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
