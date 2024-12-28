import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError(true);
      setAlert({ type: 'error', message: 'Please provide a valid email address.' });
      return;
    }

    setError(false);
    setAlert({ type: 'success', message: 'Password reset link sent to your email.' });
    console.log('Password Reset Request Submitted:', { email });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="">
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 flex flex-col items-center justify-center">
      <Navbar />

      <motion.div
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-10 mt-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Reset Your Password</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Enter your email address to receive a password reset link.
          </p>
        </motion.div>

        {/* Alert Messages */}
        {alert.message && (
          <motion.div
            className={`p-4 mb-4 rounded-lg text-sm ${alert.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {alert.message}
          </motion.div>
        )}

        {/* Email Input */}
        <motion.form
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={`w-full px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {error && <p className="text-red-500 mt-1 text-sm">Invalid email address.</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg shadow-md mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Send Reset Link
          </motion.button>

          {/* Link back to Login */}
          <p className="mt-2 text-gray-600 text-center">
            Remembered your password?
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:text-blue-500"
            >
              Go back to login
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
      <Footer></Footer>
</div>
  );
};

export default ForgetPassword;
