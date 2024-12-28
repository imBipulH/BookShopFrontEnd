import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginUser,
  selectAuthError,
  selectAuthLoading,
  selectAuthSuccess
} from '../../store/shop/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(selectAuthLoading)
  const authSuccess = useSelector(selectAuthSuccess)
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: false, password: false })

  console.log('authSuccess', authSuccess)

  useEffect(() => {
    if (authSuccess) {
      setAlert({ type: 'success', message: 'Login Successful!' })
      navigate('/')
    }
  }, [authSuccess, navigate])

  const error = useSelector(selectAuthError)
  console.log('AuthError', error)

  const handleSuccess = credentialResponse => {
    console.log('Google Sign-In Success:', credentialResponse)
    setAlert({ type: 'success', message: 'Google Sign-In Successful!' })
  }

  const handleFailure = () => {
    console.log('Google Sign-In Failed')
    setAlert({ type: 'error', message: 'Google Sign-In Failed. Try again.' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    let validationErrors = { email: false, password: false }
    if (!identifier) {
      validationErrors.email = true
    }
    if (!password || password.length < 6) {
      validationErrors.password = true
    }
    setErrors(validationErrors)
    if (validationErrors.email || validationErrors.password) {
      setAlert({
        type: 'error',
        message: 'Please correct the highlighted errors.'
      })
      return
    }

    // Dispatch Redux action for login
    try {
      dispatch(loginUser({ identifier, password }))
    } catch (err) {
      console.log('Login Failed:', err)
      setAlert({
        type: 'error',
        message: err || 'Login failed. Please try again.'
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 }
  }

  return (
    <div className=''>
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 mt-[100px]'>
        <motion.div
          className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg'
          initial='hidden'
          animate='visible'
          variants={containerVariants}
        >
          <motion.div
            className='text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className='text-3xl font-extrabold text-gray-900 mb-2'>
              Welcome Back!
            </h1>
          </motion.div>

          {alert.message && (
            <motion.div
              className={`p-4 mb-4 text-sm rounded-lg ${
                alert.type === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {alert.message}
            </motion.div>
          )}

          {error && error.message !== 'Not authenticated' && (
            <motion.div
              className='p-4 mb-4 text-sm rounded-lg bg-red-100 text-red-700'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error.error || error.message}
            </motion.div>
          )}

          <GoogleOAuthProvider clientId='YOUR_GOOGLE_CLIENT_ID'>
            <motion.div
              className='flex justify-center mt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                text='signin_with'
                theme='outline'
              />
            </motion.div>
          </GoogleOAuthProvider>

          {error && <p></p>}

          <motion.form
            className='space-y-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
          >
            {/* Email Input */}
            <div>
              <label htmlFor='email' className='block text-gray-700 text-sm'>
                Email Address or Phone
              </label>
              <input
                type='text'
                id='text'
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder='Enter your email or phone'
                required
                className={`w-full mt-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                } transition-all`}
              />
              {errors.email && (
                <p className='text-red-500 mt-1 text-sm'>Email is required.</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor='password' className='block text-gray-700 text-sm'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter your password'
                required
                className={`w-full mt-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                } transition-all`}
              />
              {errors.password && (
                <p className='text-red-500 mt-1 text-sm'>
                  Password must be at least 6 characters long.
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-blue-600 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 text-gray-900'>
                  Remember me
                </label>
              </div>

              <Link
                to='/ForgetPassword'
                className='text-sm font-medium text-blue-600 hover:text-blue-500'
              >
                Forgot your password?
              </Link>
            </div>

            {/* Sign In Button */}
            <motion.button
              type='submit'
              className={`w-full py-2 mt-4 ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white rounded-lg shadow-md focus:outline-none`}
              variants={buttonVariants}
              whileHover={!loading && 'hover'}
              whileTap={!loading && 'tap'}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </motion.button>

            <p className='mt-2 text-center text-gray-600'>
              Don&apos;t have an account?{' '}
              <Link
                to='/registration'
                className='text-blue-600 font-medium hover:text-blue-500'
              >
                Register here
              </Link>
            </p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
