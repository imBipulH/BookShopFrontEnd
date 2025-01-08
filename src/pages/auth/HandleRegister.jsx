import axiosInstance from '../../utils/axiosInstance' // Import your Axios setup

export const HandleRegister = async (formData, setAlert, setErrors) => {
  try {
    // Clear previous errors
    setErrors({})
    setAlert({ type: '', message: '' })

    // Send the form data to the backend
    const response = await axiosInstance.post('register', formData)
    console.log(response)

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
    console.log(error.response)

    // Handle validation errors from backend
    if (error.response) {
      if (error.response.status === 400) {
        console.log('Error.res.data.msg', error.response.data.message)

        setAlert({
          type: 'error',
          message: error.response.data.message || 'Bad Request'
        })
      } else {
        setAlert({
          type: 'error',
          message: 'Registration failed (****). Please try again later.'
        })
      }
    } else {
      // Network or unexpected error
      setAlert({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      })
    }
  }
}
