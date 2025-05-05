import { useState, useEffect } from 'react'

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

    console.log({
        providerId: provider._id,
        customerId,
        message,
        date: bookingDate}
    );
    
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{provider.name}</h3>
        <p className="text-gray-600 capitalize mb-2">{provider.serviceType}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-500 mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(provider.rating || 0) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-600">({provider.reviewCount || 0} reviews)</span>
        </div>
        
        <div className="mb-3">
          <p><strong>Experience:</strong> {provider.experience} years</p>
          <p><strong>Rate:</strong> ₹{provider.hourlyRate}/hour</p>
          <p><strong>Location:</strong> {provider.state}</p>
        </div>
        
        <p className="mb-4">{provider.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowBookingForm(!showBookingForm)}
          >
            {showBookingForm ? 'Cancel' : 'Book Now'}
          </button>
          
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={handleToggleReviews}
          >
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </button>
          
          <a
            href={`tel:${provider.mobile}`}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Call
          </a>
          
          <a
            href={`mailto:${provider.email}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Email
          </a>
        </div>
        
        {showBookingForm && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-lg font-bold mb-2">Book {provider.name}</h4>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}
            
            <form onSubmit={handleBooking}>
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
                  rows="3"
                  placeholder="Describe your requirements..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Sending...' : 'Send Booking Request'}
              </button>
            </form>
          </div>
        )}
        
        {showReviews && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-lg font-bold mb-2">Reviews</h4>
            
            {reviewError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {reviewError}
              </div>
            )}
            
            {loadingReviews ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b pb-3">
                    <div className="flex text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <p className="text-gray-800">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-1">- {review.customerName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceProviderCard