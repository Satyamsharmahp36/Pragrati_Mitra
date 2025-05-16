import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  Briefcase, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Loader,
  AlertCircle,
  CheckCircle,
  X,
  Chef,
  Flower2,
  Wrench,
  Zap,
  Brush,
  Hammer,
  Trash2
} from 'lucide-react'

function ServiceProviderCard({ provider, customerId }) {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [message, setMessage] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showReviews, setShowReviews] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [reviewError, setReviewError] = useState('')

  // Fetch reviews when "Show Reviews" button is clicked
  const fetchReviews = async () => {
    if (!provider._id) return;
    
    setLoadingReviews(true);
    setReviewError('');
    
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/provider/${provider._id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviewError('Failed to load reviews. Please try again.');
    } finally {
      setLoadingReviews(false);
    }
  };

  // Toggle reviews and fetch them if not already loaded
  const handleToggleReviews = () => {
    const newShowReviews = !showReviews;
    setShowReviews(newShowReviews);
    
    // Fetch reviews if toggling to show and no reviews are loaded yet
    if (newShowReviews && reviews.length === 0) {
      fetchReviews();
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          providerId: provider._id,
          customerId,
          message,
          date: bookingDate
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Booking failed')
      }
      
      setSuccess('Booking request sent successfully!')
      setMessage('')
      setBookingDate('')
      setTimeout(() => {
        setShowBookingForm(false)
        setSuccess('')
      }, 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Service type icon based on provider's service
  const getServiceIcon = () => {
    const iconProps = { size: 24, strokeWidth: 1.5 };
    
    switch(provider.serviceType.toLowerCase()) {
      case 'chef':
        return <Chef {...iconProps} />;
      case 'gardener':
        return <Flower2 {...iconProps} />;
      case 'plumber':
        return <Wrench {...iconProps} />;
      case 'electrician':
        return <Zap {...iconProps} />;
      case 'cleaner':
        return <Trash2 {...iconProps} />;
      case 'carpenter':
        return <Hammer {...iconProps} />;
      case 'painter':
        return <Brush {...iconProps} />;
      default:
        return <Briefcase {...iconProps} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:shadow-indigo-900/10 hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <motion.div 
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className={`p-4 rounded-full mr-4 ${
                provider.rating >= 4.5 ? 'bg-emerald-900/40 text-emerald-400' :
                provider.rating >= 3.5 ? 'bg-blue-900/40 text-blue-400' :
                'bg-gray-800/40 text-gray-400'
              }`}
            >
              {getServiceIcon()}
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">{provider.name}</h3>
              <p className="text-gray-400 capitalize">{provider.serviceType}</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-indigo-900/50 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-300 text-sm font-medium border border-indigo-700/50"
          >
            ₹{provider.hourlyRate}/hr
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center mb-5"
        >
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <motion.span 
                key={i} 
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.3 }}
              >
                <Star 
                  size={18} 
                  fill={i < Math.floor(provider.rating || 0) || 
                        (i === Math.floor(provider.rating || 0) && 
                        (provider.rating || 0) % 1 > 0) ? 
                        "currentColor" : "none"} 
                />
              </motion.span>
            ))}
          </div>
          <span className="ml-2 text-gray-400">({provider.reviewCount || 0} reviews)</span>
        </motion.div>
        
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mb-5 space-y-2"
        >
          <div className="flex items-center">
            <Briefcase size={16} className="text-gray-500 mr-2" />
            <p className="text-gray-300"><span className="font-medium text-gray-200">Experience:</span> {provider.experience} years</p>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <p className="text-gray-300"><span className="font-medium text-gray-200">Location:</span> {provider.state}</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mb-6 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50"
        >
          <p className="text-gray-300 line-clamp-3">{provider.description}</p>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => setShowBookingForm(!showBookingForm)}
          >
            <Calendar size={18} className="mr-2" />
            {showBookingForm ? 'Cancel' : 'Book Now'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={handleToggleReviews}
          >
            {showReviews ? <ChevronUp size={18} className="mr-2" /> : <ChevronDown size={18} className="mr-2" />}
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`tel:${provider.mobile}`}
            className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <Phone size={18} className="mr-2" />
            Call
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${provider.email}`}
            className="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <Mail size={18} className="mr-2" />
            Email
          </motion.a>
        </motion.div>
        
        <AnimatePresence>
          {showBookingForm && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mt-6 pt-5 border-t border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white">Book {provider.name}</h4>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-4"
                    >
                      <div className="flex items-center">
                        <AlertCircle size={18} className="mr-2" />
                        <p>{error}</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {success && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-emerald-900/30 border border-emerald-700 text-emerald-200 p-4 rounded-lg mb-4"
                    >
                      <div className="flex items-center">
                        <CheckCircle size={18} className="mr-2" />
                        <p>{success}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="bookingDate">
                      When do you need this service?
                    </label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <input
                        id="bookingDate"
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </motion.div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="message">
                      Describe your requirements
                    </label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        rows="3"
                        placeholder="Describe what you need help with, including any specific requirements or questions you have..."
                        required
                      ></textarea>
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                          Sending...
                        </span>
                      ) : 'Send Booking Request'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showReviews && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mt-6 pt-5 border-t border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white">Customer Reviews</h4>
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="bg-yellow-900/40 border border-yellow-700/50 text-yellow-400 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {provider.rating ? provider.rating.toFixed(1) : '0.0'} / 5.0
                  </motion.span>
                </div>
                
                <AnimatePresence>
                  {reviewError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-4"
                    >
                      <div className="flex">
                        <AlertCircle size={18} className="mr-2" />
                        <p>{reviewError}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {loadingReviews ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="flex justify-center py-10"
                  >
                    <Loader size={32} className="text-indigo-400" />
                  </motion.div>
                ) : reviews && reviews.length > 0 ? (
                  <motion.div 
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.1 } }
                    }}
                  >
                    {reviews.map((review, index) => (
                      <motion.div 
                        key={review._id} 
                        className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50"
                        variants={{
                          hidden: { y: 20, opacity: 0 },
                          visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16}
                                fill={i < review.rating ? "currentColor" : "none"}
                                className="mr-1"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">
                            <Clock size={14} className="inline mr-1" />
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">{review.comment}</p>
                        <p className="text-sm font-medium text-indigo-400">- {review.customerName}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 bg-gray-800/30 border border-gray-700/30 rounded-lg"
                  >
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-sm font-medium text-gray-300">No reviews yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Be the first to review this service provider.</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ServiceProviderCard