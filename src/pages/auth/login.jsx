import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { Link } from 'react-router-dom'

const Login = () => {
  const handleSuccess = credentialResponse => {
    console.log('Google Sign-In Success:', credentialResponse)
    // Send token to backend for verification
  }

  const handleFailure = () => {
    console.log('Google Sign-In Failed')
  }
  return (
    <div>
      <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>
            Sign in to your account
          </h1>
          <p className='mt-2'>
            Don&apos;t have an account
            <Link
              className='font-medium ml-2 text-primary hover:underline'
              to='/register'
            >
              Register
            </Link>
          </p>
        </div>

        <GoogleOAuthProvider clientId='945285134756-4m83sccutbftph0aro9v6f45ir95ki0u.apps.googleusercontent.com'>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
            text='signin_with'
          />
        </GoogleOAuthProvider>

        {/* <CommonForm
      formControls={loginFormControls}
      buttonText={"Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    /> */}
      </div>
    </div>
  )
}

export default Login
