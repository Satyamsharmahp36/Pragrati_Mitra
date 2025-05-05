import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CustomerPage from './pages/CustomerPage'
import ServiceProviderPage from './pages/ServiceProviderPage'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route 
              path="/customer" 
              element={<CustomerPage user={user} />} 
            />
            <Route 
              path="/service-provider" 
              element={<ServiceProviderPage user={user} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App