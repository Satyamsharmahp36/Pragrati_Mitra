import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, User, Briefcase, Mail, Lock, MapPin, Phone, 
  Home, Award, DollarSign, FileText, AlertCircle, 
  ArrowLeft, ArrowRight, Check 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Register({ onLogin }) {
  const [userType, setUserType] = useState('customer')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    location: '',
    state: '',
  })
  
  // Additional fields for service providers
  const [serviceData, setServiceData] = useState({
    serviceType: '',
    experience: '',
    hourlyRate: '',
    description: '',
  })
  
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleServiceDataChange = (e) => {
    const { name, value } = e.target
    setServiceData({ ...serviceData, [name]: value })
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you might want to convert these coordinates to an address
          // For simplicity, we'll just store the coordinates
          setFormData({
            ...formData,
            location: `${position.coords.latitude},${position.coords.longitude}`
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          setError("Could not get your location. Please enter it manually.")
        }
      )
    } else {
      setError("Geolocation is not supported by this browser.")
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }
    
    try {
      // Combine form data for service providers
      const userData = userType === 'service-provider' 
        ? { ...formData, ...serviceData, type: userType }
        : { ...formData, type: userType }
      
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }
      
      onLogin(data.user)
      
      // Redirect based on user type
      if (data.user.type === 'customer') {
        navigate('/customer')
      } else {
        navigate('/service-provider')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  // Progress indicator
  const totalSteps = userType === 'service-provider' ? 3 : 2
  const progress = (step / totalSteps) * 100

  // Variants for animations
  const pageVariants = {
    initial: { 
      opacity: 0,
      x: 100,
    },
    in: { 
      opacity: 1,
      x: 0,
    },
    out: { 
      opacity: 0,
      x: -100,
    }
  }

  const pageTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
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
        <UserPlus className="text-blue-500 mr-2" size={28} />
        <h2 className="text-2xl font-bold text-center">Register for Pragrati Mitar</h2>
      </motion.div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Step {step} of {totalSteps}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <motion.div 
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></motion.div>
          </div>
        </div>
      </div>
      
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
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
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
                    Register as Customer
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`flex-1 py-3 px-4 flex items-center justify-center ${userType === 'service-provider' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setUserType('service-provider')}
                    whileHover={{ backgroundColor: userType === 'service-provider' ? '#3b82f6' : '#e5e7eb' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Briefcase className="mr-2" size={18} />
                    Register as Service Provider
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
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
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-6"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.button
                type="button"
                onClick={nextStep}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                whileHover={{ backgroundColor: '#3b82f6', scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Next
                <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <motion.div 
                className="mb-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
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
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-6"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  Location
                </label>
                <div className="relative flex">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your location or use GPS"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={getLocation}
                    className="bg-gray-300 hover:bg-gray-400 px-4 rounded-r-lg flex items-center justify-center"
                    whileHover={{ backgroundColor: '#d1d5db' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapPin size={18} />
                  </motion.button>
                </div>
              </motion.div>
              
              {userType === 'customer' ? (
                <motion.div 
                  className="flex justify-between"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center"
                    whileHover={{ backgroundColor: '#d1d5db', scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="mr-2" size={18} />
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                    whileHover={{ backgroundColor: '#3b82f6', scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register
                    <Check className="ml-2" size={18} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                  whileHover={{ backgroundColor: '#3b82f6', scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Next
                  <ArrowRight className="ml-2" size={18} />
                </motion.button>
              )}
            </motion.div>
          )}
          
          {step === 3 && userType === 'service-provider' && (
            <motion.div
              key="step3"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <motion.div 
                className="mb-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceType">
                  Service Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="text-gray-400" size={18} />
                  </div>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={serviceData.serviceType}
                    onChange={handleServiceDataChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="chef">Chef</option>
                    <option value="gardener">Gardener</option>
                    <option value="plumber">Plumber</option>
                    <option value="electrician">Electrician</option>
                    <option value="cleaner">House Cleaner</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="painter">Painter</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                  Years of Experience
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Award className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    value={serviceData.experience}
                    onChange={handleServiceDataChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hourlyRate">
                  Hourly Rate (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="text-gray-400" size={18} />
                  </div>
                  <input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    min="0"
                    value={serviceData.hourlyRate}
                    onChange={handleServiceDataChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-6"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description of Services
                </label>
                <div className="relative">
                  <div className="absolute inset-y-2 left-0 pl-3 flex items-start pointer-events-none">
                    <FileText className="text-gray-400" size={18} />
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    value={serviceData.description}
                    onChange={handleServiceDataChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    rows="4"
                    required
                    placeholder="Describe your services, skills, and specialties..."
                  ></textarea>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex justify-between"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center"
                  whileHover={{ backgroundColor: '#d1d5db', scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Back
                </motion.button>
                <motion.button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                  whileHover={{ backgroundColor: '#3b82f6', scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register
                  <Check className="ml-2" size={18} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}

export default Register