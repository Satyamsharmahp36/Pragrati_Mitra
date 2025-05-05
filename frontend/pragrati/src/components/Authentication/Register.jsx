import { useState } from 'react'
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

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register for Pragrati Mitar</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="mb-6">
              <div className="flex border border-gray-300 rounded mb-4">
                <button
                  type="button"
                  className={`flex-1 py-2 ${userType === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => setUserType('customer')}
                >
                  Register as Customer
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 ${userType === 'service-provider' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => setUserType('service-provider')}
                >
                  Register as Service Provider
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          </>
        )}
        
        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <div className="flex">
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
                  placeholder="Enter your location or use GPS"
                  required
                />
                <button
                  type="button"
                  onClick={getLocation}
                  className="bg-gray-300 hover:bg-gray-400 px-4 rounded-r"
                >
                  📍
                </button>
              </div>
            </div>
            
            {userType === 'customer' ? (
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
            )}
          </>
        )}
        
        {step === 3 && userType === 'service-provider' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceType">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={serviceData.serviceType}
                onChange={handleServiceDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                Years of Experience
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                min="0"
                value={serviceData.experience}
                onChange={handleServiceDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hourlyRate">
                Hourly Rate (₹)
              </label>
              <input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min="0"
                value={serviceData.hourlyRate}
                onChange={handleServiceDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description of Services
              </label>
              <textarea
                id="description"
                name="description"
                value={serviceData.description}
                onChange={handleServiceDataChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                rows="4"
                required
                placeholder="Describe your services, skills, and specialties..."
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default Register