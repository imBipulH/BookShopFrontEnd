import { useState } from 'react'
import { LuFilterX } from 'react-icons/lu'
const categories = [
  { id: 1, name: 'Fiction', parent: 'Books' },
  { id: 2, name: 'Non-Fiction', parent: 'Books' },
  { id: 3, name: 'Comics', parent: 'Books' },
  { id: 4, name: 'Biography', parent: 'Books' },
  { id: 5, name: 'Thriller', parent: 'Books' },
  { id: 6, name: 'Romance', parent: 'Books' },
  { id: 7, name: 'Romance', parent: 'Books' },
  { id: 8, name: 'Romance', parent: 'Books' },
  { id: 9, name: 'Romance', parent: 'Books' },
  { id: 10, name: 'Romance', parent: 'Books' },
  { id: 11, name: 'Romance', parent: 'Books' },
  { id: 12, name: 'Romance', parent: 'Books' }
]

const SelectCategory = () => {
  const [selectedCategories, setSelectedCategories] = useState([])

  const handleCategoryChange = category => {
    const isSelected = selectedCategories.includes(category)
    if (isSelected) {
      // Remove category if already selected
      setSelectedCategories(prev => prev.filter(cat => cat.id !== category.id))
    } else {
      // Add category to the selected list
      setSelectedCategories(prev => [category, ...prev])
    }
  }

  const handleReset = () => {
    setSelectedCategories([])
  }

  // Combine selected and unselected categories
  const sortedCategories = [
    ...selectedCategories,
    ...categories.filter(
      cat => !selectedCategories.find(sel => sel.id === cat.id)
    )
  ]

  return (
    <div className='w-64 border-r px-4 py-6 border rounded-md bg-white'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold mb-1'>Categories</h2>
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
        {sortedCategories.map(category => (
          <li key={category.id}>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                className='form-checkbox h-4 w-4'
                checked={selectedCategories.some(
                  selected => selected.id === category.id
                )}
                onChange={() => handleCategoryChange(category)}
              />
              <span className='text-gray-700'>{category.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectCategory
