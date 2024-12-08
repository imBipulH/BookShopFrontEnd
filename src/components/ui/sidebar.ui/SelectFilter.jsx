/* eslint-disable react/prop-types */
import { useState } from 'react'
import { LuFilterX } from 'react-icons/lu'

const SelectFilter = ({ title, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleOptionChange = option => {
    const isSelected = selectedOptions.includes(option)
    if (isSelected) {
      // Remove option if already selected
      setSelectedOptions(prev => prev.filter(opt => opt.id !== option.id))
    } else {
      // Add option to the selected list
      setSelectedOptions(prev => [option, ...prev])
    }
  }

  const handleReset = () => {
    setSelectedOptions([])
  }

  // Combine selected and unselected options
  const sortedOptions = [
    ...selectedOptions,
    ...options.filter(opt => !selectedOptions.find(sel => sel.id === opt.id))
  ]

  return (
    <div className='w-64 border-r px-4 py-3 border rounded-md bg-white'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold mb-1'>{title}</h2>
        <button
          className='mb-1 px-4 py-2 rounded hover:bg-sky-100 transition'
          onClick={handleReset}
        >
          <LuFilterX className='text-xl' />
        </button>
      </div>
      <p className='h-[1px] w-full bg-sky-300 mb-3'></p>
      <ul
        className='space-y-2 max-h-72 overflow-y-auto 
       scrollbar scro scrollbar-thumb-sky-300 scrollbar-track-sky-100'
      >
        {sortedOptions.map(option => (
          <li key={option.id}>
            <label className='flex items-center space-x-2 px-1 cursor-pointer border border-transparent hover:border-sky-300'>
              <input
                type='checkbox'
                className='form-checkbox h-4 w-4'
                checked={selectedOptions.some(
                  selected => selected.id === option.id
                )}
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

export default SelectFilter
