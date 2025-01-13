/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import { LuFilterX } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'

const SelectFilter = memo(
  ({ title, options, filters, handleFilter, handleReset, getBooks }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [forceUpdate, setForceUpdate] = useState(false)

    useEffect(() => {
      setForceUpdate(!forceUpdate) // Toggle the forceUpdate state to trigger a re-render
    }, [filters])

    console.log(`Rendering ${title} - Filters:`, filters)

    const handleSearchChange = e => {
      const query = e.target.value.toLowerCase()
      setSearchQuery(query)
    }

    const handleOptionChange = option => {
      const key = title.toLowerCase()
      handleFilter(key, option._id)
      getBooks() // Update books when filter is applied or reset
    }

    const handleOnReset = () => {
      handleReset()
      setSearchQuery('')
    }

    console.log(`Rendering ${filters}`)

    const filteredOptions = options
      .filter(option => option.name.toLowerCase().includes(searchQuery))
      .sort((a, b) => {
        const aSelected = filters[title.toLowerCase()]?.includes(a._id)
        const bSelected = filters[title.toLowerCase()]?.includes(b._id)
        return aSelected === bSelected ? 0 : aSelected ? -1 : 1
      })

    return (
      <div className='w-64 border-r px-4 py-3 border rounded-md bg-white'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-bold mb-1'>{title}</h2>
          <button
            className='mb-1 px-4 py-2 rounded hover:bg-sky-100 transition'
            onClick={handleOnReset}
          >
            <LuFilterX className='text-xl' />
          </button>
        </div>
        {/* Search Input */}
        <div className='relative'>
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={`Search ${title}`}
            className='w-full px-2 py-1 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-1 focus:ring-sky-500'
          />
          {searchQuery && (
            <RxCross2
              onClick={() => setSearchQuery('')}
              className='hover:bg-sky-100 p-1 rounded-md text-2xl duration-150 cursor-pointer absolute top-1 right-1'
            />
          )}
        </div>
        <p className='h-[1px] w-full bg-sky-300 mb-3'></p>

        <ul
          className='space-y-2 max-h-72 overflow-y-auto 
       scrollbar scrollbar-thumb-sky-300 scrollbar-track-sky-100'
        >
          {filteredOptions.map(option => (
            <li key={option._id}>
              <label className='flex items-center space-x-2 px-1 cursor-pointer border border-transparent hover:border-sky-300'>
                <input
                  type='checkbox'
                  className='form-checkbox h-4 w-4'
                  checked={filters[title.toLowerCase()]?.includes(option._id)}
                  onChange={() => handleOptionChange(option)}
                />
                <span className='text-gray-700'>{option.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default SelectFilter
