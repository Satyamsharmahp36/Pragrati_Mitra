import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Users, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react'

function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 }
  }

  return (
    <motion.nav 
      className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2" 
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="text-2xl font-bold flex items-center">
              <motion.span 
                className="text-3xl bg-gradient-to-r from-blue-200 to-indigo-100 text-transparent bg-clip-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Pragrati Mitar
              </motion.span>
            </Link>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-blue-500 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <motion.div
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <Link to="/login" className="flex items-center gap-2">
                    <motion.button
                      className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md flex items-center gap-2 font-medium"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <LogIn size={18} />
                      Login
                    </motion.button>
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                >
                  <Link to="/register">
                    <motion.button
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md flex items-center gap-2 font-medium"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <UserPlus size={18} />
                      Register
                    </motion.button>
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.span
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <User size={18} />
                  Welcome, {user.name}
                  <span className="px-2 py-1 bg-blue-500 rounded-full text-xs">
                    {user.type}
                  </span>
                </motion.span>
                
                <motion.div
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                >
                  {user.type === 'customer' ? (
                    <Link to="/customer">
                      <motion.button
                        className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md flex items-center gap-2 font-medium"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Users size={18} />
                        Dashboard
                      </motion.button>
                    </Link>
                  ) : (
                    <Link to="/service-provider">
                      <motion.button
                        className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md flex items-center gap-2 font-medium"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Users size={18} />
                        Dashboard
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
                
                <motion.div
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <motion.button 
                    onClick={onLogout} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md flex items-center gap-2 font-medium"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                </motion.div>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {!user ? (
                <>
                  <Link to="/login" onClick={toggleMenu}>
                    <motion.button
                      className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg shadow-md flex items-center justify-center gap-2 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogIn size={18} />
                      Login
                    </motion.button>
                  </Link>
                  
                  <Link to="/register" onClick={toggleMenu}>
                    <motion.button
                      className="w-full px-4 py-3 bg-indigo-500 text-white rounded-lg shadow-md flex items-center justify-center gap-2 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserPlus size={18} />
                      Register
                    </motion.button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 py-2">
                    <User size={18} />
                    Welcome, {user.name}
                    <span className="px-2 py-1 bg-blue-500 rounded-full text-xs">
                      {user.type}
                    </span>
                  </div>
                  
                  {user.type === 'customer' ? (
                    <Link to="/customer" onClick={toggleMenu}>
                      <motion.button
                        className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg shadow-md flex items-center justify-center gap-2 font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Users size={18} />
                        Dashboard
                      </motion.button>
                    </Link>
                  ) : (
                    <Link to="/service-provider" onClick={toggleMenu}>
                      <motion.button
                        className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg shadow-md flex items-center justify-center gap-2 font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Users size={18} />
                        Dashboard
                      </motion.button>
                    </Link>
                  )}
                  
                  <motion.button 
                    onClick={() => {
                      onLogout();
                      toggleMenu();
                    }} 
                    className="w-full px-4 py-3 bg-red-500 text-white rounded-lg shadow-md flex items-center justify-center gap-2 font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar