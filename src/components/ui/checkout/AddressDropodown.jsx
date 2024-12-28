/* eslint-disable react/prop-types */

import Select from 'react-select'

// Format Address Function
const formatAddress = address => {
  return `${address.name}, ${address.phone}, ${address.city}, ${address.country}, ${address.addressDetails}`
}

const AddressDropdown = ({
  addresses,
  selectedAddress,
  handleAddressSelect
}) => {
  // Convert addresses to options for react-select
  const options = addresses.map(address => ({
    value: address._id,
    label: formatAddress(address)
  }))

  // Custom styles for react-select to support multi-line options
  const customStyles = {
    option: provided => ({
      ...provided,
      whiteSpace: 'pre-wrap'
    }),
    singleValue: provided => ({
      ...provided,
      whiteSpace: 'pre-wrap'
    })
  }

  return (
    <Select
      className='w-full'
      value={options.find(option => option.value === selectedAddress)}
      onChange={option => handleAddressSelect(option.value)}
      options={options}
      styles={customStyles}
      placeholder='Select an Address'
    />
  )
}

export default AddressDropdown
