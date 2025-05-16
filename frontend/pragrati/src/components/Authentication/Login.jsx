import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LogIn, 
  User, 
  Briefcase, 
  Mail, 
  Lock, 
  AlertCircle,
  Moon,
  Star
} from 'lucide-react'

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
      
      if (data.user.type === 'customer') {
        window.location.href = '/customer'
      } else {
        window.location.href = '/service-provider'
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-blue-500 opacity-10"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          transition={{ 
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
          }}
        />
      ))}

      <motion.div 
        className="absolute top-10 right-10 text-blue-400"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <Moon size={24} />
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-10 text-purple-400"
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Star size={20} />
      </motion.div>
      
      <motion.div
        className="max-w-md w-full backdrop-blur-xl bg-gray-800/60 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="relative px-6 pt-6 pb-4"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-t-2xl"
            animate={{ 
              background: ["linear-gradient(to right, #3b82f6, #8b5cf6)", "linear-gradient(to right, #8b5cf6, #3b82f6)"] 
            }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <div className="flex items-center justify-center mb-2">
            <motion.div
              className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <LogIn className="text-white" size={22} />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-1">Welcome Back</h2>
          <p className="text-center text-gray-400 text-sm">Login to Pragrati Mitar</p>
        </motion.div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              className="mx-6 bg-red-900/40 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-4 flex items-center"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="mr-2 text-red-400 flex-shrink-0" size={18} />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="mb-6">
            <div className="relative bg-gray-700/50 rounded-xl p-1 backdrop-blur-sm">
              <div className="relative z-10 flex">
                <motion.button
                  type="button"
                  className={`flex-1 py-3 px-4 flex items-center justify-center rounded-lg text-sm transition-colors ${userType === 'customer' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => setUserType('customer')}
                  whileHover={{ color: '#fff' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="mr-2" size={16} />
                  Customer
                </motion.button>
                <motion.button
                  type="button"
                  className={`flex-1 py-3 px-4 flex items-center justify-center rounded-lg text-sm transition-colors ${userType === 'service-provider' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => setUserType('service-provider')}
                  whileHover={{ color: '#fff' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Briefcase className="mr-2" size={16} />
                  Service Provider
                </motion.button>
              </div>
              <motion.div 
                className="absolute top-0 left-0 bottom-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                initial={{ width: '50%', x: userType === 'customer' ? 0 : '100%' }}
                animate={{ x: userType === 'customer' ? 0 : '100%' }}
                style={{ width: '50%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>
          
          <motion.div 
            className="mb-5"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 px-4 py-3 bg-gray-700/50 border border-gray-600 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your@email.com"
                required
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-6"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-4 py-3 bg-gray-700/50 border border-gray-600 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
                required
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
          
          
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center shadow-lg"
            whileHover={{ 
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
              scale: 1.02
            }}
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
    </div>
  )
}

export default Login