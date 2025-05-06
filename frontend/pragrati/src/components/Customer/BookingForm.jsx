import { useState } from 'react'
import { Calendar, Clock, MessageSquare, Loader, CheckCircle, AlertCircle } from 'lucide-react'

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

  if (success) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="text-green-500 mb-4" size={48} />
          <h2 className="text-xl font-bold mb-2">Booking Successful!</h2>
          <p className="text-gray-600 mb-4 text-center">Your booking request has been sent to {provider.name}.</p>
          <button
            onClick={onBookingComplete}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-150"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Book with {provider.name}</h2>
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">
            {provider.name?.charAt(0) || "P"}
          </span>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-start">
          <AlertCircle className="mr-2 flex-shrink-0 mt-1" size={18} />
          <span>{error}</span>
        </div>
      )}
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium" htmlFor="bookingDate">
              <Calendar className="mr-2" size={18} />
              Select Date
            </label>
            <input
              id="bookingDate"
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium" htmlFor="bookingTime">
              <Clock className="mr-2" size={18} />
              Select Time
            </label>
            <input
              id="bookingTime"
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 font-medium" htmlFor="message">
            <MessageSquare className="mr-2" size={18} />
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            rows="4"
            placeholder="Describe your requirements or ask any questions..."
            required
          ></textarea>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-medium">
            Price: $85/hour
          </p>
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onBookingComplete}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 flex items-center justify-center min-w-32"
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" size={18} />
                Processing...
              </>
            ) : (
              'Send Booking Request'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingForm