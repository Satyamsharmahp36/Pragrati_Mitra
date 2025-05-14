import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Users, LogOut, LogIn, UserPlus, Menu, X, Moon, Star } from 'lucide-react'

function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }

  const logoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 5px 15px rgba(79, 70, 229, 0.4)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.98 }
  }

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const mobileItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  }

  return (
    <motion.nav 
      className={`${scrolled ? 'bg-gray-900/90 backdrop-blur-lg' : 'bg-gray-900'} text-white sticky top-0 z-50 transition-all duration-300`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <motion.div
                className="relative"
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Star className="text-indigo-400" size={26} />
                <motion.div 
                  className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.span 
                className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text font-extrabold tracking-tight"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
          
          {/* Desktop Navigation */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-6"
          >
            {!user ? (
              <>
                <motion.div variants={navItemVariants}>
                  <Link to="/login" className="flex items-center gap-2">
                    <motion.button
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center gap-2 font-medium transition-all duration-300"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <LogIn size={18} className="text-indigo-400" />
                      </motion.div>
                      <span>Login</span>
                    </motion.button>
                  </Link>
                </motion.div>
                
                <motion.div variants={navItemVariants}>
                  <Link to="/register">
                    <motion.button
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-600/30 flex items-center gap-2 font-medium transition-all duration-300"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <UserPlus size={18} />
                      </motion.div>
                      <span>Register</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.span
                  variants={navItemVariants}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <User size={18} className="text-indigo-400" />
                  </motion.div>
                  <span className="text-gray-200">
                    Welcome, <span className="font-medium text-white">{user.name}</span>
                  </span>
                  <motion.span 
                    className="px-2 py-1 bg-indigo-600 rounded-full text-xs font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    {user.type}
                  </motion.span>
                </motion.span>
                
                <motion.div variants={navItemVariants}>
                  {user.type === 'customer' ? (
                    <Link to="/customer">
                      <motion.button
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center gap-2 font-medium transition-all duration-300"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: 15 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Users size={18} className="text-indigo-400" />
                        </motion.div>
                        <span>Dashboard</span>
                      </motion.button>
                    </Link>
                  ) : (
                    <Link to="/service-provider">
                      <motion.button
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center gap-2 font-medium transition-all duration-300"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: 15 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Users size={18} className="text-indigo-400" />
                        </motion.div>
                        <span>Dashboard</span>
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
                
                <motion.div variants={navItemVariants}>
                  <motion.button 
                    onClick={onLogout} 
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg shadow-red-600/30 flex items-center gap-2 font-medium transition-all duration-300"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LogOut size={18} />
                    </motion.div>
                    <span>Logout</span>
                  </motion.button>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-2"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col space-y-3">
                {!user ? (
                  <>
                    <motion.div variants={mobileItemVariants}>
                      <Link to="/login" onClick={toggleMenu}>
                        <motion.button
                          className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white border border-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 font-medium transition-all duration-300"
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LogIn size={18} className="text-indigo-400" />
                          <span>Login</span>
                        </motion.button>
                      </Link>
                    </motion.div>
                    
                    <motion.div variants={mobileItemVariants}>
                      <Link to="/register" onClick={toggleMenu}>
                        <motion.button
                          className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 font-medium transition-all duration-300"
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <UserPlus size={18} />
                          <span>Register</span>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div 
                      variants={mobileItemVariants}
                      className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-800 rounded-lg border border-gray-700"
                    >
                      <User size={18} className="text-indigo-400" />
                      <span className="text-gray-200">
                        Welcome, <span className="font-medium text-white">{user.name}</span>
                      </span>
                      <span className="px-2 py-1 bg-indigo-600 rounded-full text-xs font-medium">
                        {user.type}
                      </span>
                    </motion.div>
                    
                    <motion.div variants={mobileItemVariants}>
                      {user.type === 'customer' ? (
                        <Link to="/customer" onClick={toggleMenu}>
                          <motion.button
                            className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white border border-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 font-medium transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Users size={18} className="text-indigo-400" />
                            <span>Dashboard</span>
                          </motion.button>
                        </Link>
                      ) : (
                        <Link to="/service-provider" onClick={toggleMenu}>
                          <motion.button
                            className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white border border-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 font-medium transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Users size={18} className="text-indigo-400" />
                            <span>Dashboard</span>
                          </motion.button>
                        </Link>
                      )}
                    </motion.div>
                    
                    <motion.div variants={mobileItemVariants}>
                      <motion.button 
                        onClick={() => {
                          onLogout();
                          toggleMenu();
                        }} 
                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 font-medium transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar