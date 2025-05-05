import { useState } from 'react'

function BookingForm({ provider, customerId, onBookingComplete }) {
  const [message, setMessage] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log({
        provider,
        customerId,
        message,
        date: bookingDate
      });
    
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
      
      onBookingComplete()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Book {provider.name}</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookingDate">
            Date
          </label>
          <input
            id="bookingDate"
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Describe your requirements..."
            required
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onBookingComplete}
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Sending...' : 'Send Booking Request'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm