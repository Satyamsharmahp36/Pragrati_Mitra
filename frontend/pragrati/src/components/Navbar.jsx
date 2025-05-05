import { Link } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Pragrati Mitar</Link>
        
        <div className="flex gap-4">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded">Register</Link>
            </>
          ) : (
            <>
              <span className="mr-4">
                Welcome, {user.name} ({user.type})
              </span>
              {user.type === 'customer' ? (
                <Link to="/customer" className="px-4 py-2 bg-white text-blue-600 rounded">Dashboard</Link>
              ) : (
                <Link to="/service-provider" className="px-4 py-2 bg-white text-blue-600 rounded">Dashboard</Link>
              )}
              <button 
                onClick={onLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar