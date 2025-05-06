import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, User, Briefcase, Mail, Lock, AlertCircle } from 'lucide-react'

function Login({ onLogin }) {
  const [userType, setUserType] = useState('customer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, type: userType }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }
      
      onLogin(data.user)
      
      // Redirect based on user type
      if (data.user.type === 'customer') {
        window.location.href = '/customer'
      } else {
        window.location.href = '/service-provider'
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <motion.div
      className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-center mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <LogIn className="text-blue-500 mr-2" size={28} />
        <h2 className="text-2xl font-bold text-center">Login to Pragrati Mitar</h2>
      </motion.div>
      
      {error && (
        <motion.div 
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="mr-2" size={18} />
          {error}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="relative flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <motion.button
              type="button"
              className={`flex-1 py-3 px-4 flex items-center justify-center ${userType === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setUserType('customer')}
              whileHover={{ backgroundColor: userType === 'customer' ? '#3b82f6' : '#e5e7eb' }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="mr-2" size={18} />
              Customer
            </motion.button>
            <motion.button
              type="button"
              className={`flex-1 py-3 px-4 flex items-center justify-center ${userType === 'service-provider' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setUserType('service-provider')}
              whileHover={{ backgroundColor: userType === 'service-provider' ? '#3b82f6' : '#e5e7eb' }}
              whileTap={{ scale: 0.98 }}
            >
              <Briefcase className="mr-2" size={18} />
              Service Provider
            </motion.button>
          </div>
          <motion.div 
            className="h-1 bg-blue-500 rounded-full mt-1"
            initial={{ width: userType === 'customer' ? '50%' : '100%', x: userType === 'customer' ? 0 : '100%' }}
            animate={{ 
              width: '50%', 
              x: userType === 'customer' ? 0 : '100%' 
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
        
        <motion.div 
          className="mb-4"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-400" size={18} />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-6"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="text-gray-400" size={18} />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>
        </motion.div>
        
        <motion.button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          whileHover={{ backgroundColor: '#3b82f6', scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <LogIn className="mr-2" size={18} />
          Login
        </motion.button>
      </form>
    </motion.div>
  )
}

export default Login