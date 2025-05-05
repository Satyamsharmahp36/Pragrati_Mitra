import { useState, useEffect } from 'react'
import ServiceProviderCard from './ServiceProviderCard'

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

  useEffect(() => {
    if (view === 'bookings') {
      fetchBookings()
    }
  }, [view, user])

  const fetchServiceProviders = async () => {
    if (!serviceType) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`http://localhost:5000/api/providers?type=${serviceType}`)
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

  const handleSearch = (e) => {
    e.preventDefault()
    fetchServiceProviders()
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

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-300">
          <button 
            className={`py-2 px-4 mr-4 ${view === 'search' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
            onClick={() => setView('search')}
          >
            Search Providers
          </button>
          <button 
            className={`py-2 px-4 ${view === 'bookings' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
            onClick={() => setView('bookings')}
          >
            My Bookings
          </button>
        </div>
      </div>
      
      {view === 'search' ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-grow">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceType">
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
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
                
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : providers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map(provider => (
                <ServiceProviderCard 
                  key={provider._id} 
                  provider={provider} 
                  customerId={user?._id}
                />
              ))}
            </div>
          ) : serviceType ? (
            <p className="text-center py-4">No service providers found. Try another service type.</p>
          ) : null}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : bookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map(booking => (
                <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{booking.providerName}</h3>
                      <p className="text-gray-600">{booking.serviceType}</p>
                      <p className="mt-2">Status: <span className={`font-bold ${booking.status === 'accepted' ? 'text-green-600' : booking.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span></p>
                      <p className="mt-1">Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Message: {booking.message}</p>
                    </div>
                    
                    <div>
                      {booking.status === 'accepted' && (
                        <div className="flex flex-col gap-2">
                          <button 
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => window.location.href = `tel:${booking.providerPhone}`}
                          >
                            Call
                          </button>
                          <button 
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            onClick={() => window.location.href = `mailto:${booking.providerEmail}`}
                          >
                            Email
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {booking.status === 'completed' && !booking.rated && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-bold mb-2">Rate your experience:</h4>
                      
                      {reviewError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-3 text-sm">
                          {reviewError}
                        </div>
                      )}
                      
                      <div className="flex gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button 
                            key={star}
                            className={`text-2xl ${ratings[booking._id] >= star ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                            onClick={() => handleRatingChange(booking._id, star)}
                            type="button"
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        placeholder="Write a review..."
                        rows="2"
                        value={reviews[booking._id] || ''}
                        onChange={(e) => handleReviewChange(booking._id, e.target.value)}
                      ></textarea>
                      
                      <button 
                        className={`mt-2 ${
                          reviewLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white font-bold py-1 px-4 rounded`}
                        onClick={() => submitReview(booking._id, booking.providerId)}
                        disabled={reviewLoading}
                      >
                        {reviewLoading ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4">You don't have any bookings yet.</p>
          )}
        </>
      )}
    </div>
  )
}

export default CustomerDashboard