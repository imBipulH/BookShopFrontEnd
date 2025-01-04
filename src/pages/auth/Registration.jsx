import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '../../components/Layouts/Navbar'
import Footer from '../../components/Layouts/Footer'
import { HandleRegister } from './HandleRegister'

const Registration = () => {
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleSuccess = credentialResponse => {
    console.log('Google Sign-Up Success:', credentialResponse)
    setAlert({ type: 'success', message: 'Google Sign-Up Successful!' })
  }

  const handleFailure = () => {
    console.log('Google Sign-Up Failed')
    setAlert({ type: 'error', message: 'Google Sign-Up Failed. Try again.' })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required.'
    if (!formData.lastName) newErrors.lastName = 'Last name is required.'
    if (!formData.phone) newErrors.phone = 'Phone number is required.'
    if (!formData.email) newErrors.email = 'Email is required.'
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) {
      setAlert({ type: 'error', message: 'Please fix the errors above.' })
      return
    }
    await HandleRegister(formData, setAlert, setErrors)
    console.log('Form Submitted:', formData)
  }

  const inputClass = error =>
    `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm ${
      error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
    }`

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <div className=''>
      <div className=''>
        <Navbar></Navbar>
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 px-4 mt-[100px]'>
          <motion.div
            className='w-full max-w-lg p-8 bg-white rounded-xl shadow-md'
            initial='hidden'
            animate='visible'
            variants={containerVariants}
          >
            <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>
              Create an Account
            </h1>
            {alert.message && (
              <div
                className={`p-4 mb-4 text-sm rounded-lg ${
                  alert.type === 'error'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {alert.message}
              </div>
            )}
            <GoogleOAuthProvider clientId='945285134756-4m83sccutbftph0aro9v6f45ir95ki0u.apps.googleusercontent.com'>
              <div className='flex justify-center mb-6'>
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleFailure}
                  text='signup_with'
                  theme='outline'
                />
              </div>
            </GoogleOAuthProvider>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder='First Name'
                    className={inputClass(errors.firstName)}
                  />
                  {errors.firstName && (
                    <p className='text-sm text-red-600 mt-1'>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder='Last Name'
                    className={inputClass(errors.lastName)}
                  />
                  {errors.lastName && (
                    <p className='text-sm text-red-600 mt-1'>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Phone Number'
                  className={inputClass(errors.phone)}
                />
                {errors.phone && (
                  <p className='text-sm text-red-600 mt-1'>{errors.phone}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Email Address'
                  className={inputClass(errors.email)}
                />
                {errors.email && (
                  <p className='text-sm text-red-600 mt-1'>{errors.email}</p>
                )}
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    className={inputClass(errors.password)}
                  />
                  {errors.password && (
                    <p className='text-sm text-red-600 mt-1'>
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Confirm Password'
                    className={inputClass(errors.confirmPassword)}
                  />
                  {errors.confirmPassword && (
                    <p className='text-sm text-red-600 mt-1'>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <motion.button
                type='submit'
                className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </form>
            <p className='text-sm text-center text-gray-600 mt-4'>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-500 hover:underline'>
                Log in here
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Registration
