import axiosInstance from '../../utils/axiosInstance' // Import your Axios setup

export const HandleRegister = async (formData, setAlert, setErrors) => {
  try {
    // Clear previous errors
    setErrors({})
    setAlert({ type: '', message: '' })

    // Send the form data to the backend
    const response = await axiosInstance.post('register', formData)

    // Handle success
    if (response.status === 201) {
      setAlert({
        type: 'success',
        message: 'Account created successfully! Please verify your email.'
      })
    } else {
      setAlert({
        type: 'error',
        message: response.data.message || 'Something went wrong.'
      })
    }
  } catch (error) {
    // Handle validation errors from backend
    if (error.response?.data?.errors) {
      const apiErrors = error.response.data.errors.reduce((acc, curr) => {
        acc[curr.field] = curr.message
        return acc
      }, {})
      setErrors(apiErrors)
    } else {
      // General error
      setAlert({
        type: 'error',
        message: 'Registration failed. Please try again later.'
      })
    }
  }
}
