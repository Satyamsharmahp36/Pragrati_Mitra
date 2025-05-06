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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Customer Dashboard</h1>
        
        <div className="mb-8">
          <div className="flex border-b border-gray-300 bg-white rounded-t-lg shadow-sm">
            <button 
              className={`py-4 px-6 md:px-8 font-medium text-lg transition-colors ${view === 'search' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setView('search')}
            >
              Find Services
            </button>
            <button 
              className={`py-4 px-6 md:px-8 font-medium text-lg transition-colors ${view === 'bookings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setView('bookings')}
            >
              My Bookings
            </button>
          </div>
        </div>
        
        {view === 'search' ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <form onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                  <div className="flex-grow">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceType">
                      Filter by Service Type
                    </label>
                    <select
                      id="serviceType"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                  
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition shadow-md"
                  >
                    Filter Results
                  </button>
                </div>
              </form>
            </div>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md mb-6">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : providers.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  {serviceType ? `${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}s Available` : 'All Service Providers'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {providers.map(provider => (
                    <ServiceProviderCard 
                      key={provider._id} 
                      provider={provider} 
                      customerId={user?._id}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No service providers found</h3>
                <p className="mt-2 text-gray-500">Try selecting a different service type or check back later.</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Bookings</h2>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md mb-6">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            {booking.providerName.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-xl font-bold text-gray-800">{booking.providerName}</h3>
                            <p className="text-gray-600 capitalize">{booking.serviceType}</p>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{new Date(booking.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Message</p>
                          <p className="text-gray-700">{booking.message || 'No message provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        {booking.status === 'accepted' && (
                          <>
                            <a 
                              href={`tel:${booking.providerPhone}`}
                              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition shadow-md"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              Call
                            </a>
                            <a 
                              href={`mailto:${booking.providerEmail}`}
                              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition shadow-md"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Email
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {booking.status === 'completed' && !booking.rated && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="font-bold text-lg mb-3">Rate your experience</h4>
                        
                        {reviewError && (
                          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-3 text-sm">
                            {reviewError}
                          </div>
                        )}
                        
                        <div className="flex gap-2 mb-3">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button 
                              key={star}
                              className={`text-3xl ${ratings[booking._id] >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition`}
                              onClick={() => handleRatingChange(booking._id, star)}
                              type="button"
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        
                        <textarea 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                          placeholder="Share your experience with this service provider..."
                          rows="3"
                          value={reviews[booking._id] || ''}
                          onChange={(e) => handleReviewChange(booking._id, e.target.value)}
                        ></textarea>
                        
                        <button 
                          className={`mt-3 ${
                            reviewLoading 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-700'
                          } text-white font-bold py-2 px-6 rounded-lg transition shadow-md`}
                          onClick={() => submitReview(booking._id, booking.providerId)}
                          disabled={reviewLoading}
                        >
                          {reviewLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </div>
                          ) : 'Submit Review'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings yet</h3>
                <p className="mt-2 text-gray-500">Start booking service providers to see them here.</p>
                <button 
                  onClick={() => setView('search')}
                  className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Find Service Providers
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CustomerDashboard