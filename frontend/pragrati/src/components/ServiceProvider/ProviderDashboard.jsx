import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Clock, 
  DollarSign, 
  MapPin, 
  Star, 
  Briefcase,
  CheckCircle,
  XCircle,
  Loader,
  Calendar,
  ClipboardList,
  CheckSquare
} from 'lucide-react'

const CustomerRequestCard = ({ booking, onStatusChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl hover:border-blue-600 transition-all"
    >
      {console.log(booking)}
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-400" />
              {new Date(booking.date).toLocaleDateString()}
            </h3>
            
            <div className="mb-4 text-gray-300 space-y-2">
              <p className="flex items-center">
                
                <User className="h-4 w-4 mr-2 text-blue-400" />
                <span className="font-medium">Client : </span>- {booking.customer?.name || booking.customerName || 'Client'}
              </p>
              <p className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-400" />
                <span className="font-medium">Time : </span>- {booking.customerMobile || 'Not specified'}
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                <span className="font-medium">Location : </span>- {booking.customerEmail || 'No address provided'}
              </p>
              <p className="flex items-center">
                <ClipboardList className="h-4 w-4 mr-2 text-blue-400" />
                <span className="font-medium">Message : </span>- {booking.message || 'Not specified'}
              </p>
            </div>
            
            {booking.additionalNotes && (
              <div className="mb-4 p-3 bg-gray-700 rounded-lg text-gray-300">
                <p className="font-medium mb-1">Additional Notes:</p>
                <p>{booking.additionalNotes}</p>
              </div>
            )}
          </div>
          
          <div className="md:ml-6 flex flex-col items-end justify-between">

            
            <div className="flex flex-col space-y-2 w-full md:w-auto">
              {booking.status === 'pending' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onStatusChange(booking._id, 'accepted')}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onStatusChange(booking._id, 'rejected')}
                    className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline
                  </motion.button>
                </>
              )}
              
              {booking.status === 'accepted' && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStatusChange(booking._id, 'completed')}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Mark Complete
                </motion.button>
              )}
              
              {booking.status === 'completed' && (
                <div className="flex items-center justify-center bg-blue-900 text-blue-300 py-2 px-4 rounded-lg font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProviderDashboard({ user }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [view, setView] = useState('pending') // 'pending', 'accepted', 'completed'

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user, view])

  const fetchBookings = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/provider/${user._id}?status=${view}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings')
      }
      
      setBookings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (bookingId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update booking status')
      }
      
      // Refresh bookings
      fetchBookings()
    } catch (err) {
      setError(err.message)
    }
  }

  // Variants for Framer Motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 text-gray-200 p-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Service Provider Dashboard
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="bg-gray-800 p-6 rounded-xl shadow-xl mb-8 border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <User className="h-6 w-6 mr-2 text-blue-400" />
            Your Profile
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-gray-700 p-4 rounded-lg space-y-3"
            >
              <p className="flex items-center text-gray-200">
                <User className="h-5 w-5 mr-3 text-blue-400" />
                <span className="font-medium mr-2">Name:</span> 
                <span>{user?.name}</span>
              </p>
              <p className="flex items-center text-gray-200">
                <Briefcase className="h-5 w-5 mr-3 text-blue-400" />
                <span className="font-medium mr-2">Service Type:</span> 
                <span>{user?.serviceType}</span>
              </p>
              <p className="flex items-center text-gray-200">
                <Clock className="h-5 w-5 mr-3 text-blue-400" />
                <span className="font-medium mr-2">Experience:</span> 
                <span>{user?.experience} years</span>
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-gray-700 p-4 rounded-lg space-y-3"
            >
              <p className="flex items-center text-gray-200">
                <DollarSign className="h-5 w-5 mr-3 text-green-400" />
                <span className="font-medium mr-2">Hourly Rate:</span> 
                <span>₹{user?.hourlyRate}</span>
              </p>
              <p className="flex items-center text-gray-200">
                <Star className="h-5 w-5 mr-3 text-yellow-400" />
                <span className="font-medium mr-2">Rating:</span> 
                <span>{user?.rating || 'No ratings yet'}</span>
              </p>
              <p className="flex items-center text-gray-200">
                <MapPin className="h-5 w-5 mr-3 text-red-400" />
                <span className="font-medium mr-2">Location:</span> 
                <span>{user?.state}</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 px-6 rounded-full flex items-center ${view === 'pending' 
                ? 'bg-blue-600 text-white font-medium shadow-lg' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setView('pending')}
            >
              <Clock className="h-5 w-5 mr-2" />
              Pending Requests
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 px-6 rounded-full flex items-center ${view === 'accepted' 
                ? 'bg-blue-600 text-white font-medium shadow-lg' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setView('accepted')}
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Accepted Bookings
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 px-6 rounded-full flex items-center ${view === 'completed' 
                ? 'bg-blue-600 text-white font-medium shadow-lg' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setView('completed')}
            >
              <CheckSquare className="h-5 w-5 mr-2" />
              Completed Jobs
            </motion.button>
          </div>
        </motion.div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900 border border-red-700 text-red-200 px-6 py-4 rounded-lg mb-6"
          >
            <div className="flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          </motion.div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="h-12 w-12 text-blue-500" />
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {bookings.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-6"
                >
                  {bookings.map(booking => (
                    <CustomerRequestCard 
                      key={booking._id} 
                      booking={booking}
                      onStatusChange={handleStatusChange} 
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 p-10 rounded-xl text-center border border-gray-700"
                >
                  <div className="flex flex-col items-center">
                    <ClipboardList className="h-16 w-16 text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium text-gray-400">
                      No {view} bookings at the moment
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {view === 'pending' 
                        ? 'When you receive new booking requests, they will appear here.' 
                        : view === 'accepted' 
                          ? 'Accept some pending requests to see them here.'
                          : 'Complete some of your accepted jobs to see them here.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ProviderDashboard