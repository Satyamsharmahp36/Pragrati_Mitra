import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, User, Briefcase, Mail, Lock, MapPin, Phone, 
  Home, Award, DollarSign, FileText, AlertCircle, 
  ArrowLeft, ArrowRight, Check, Moon, ChevronDown
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
  const [showServiceSelect, setShowServiceSelect] = useState(false)
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

  // Select a service type directly
  const selectService = (type) => {
    setServiceData({...serviceData, serviceType: type})
    setShowServiceSelect(false)
  }

  // Progress indicator
  const totalSteps = userType === 'service-provider' ? 3 : 2
  const progress = (step / totalSteps) * 100

  // Variants for animations
  const pageVariants = {
    initial: { 
      opacity: 0,
      y: 20,
    },
    in: { 
      opacity: 1,
      y: 0,
    },
    out: { 
      opacity: 0,
      y: -20,
    }
  }

  const pageTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
  }

  // Service options with icons
  const serviceOptions = [
    { value: 'chef', label: 'Chef' },
    { value: 'gardener', label: 'Gardener' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'electrician', label: 'Electrician' },
    { value: 'cleaner', label: 'House Cleaner' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'painter', label: 'Painter' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
      >
        <motion.div
          className="flex items-center justify-center space-x-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Moon className="text-indigo-400" size={32} />
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Pragrati Mitar
          </h2>
        </motion.div>
        
        {/* Step indicator */}
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold text-indigo-400">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-indigo-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
        
        {error && (
          <motion.div 
            className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center space-x-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="flex-shrink-0 text-red-400" size={20} />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="space-y-6"
              >
                <motion.div 
                  className="relative flex flex-col items-center"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl font-bold text-indigo-400 mb-4">I want to register as a</h3>
                  <div className="flex flex-col sm:flex-row w-full gap-4">
                    <motion.button
                      type="button"
                      className={`flex-1 p-6 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${userType === 'customer' ? 'border-indigo-500 bg-indigo-900/30' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/30'}`}
                      onClick={() => setUserType('customer')}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <User className={`mb-2 ${userType === 'customer' ? 'text-indigo-400' : 'text-gray-400'}`} size={32} />
                      </motion.div>
                      <span className={`font-medium ${userType === 'customer' ? 'text-indigo-300' : 'text-gray-300'}`}>
                        Customer
                      </span>
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      className={`flex-1 p-6 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${userType === 'service-provider' ? 'border-indigo-500 bg-indigo-900/30' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/30'}`}
                      onClick={() => setUserType('service-provider')}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}  
                      >
                        <Briefcase className={`mb-2 ${userType === 'service-provider' ? 'text-indigo-400' : 'text-gray-400'}`} size={32} />
                      </motion.div>
                      <span className={`font-medium ${userType === 'service-provider' ? 'text-indigo-300' : 'text-gray-300'}`}>
                        Service Provider
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="group">
                    <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="name">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="mobile">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                      </div>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                        required
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                </motion.div>
                
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-3 px-6 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-700/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span>Continue</span>
                  <motion.div 
                    animate={{ x: [0, 5, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="ml-2" size={18} />
                  </motion.div>
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
                className="space-y-4"
              >
                <motion.div 
                  className="space-y-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-indigo-400 text-center">
                    Security & Location
                  </h3>
                  <p className="text-gray-400 text-sm text-center mb-4">
                    Set your password and location details
                  </p>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                      required
                      placeholder="Create a secure password"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                      required
                      placeholder="Confirm your password"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="state">
                    State
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                    </div>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                      required
                      placeholder="Your state"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="location">
                    Location
                  </label>
                  <div className="relative flex">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                      placeholder="Enter your location or use GPS"
                      required
                    />
                    <motion.button
                      type="button"
                      onClick={getLocation}
                      className="flex items-center justify-center px-4 bg-gray-700 hover:bg-gray-600 rounded-r-lg border-l-0 border border-gray-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MapPin className="text-indigo-400" size={18} />
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between pt-4 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200 font-medium flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="mr-2" size={18} />
                    Back
                  </motion.button>
                  
                  {userType === 'customer' ? (
                    <motion.button
                      type="submit"
                      className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium flex items-center shadow-lg shadow-indigo-700/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Register
                      <Check className="ml-2" size={18} />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium flex items-center shadow-lg shadow-indigo-700/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next
                      <motion.div 
                        animate={{ x: [0, 5, 0] }} 
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight className="ml-2" size={18} />
                      </motion.div>
                    </motion.button>
                  )}
                </motion.div>
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
                className="space-y-4"
              >
                <motion.div
                  className="space-y-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-indigo-400 text-center">
                    Service Details
                  </h3>
                  <p className="text-gray-400 text-sm text-center mb-4">
                    Tell us about your professional services
                  </p>
                </motion.div>
                
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="serviceType">
                    Service Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setShowServiceSelect(!showServiceSelect)}
                      className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-left flex items-center justify-between"
                    >
                      <span className={serviceData.serviceType ? "text-gray-200" : "text-gray-500"}>
                        {serviceData.serviceType 
                          ? serviceOptions.find(opt => opt.value === serviceData.serviceType)?.label 
                          : "Select your service type"}
                      </span>
                      <ChevronDown className={`text-gray-400 transition-transform duration-300 ${showServiceSelect ? "transform rotate-180" : ""}`} size={18} />
                    </button>
                    
                    {showServiceSelect && (
                      <motion.div 
                        className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="max-h-60 overflow-y-auto">
                          {serviceOptions.map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              className="w-full px-4 py-3 text-left hover:bg-gray-700 text-gray-300 flex items-center"
                              onClick={() => selectService(option.value)}
                              whileHover={{ backgroundColor: "#374151" }}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    <input
                      id="serviceType"
                      name="serviceType"
                      type="hidden"
                      value={serviceData.serviceType}
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="experience">
                    Years of Experience
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Award className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                    </div>
                    <input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      value={serviceData.experience}
                      onChange={handleServiceDataChange}
className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                      required
                      placeholder="Years of experience"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="hourlyRate">
                    Hourly Rate (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                    </div>
                    <input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="0"
                      value={serviceData.hourlyRate}
                      onChange={handleServiceDataChange}
                      className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                      required
                      placeholder="Your hourly rate"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-indigo-300 mb-1 ml-1" htmlFor="description">
                    Description of Services
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-2 left-0 pl-3 flex items-start pointer-events-none">
                      <FileText className="text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-200" size={18} />
                    </div>
                    <textarea
                      id="description"
                      name="description"
                      value={serviceData.description}
                      onChange={handleServiceDataChange}
                      className="w-full pl-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-200"
                      rows="4"
                      required
                      placeholder="Describe your services, skills, and specialties..."
                    ></textarea>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between pt-4 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200 font-medium flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="mr-2" size={18} />
                    Back
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium flex items-center shadow-lg shadow-indigo-700/30"
                    whileHover={{ scale: 1.02 }}
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
    </motion.div>
  )
}

export default Register