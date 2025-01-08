/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const Breadcrumb = ({ items }) => {
  return (
    <nav className='text-gray-700' aria-label='Breadcrumb'>
      <ul className='flex items-center gap-2'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center text-sm md:text-lg'>
            {index !== 0 && <span className='mx-2'>/</span>}
            {item.path ? (
              <Link to={item.path} className='text-sky-600 hover:underline'>
                {item.label}
              </Link>
            ) : (
              <p className='text-gray-500'>{item.label}</p>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumb
