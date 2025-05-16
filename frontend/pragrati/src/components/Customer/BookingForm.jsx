import { useState } from 'react'
import { Calendar, Clock, MessageSquare, Loader, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

function BookingForm({ provider = {name: "Dr. Smith", _id: "123"}, customerId = "456", onBookingComplete = () => {} }) {
  const [message, setMessage] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log({
        provider,
        customerId,
        message,
        date: bookingDate,
        time: bookingTime
      });
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        onBookingComplete()
      }, 2000)
    }, 1500)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  }

  if (success) {
    return (
      <motion.div 
        className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-800"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div 
          className="flex flex-col items-center justify-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <CheckCircle className="text-green-400 mb-4" size={64} />
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold mb-2 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Booking Successful!
          </motion.h2>
          <motion.p 
            className="text-gray-300 mb-6 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your booking request has been sent to {provider.name}.
          </motion.p>
          <motion.button
            onClick={onBookingComplete}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 shadow-lg hover:shadow-xl flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue
            <ChevronRight className="ml-2" size={18} />
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center justify-between mb-6 pb-3 border-b border-gray-700"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-white">Book with {provider.name}</h2>
        <motion.div 
          className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-indigo-300 font-bold text-lg">
            {provider.name?.charAt(0) || "P"}
          </span>
        </motion.div>
      </motion.div>
      
      {error && (
        <motion.div 
          className="bg-red-900/30 border-l-4 border-red-500 text-red-300 p-4 mb-6 rounded-md flex items-start"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <AlertCircle className="mr-2 flex-shrink-0 mt-1" size={18} />
          <span>{error}</span>
        </motion.div>
      )}
      
      <div className="space-y-6">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 font-medium" htmlFor="bookingDate">
              <Calendar className="mr-2 text-indigo-400" size={18} />
              Select Date
            </label>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <input
                id="bookingDate"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-white"
                required
              />
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 font-medium" htmlFor="bookingTime">
              <Clock className="mr-2 text-indigo-400" size={18} />
              Select Time
            </label>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <input
                id="bookingTime"
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-white"
                required
              />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div className="space-y-2" variants={itemVariants}>
          <label className="flex items-center text-gray-300 font-medium" htmlFor="message">
            <MessageSquare className="mr-2 text-indigo-400" size={18} />
            Message
          </label>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-white"
              rows="4"
              placeholder="Describe your requirements or ask any questions..."
              required
            ></textarea>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-800/50"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-indigo-300 font-medium flex items-center">
            <span className="bg-indigo-500/20 p-1 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </span>
            Price: $85/hour
          </p>
        </motion.div>
        
        <motion.div className="flex justify-end gap-3 pt-2" variants={itemVariants}>
          <motion.button
            type="button"
            onClick={onBookingComplete}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center min-w-32"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" size={18} />
                Processing...
              </>
            ) : (
              'Send Booking Request'
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BookingForm