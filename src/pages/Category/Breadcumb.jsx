/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const Breadcrumb = ({ items, onRemove }) => {
  return (
    <nav className='text-gray-700' aria-label='Breadcrumb'>
      <ul className='flex flex-wrap items-center gap-1'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center text-sm md:text-base'>
            {index == 1 && <span className='mr-1'>/</span>}
            {index == 2 && <span className='mr-1'>/</span>}
            {item.path ? (
              <Link to={item.path} className='text-sky-600 hover:underline'>
                {item.label}
              </Link>
            ) : (
              <button
                className='text-gray-500 hover:underline bg-white px-2 my-1 rounded-full'
                onClick={() => onRemove(item.label)}
              >
                {item.label} ✕
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumb
