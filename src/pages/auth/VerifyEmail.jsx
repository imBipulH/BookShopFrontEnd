import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import axiosInstance from '../../utils/axiosInstance'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('loading') // 'loading', 'success', 'error'
  const hasVerified = useRef(false)

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')
      if (!token) {
        setMessage('Invalid or missing verification token.')
        setStatus('error')
        return
      }

      if (hasVerified.current) {
        setMessage('Email already verified.')
        setStatus('success')
        return
      }
      hasVerified.current = true

      try {
        const response = await axiosInstance.get(`/verify-email?token=${token}`)

        console.log(response.data.message)

        setMessage(response.data.message)
        setStatus('success')
      } catch (error) {
        if (error) {
          setMessage(error.response?.data?.error || 'Verification failed.')
          setStatus('error')
        }
      }
    }

    verifyEmail()
  }, [searchParams])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='p-6 bg-white shadow rounded-md max-w-md text-center'>
        <h1 className='text-2xl font-semibold'>
          {status === 'loading'
            ? 'Verifying...'
            : status === 'success'
            ? 'Success!'
            : 'Error'}
        </h1>
        <p className='mt-4 text-gray-700'>{message}</p>
        {status === 'success' && (
          <a
            href='/login'
            className='mt-4 inline-block text-blue-500 underline hover:text-blue-700'
          >
            Go to Login
          </a>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
