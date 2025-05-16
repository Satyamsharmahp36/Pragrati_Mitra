import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Calendar, 
  Phone, 
  Mail, 
  Star, 
  Filter, 
  ChevronRight, 
  Briefcase, 
  BookOpen, 
  Clock, 
  MessageSquare,
  Loader,
  Plus
} from 'lucide-react'

function ServiceProviderCard({ provider, customerId }) {
  const [expanded, setExpanded] = useState(false)
  const [booking, setBooking] = useState({
    date: '',
    message: '',
  })
  const [bookingStatus, setBookingStatus] = useState({
    loading: false,
    error: '',
    success: false,
  })

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    
    if (!booking.date) {
      setBookingStatus({
        ...bookingStatus,
        error: 'Please select a date',
      })
      return
    }

    setBookingStatus({
      ...bookingStatus,
      loading: true,
      error: '',
    })

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          providerId: provider._id,
          date: booking.date,
          message: booking.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking')
      }

      setBookingStatus({
        loading: false,
        error: '',
        success: true,
      })

      // Reset form
      setBooking({
        date: '',
        message: '',
      })

      // Collapse card after successful booking
      setTimeout(() => {
        setExpanded(false)
        setBookingStatus(prev => ({ ...prev, success: false }))
      }, 3000)
    } catch (err) {
      setBookingStatus({
        loading: false,
        error: err.message,
        success: false,
      })
    }
  }

  const cardVariants = {
    collapsed: { height: 'auto' },
    expanded: { height: 'auto' }
  }

  const formVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <motion.div 
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300"
      initial="collapsed"
      animate={expanded ? 'expanded' : 'collapsed'}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      layout
      variants={cardVariants}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <motion.div 
              className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {provider.name.charAt(0)}
            </motion.div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-white">{provider.name}</h3>
              <div className="flex items-center mt-1">
                <p className="text-indigo-400 capitalize flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {provider.serviceType}
                </p>
                <span className="mx-2 text-gray-500">•</span>
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(provider.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                    />
                  ))}
                  <span className="ml-1 text-gray-400 text-sm">
                    ({provider.reviewCount || 0})
                  </span>
                </div>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className={`rounded-full p-1.5 ${expanded ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
          </motion.button>
        </div>

        <motion.div className="mt-4 text-gray-300">
          <p className="line-clamp-2">{provider.description || 'No description available'}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>Hourly rate: <span className="text-white font-semibold">${provider.hourlyRate}</span></span>
          </div>
          <div className="flex items-center text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Experience: <span className="text-white font-semibold">{provider.experience}+ years</span></span>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div 
              className="mt-6 border-t border-gray-700 pt-5"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={formVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Book {provider.name}</h4>
              
              {bookingStatus.error && (
                <motion.div 
                  className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {bookingStatus.error}
                </motion.div>
              )}
              
              {bookingStatus.success && (
                <motion.div 
                  className="bg-emerald-900/30 border border-emerald-500 text-emerald-200 p-3 rounded-lg mb-4 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Booking sent successfully! {provider.name} will respond shortly.
                </motion.div>
              )}
              
              <form onSubmit={handleBookingSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-indigo-300 text-sm font-medium mb-2" htmlFor={`date-${provider._id}`}>
                      Select Date
                    </label>
                    <input
                      id={`date-${provider._id}`}
                      type="date"
                      value={booking.date}
                      onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-indigo-300 text-sm font-medium mb-2" htmlFor={`message-${provider._id}`}>
                      Message (Optional)
                    </label>
                    <textarea
                      id={`message-${provider._id}`}
                      value={booking.message}
                      onChange={(e) => setBooking({ ...booking, message: e.target.value })}
                      placeholder="Describe what you need help with..."
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition shadow-md disabled:bg-gray-700 disabled:cursor-not-allowed"
                    disabled={bookingStatus.loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {bookingStatus.loading ? (
                      <div className="flex items-center justify-center">
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </div>
                    ) : 'Book Service'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function CustomerDashboard({ user }) {
  const [serviceType, setServiceType] = useState('')
  const [providers, setProviders] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [view, setView] = useState('search') // 'search' or 'bookings'
  
  // Review state
  const [ratings, setRatings] = useState({})
  const [reviews, setReviews] = useState({})
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState('')

  // Service provider types to fetch individually and combine
  const serviceTypes = ['chef', 'gardener', 'plumber', 'electrician', 'cleaner', 'carpenter', 'painter', 'other']

  useEffect(() => {
    // Fetch all providers on initial mount
    fetchAllServiceProviders()
    
    if (view === 'bookings') {
      fetchBookings()
    }
  }, [view, user])

  // Fetch providers for each service type and combine them
  const fetchAllServiceProviders = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Fetch providers for each service type
      const allFetchedProviders = []
      
      // Create array of promises to fetch all service types in parallel
      const fetchPromises = serviceTypes.map(async (type) => {
        try {
          const response = await fetch(`http://localhost:5000/api/providers?type=${type}`)
          const data = await response.json()
          
          if (response.ok) {
            return data
          }
          return []
        } catch (err) {
          console.error(`Error fetching ${type} providers:`, err)
          return []
        }
      })
      
      // Wait for all fetches to complete
      const results = await Promise.all(fetchPromises)
      
      // Combine all results
      const combinedProviders = results.flat()
      
      setProviders(combinedProviders)
    } catch (err) {
      setError('Failed to fetch service providers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch providers by service type when user searches
  const fetchServiceProviders = async (type) => {
    if (!type) {
      // Fetch all providers again if no type is selected
      fetchAllServiceProviders()
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`http://localhost:5000/api/providers?type=${type}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch service providers')
      }
      
      setProviders(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()
    fetchServiceProviders(serviceType)
  }

  const fetchBookings = async () => {
    if (!user) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/customer/${user._id}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings')
      }
      
      // Initialize ratings and reviews state for all completed bookings
      const newRatings = {}
      const newReviews = {}
      
      data.forEach(booking => {
        if (booking.status === 'completed') {
          newRatings[booking._id] = 0
          newReviews[booking._id] = ''
        }
      })
      
      setRatings(prevRatings => ({ ...prevRatings, ...newRatings }))
      setReviews(prevReviews => ({ ...prevReviews, ...newReviews }))
      setBookings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleRatingChange = (bookingId, rating) => {
    setRatings(prev => ({ ...prev, [bookingId]: rating }))
  }
  
  const handleReviewChange = (bookingId, text) => {
    setReviews(prev => ({ ...prev, [bookingId]: text }))
  }
  
  const submitReview = async (bookingId, providerId) => {
    if (!ratings[bookingId] || ratings[bookingId] < 1) {
      setReviewError('Please select a rating')
      return
    }
    
    setReviewLoading(true)
    setReviewError('')
    
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          providerId,
          customerId: user._id,
          rating: ratings[bookingId],
          comment: reviews[bookingId]
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit review')
      }
      
      // Update the booking to show it's been rated
      setBookings(prev => prev.map(booking => 
        booking._id === bookingId ? { ...booking, rated: true } : booking
      ))
      
      // Show success message
      alert('Review submitted successfully!')
    } catch (err) {
      setReviewError(err.message)
    } finally {
      setReviewLoading(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const tabVariants = {
    inactive: { color: "rgb(156, 163, 175)", borderBottom: "2px solid transparent" },
    active: { 
      color: "rgb(139, 92, 246)", 
      borderBottom: "2px solid rgb(139, 92, 246)",
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.div 
      className="bg-gray-900 min-h-screen text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-white bg-clip-text  bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Customer Dashboard
        </motion.h1>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <motion.button 
              className="py-4 px-6 md:px-8 font-medium text-lg transition-colors flex items-center relative"
              onClick={() => setView('search')}
              variants={tabVariants}
              animate={view === 'search' ? 'active' : 'inactive'}
              whileHover={{ backgroundColor: "rgba(79, 70, 229, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-5 h-5 mr-2" />
              Find Services
              {view === 'search' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  layoutId="activeTab"
                />
              )}
            </motion.button>
            <motion.button 
              className="py-4 px-6 md:px-8 font-medium text-lg transition-colors flex items-center relative"
              onClick={() => setView('bookings')}
              variants={tabVariants}
              animate={view === 'bookings' ? 'active' : 'inactive'}
              whileHover={{ backgroundColor: "rgba(79, 70, 229, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              My Bookings
              {view === 'bookings' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  layoutId="activeTab"
                />
              )}
            </motion.button>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {view === 'search' ? (
            <motion.div
              key="search-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <form onSubmit={handleSearch}>
                  <div className="flex flex-col md:flex-row md:items-end gap-4">
                    <div className="flex-grow">
                      <label className="block text-indigo-300 text-sm font-medium mb-2" htmlFor="serviceType">
                        <Filter className="w-4 h-4 inline mr-2" />
                        Filter by Service Type
                      </label>
                      <select
                        id="serviceType"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white"
                      >
                        <option value="">All Services</option>
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
                    
                    <motion.button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition shadow-md flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Filter Results
                    </motion.button>
                  </div>
                </form>
              </motion.div>
              
              {error && (
                <motion.div 
                  className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-xl shadow-md mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </motion.div>
              )}
              
              {loading ? (
                <motion.div 
                  className="flex justify-center items-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Loader className="w-12 h-12 text-indigo-500 animate-spin" />
                </motion.div>
              ) : providers.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2 
                    className="text-2xl font-semibold mb-6 text-white flex items-center"
                    variants={itemVariants}
                  >
                    {serviceType 
                      ? <><span className="capitalize">{serviceType}</span>s Available</>
                      : 'All Service Providers'
                    }
                  </motion.h2>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                  >
                    {providers.map(provider => (
                      <ServiceProviderCard 
                        key={provider._id} 
                        provider={provider} 
                        customerId={user?._id}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-16 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: 0 }}
                    className="mx-auto h-24 w-24 text-gray-500 mb-4"
                  >
                    <Search className="w-full h-full opacity-30" />
                  </motion.div>
                  <h3 className="mt-4 text-xl font-medium text-white">No service providers found</h3>
                  <p className="mt-2 text-gray-400">Try selecting a different service type or check back later.</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="bookings-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2 
                className="text-2xl font-semibold mb-6 text-white flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <BookOpen className="w-6 h-6 mr-2" />
                My Bookings
              </motion.h2>
              
              {error && (
                <motion.div 
                  className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-xl shadow-md mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </motion.div>
              )}
              
              {loading ? (
                <motion.div 
                  className="flex justify-center items-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Loader className="w-12 h-12 text-indigo-500 animate-spin" />
                </motion.div>
              ) : bookings.length > 0 ? (
                <motion.div 
                  className="space-y-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {bookings.map(booking => (
                    <motion.div 
                      key={booking._id} 
                      className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <motion.div 
                              className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              {booking.providerName.charAt(0)}
                            </motion.div>
                            <div className="ml-3">
                              <h3 className="text-xl font-bold text-white">{booking.providerName}</h3>
                              <p className="text-indigo-400 capitalize flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {booking.serviceType}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-400">Status</p>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'accepted' ? 'bg-green-900/50 text-green-300 border border-green-600' : 
                                booking.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-600' : 
                                booking.status === 'completed' ? 'bg-blue-900/50 text-blue-300 border border-blue-600' :
                                'bg-red-900/50 text-red-300 border border-red-600'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Date</p>
                              <p className="font-medium text-white flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
                                {new Date(booking.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-gray-400 flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Message
                            </p>
                            <p className="text-gray-300">{booking.message || 'No message provided'}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 mt-4 md:mt-0">
                          {booking.status === 'accepted' && (
                            <>
                              <motion.a 
                                href={`tel:${booking.providerPhone}`}
                                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition shadow-md"
                                whileHover={{ scale: 1.05, backgroundColor: "#4338ca" }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Phone className="w-5 h-5 mr-2" />
                                Call
                              </motion.a>
                              <motion.a 
                                href={`mailto:${booking.providerEmail}`}
                                className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition shadow-md"
                                whileHover={{ scale: 1.05, backgroundColor: "#7e22ce" }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Mail className="w-5 h-5 mr-2" />
                                Email
                              </motion.a>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {booking.status === 'completed' && !booking.rated && (
                        <motion.div 
                          className="mt-6 pt-4 border-t border-gray-700"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className="font-bold text-lg mb-3 text-white">Rate your experience</h4>
                          
                          {reviewError && (
                            <motion.div 
                              className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-lg mb-3 text-sm"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {reviewError}
                            </motion.div>
                          )}
                          
                          <div className="flex gap-2 mb-3">
                            {[1, 2, 3, 4, 5].map(star => (
                              <motion.button 
                                key={star}
                                className={`text-3xl ${ratings[booking._id] >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                                onClick={() => handleRatingChange(booking._id, star)}
                                type="button"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                ★
                              </motion.button>
                            ))}
                          </div>
                          
                          <textarea 
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white" 
                            placeholder="Share your experience with this service provider..."
                            rows="3"
                            value={reviews[booking._id] || ''}
                            onChange={(e) => handleReviewChange(booking._id, e.target.value)}
                          ></textarea>
                          
                          <motion.button 
                            className={`mt-3 ${
                              reviewLoading 
                                ? 'bg-gray-700 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            } text-white font-bold py-2 px-6 rounded-lg transition shadow-md flex items-center justify-center`}
                            onClick={() => submitReview(booking._id, booking.providerId)}
                            disabled={reviewLoading}
                            whileHover={!reviewLoading ? { scale: 1.03 } : {}}
                            whileTap={!reviewLoading ? { scale: 0.97 } : {}}
                          >
                            {reviewLoading ? (
                              <div className="flex items-center">
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                Submitting...
                              </div>
                            ) : (
                              <>
                                <Star className="w-5 h-5 mr-2 fill-current" />
                                Submit Review
                              </>
                            )}
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-16 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: 0 }}
                    className="mx-auto h-24 w-24 text-gray-500 mb-4"
                  >
                    <BookOpen className="w-full h-full opacity-30" />
                  </motion.div>
                  <h3 className="mt-4 text-xl font-medium text-white">No bookings yet</h3>
                  <p className="mt-2 text-gray-400">Start booking service providers to see them here.</p>
                  <motion.button 
                    onClick={() => setView('search')}
                    className="mt-6 flex items-center mx-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Find Service Providers
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default CustomerDashboard