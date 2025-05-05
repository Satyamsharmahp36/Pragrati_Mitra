import { useState, useEffect } from 'react'
import CustomerRequestCard from './CustomerRequestCard'

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

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Service Provider Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-3">Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Service Type:</strong> {user?.serviceType}</p>
            <p><strong>Experience:</strong> {user?.experience} years</p>
          </div>
          <div>
            <p><strong>Hourly Rate:</strong> ₹{user?.hourlyRate}</p>
            <p><strong>Rating:</strong> {user?.rating || 'No ratings yet'}</p>
            <p><strong>Location:</strong> {user?.state}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-300">
          <button 
            className={`py-2 px-4 mr-4 ${view === 'pending' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
            onClick={() => setView('pending')}
          >
            Pending Requests
          </button>
          <button 
            className={`py-2 px-4 mr-4 ${view === 'accepted' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
            onClick={() => setView('accepted')}
          >
            accepted Bookings
          </button>
          <button 
            className={`py-2 px-4 ${view === 'completed' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
            onClick={() => setView('completed')}
          >
            Completed Jobs
          </button>
        </div>
      </div>
      
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
            <CustomerRequestCard 
              key={booking._id} 
              booking={booking}
              onStatusChange={handleStatusChange} 
            />
          ))}
        </div>
      ) : (
        <p className="text-center py-4">No {view} bookings at the moment.</p>
      )}
    </div>
  )
}

export default ProviderDashboard