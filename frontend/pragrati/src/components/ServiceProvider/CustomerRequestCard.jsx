function CustomerRequestCard({ booking, onStatusChange }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{booking.customerName}</h3>
            <p className="mt-2">Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p className="mt-1"><strong>Contact:</strong> {booking.customerPhone}</p>
            <p><strong>Email:</strong> {booking.customerEmail}</p>
            <div className="mt-3">
              <p className="font-semibold">Message:</p>
              <p className="bg-gray-100 p-3 rounded">{booking.message}</p>
            </div>
          </div>
          
          <div>
            <p className="mb-2">
              Status: <span className={`font-bold ${booking.status === 'accepted' ? 'text-green-600' : booking.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </p>
            
            {booking.status === 'pending' && (
              <div className="flex flex-col gap-2">
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => onStatusChange(booking._id, 'accepted')}
                >
                  Accept
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => onStatusChange(booking._id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            )}
            
            {booking.status === 'accepted' && (
              <div className="flex flex-col gap-2">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => onStatusChange(booking._id, 'completed')}
                >
                  Mark Completed
                </button>
                <a 
                  href={`tel:${booking.customerPhone}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center"
                >
                  Call Customer
                </a>
              </div>
            )}
          </div>
        </div>
        
        {booking.status === 'completed' && booking.review && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-bold mb-2">Customer Review:</h4>
            <div className="flex text-yellow-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < booking.review.rating ? '★' : '☆'}</span>
              ))}
            </div>
            <p className="italic">{booking.review.comment}</p>
          </div>
        )}
      </div>
    )
  }
  
  export default CustomerRequestCard