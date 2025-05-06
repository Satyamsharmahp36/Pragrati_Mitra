import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChefHat, 
  Sprout, 
  Droplets, 
  Shield, 
  ThumbsUp, 
  Users, 
  Briefcase,
  Star,
  MapPin,
  MessageCircle,
  ChevronRight,
  X
} from 'lucide-react'
import { useState, useEffect } from 'react'

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [isChatHovered, setIsChatHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatBubble(true);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemFadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  const cardHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  // Show the chat bubble after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatBubble(true);
    }, 3000);
    
    // Handle scroll events to change navbar on scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 via-indigo-50 to-white relative">
      <section className="relative pt-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-blue-500 opacity-10"
            style={{ top: '-15%', right: '10%' }}
            animate={{ 
              y: [0, 40, 0],
              scale: [1, 1.1, 1],
            }} 
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-indigo-600 opacity-10"
            style={{ bottom: '5%', left: '-5%' }}
            animate={{ 
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }} 
            transition={{ duration: 20, repeat: Infinity, delay: 2 }}
          />
          <motion.div 
            className="absolute w-40 h-40 rounded-full bg-purple-500 opacity-10"
            style={{ top: '20%', left: '10%' }}
            animate={{ 
              x: [0, 30, 0],
              scale: [1, 1.1, 1],
            }} 
            transition={{ duration: 18, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Hero content */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block mb-4 bg-blue-500 bg-opacity-30 px-4 py-1 rounded-full"
              >
                <span className="text-blue-100 font-medium">Trusted by 10+ users</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Welcome to <br className="hidden md:block" />
                <span className="relative text-amber-50">
                  Pragrati Mitar
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-1 bg-blue-300 w-full" 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-10 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Connecting skilled service providers with customers through a seamless digital experience that transforms how services are discovered and delivered.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link to="/register">
                  <motion.button 
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 group"
                    whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Users size={18} />
                    Get Started
                    <motion.div
                      className="opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                  </motion.button>
                </Link>
                
                <Link to="/login">
                  <motion.button 
                    className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Briefcase size={18} />
                    Login
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <div className="bg-blue-50 rounded-lg p-2 flex items-center mb-3">
                    <div className="bg-blue-600 text-white p-2 rounded-full mr-3">
                      <ChefHat size={20} />
                    </div>
                    <div>
                      <h3 className="text-blue-600 font-medium">Chef Service Booked!</h3>
                      <p className="text-gray-500 text-sm">Arriving in 30 minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                        <span className="font-bold text-indigo-600">RK</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Rahul Kumar</h4>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="#FBBF24" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Track</button>
                  </div>
                </div>
                
                <motion.div 
                  className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#FBBF24" />
                    ))}
                  </div>
                  <p className="text-gray-800 text-xs font-medium">Highly Rated!</p>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield size={20} />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
              <path d="M0,96L60,85.3C120,75,240,53,360,48C480,43,600,53,720,58.7C840,64,960,64,1080,58.7C1200,53,1320,43,1380,37.3L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section with enhanced cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-semibold">WHY CHOOSE US</span>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 mt-2">Our Premium Features</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how Pragrati Mitar revolutionizes service delivery with our cutting-edge platform
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                  <Briefcase size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">For Service Providers</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span>Create professional profiles to showcase your expertise and experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span>Set your own pricing and availability with flexible scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span>Build your reputation with verified reviews and ratings</span>
                  </li>
                </ul>
                <motion.div 
                  className="mt-6 text-blue-600 font-medium flex items-center cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  Learn more <ChevronRight size={16} className="ml-1" />
                </motion.div>
              </div>
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-blue-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6 group-hover:bg-indigo-200 transition-colors">
                  <Users size={28} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">For Customers</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2 mt-1">✓</span>
                    <span>Find skilled professionals nearby with advanced location-based search</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2 mt-1">✓</span>
                    <span>Book services in a few clicks with real-time availability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2 mt-1">✓</span>
                    <span>Rate and review your experiences to help others</span>
                  </li>
                </ul>
                <motion.div 
                  className="mt-6 text-indigo-600 font-medium flex items-center cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  Learn more <ChevronRight size={16} className="ml-1" />
                </motion.div>
              </div>
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-indigo-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 group-hover:bg-green-200 transition-colors">
                  <Shield size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Our Guarantees</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>All service providers are thoroughly vetted and verified</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>Secure payment processing with multiple options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>100% satisfaction guarantee with customer support</span>
                  </li>
                </ul>
                <motion.div 
                  className="mt-6 text-green-600 font-medium flex items-center cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  Learn more <ChevronRight size={16} className="ml-1" />
                </motion.div>
              </div>
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-green-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Services Section with enhanced animation */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-semibold">EXPLORE</span>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 mt-2">Popular Services</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most sought-after services by top-rated professionals
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="bg-white p-3 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <ChefHat size={36} className="text-blue-600" />
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-center">Professional Chefs</h3>
                <p className="text-gray-600 text-sm text-center">Personalized dining experiences</p>
                <div className="mt-3 flex justify-center">
                  <span className="text-blue-600 text-sm font-medium">100+ Professionals</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="bg-white p-3 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <Sprout size={36} className="text-green-600" />
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-center">Gardeners</h3>
                <p className="text-gray-600 text-sm text-center">Expert landscaping services</p>
                <div className="mt-3 flex justify-center">
                  <span className="text-green-600 text-sm font-medium">85+ Professionals</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="bg-white p-3 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <Droplets size={36} className="text-yellow-600" />
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-center">Plumbers</h3>
                <p className="text-gray-600 text-sm text-center">Fast & reliable repairs</p>
                <div className="mt-3 flex justify-center">
                  <span className="text-yellow-600 text-sm font-medium">120+ Professionals</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="bg-white p-3 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                >
                  <Sprout size={36} className="text-red-600" />
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-center">House Cleaners</h3>
                <p className="text-gray-600 text-sm text-center">Spotless home solutions</p>
                <div className="mt-3 flex justify-center">
                  <span className="text-red-600 text-sm font-medium">95+ Professionals</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <Link to="/services">
              <motion.button 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md flex items-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Services <ChevronRight size={18} className="ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section with enhanced visuals */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-semibold">EASY PROCESS</span>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 mt-2">How It Works</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect with quality service providers in your area
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto relative">
            {/* Connecting lines between steps */}
            <motion.div 
              className="hidden md:block absolute top-16 left-1/6 right-1/6 h-1 bg-blue-200 z-0"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            
            <motion.div 
              className="text-center mb-12 md:mb-0 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(37, 99, 235, 0.2)" }}
              >
                <MapPin size={32} className="text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Search</h3>
              <p className="text-gray-600 max-w-xs mx-auto">Find services available in your location with our smart search</p>
              <div className="mt-3 flex justify-center">
                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">Step 1</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center mb-12 md:mb-0 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(79, 70, 229, 0.2)" }}
              >
                <Star size={32} className="text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Choose</h3>
              <p className="text-gray-600 max-w-xs mx-auto">Select from verified professionals with detailed profiles and reviews</p>
              <div className="mt-3 flex justify-center">
                <span className="bg-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">Step 2</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(22, 163, 74, 0.2)" }}
              >
                <ThumbsUp size={32} className="text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Book & Enjoy</h3>
              <p className="text-gray-600 max-w-xs mx-auto">Schedule services and enjoy quality work with satisfaction guarantee</p>
              <div className="mt-3 flex justify-center">
                <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">Step 3</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with improved cards */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-semibold">TESTIMONIALS</span>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 mt-2">What Our Users Say</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
            >
              <div className="mb-6">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FBBF24" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"Found an amazing chef through Pragrati Mitar for my anniversary dinner. The experience was exceptional and made our evening truly special!"</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 border-2 border-white shadow-md">
                  <span className="font-bold text-blue-600">RP</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Rahul Patel</h4>
                  <p className="text-gray-500 text-sm">Mumbai</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 text-blue-200">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.39 23c-.8-1.68-1.79-2.77-2.78-3.9-1.39-1.61-3.32-1.55-4.95-1.94-1.54-.35-3.17-1.74-3.44-4.1-.31-2.68.7-4.12 2.08-5.16 1.55-1.18 3.83-1.32 5.31.28 1.01 1.09 1.28 2.85.87 4.58-.42 1.73-1.89 2.37-2.73 2.36-.84-.01-1.4-.18-2.15-.07-.74.12-1.46.12-1.46-.71s.96-.95 1.64-1c1.69-.13 2.33-2.19 1.33-3.47-.89-1.14-2.27-1.32-3.52-.78-1.25.54-1.97 1.59-2.34 2.86-.37 1.26-.36 2.74.6 4.72.36.31 1.17 1.31 2.09 1.73.92.42 1.66.62 2.35.36.91-.35 1.01-1.47 2.76-1.07 2.23.52 3.74 3.59 5.3 5.16 1.67 1.68 3.8 1.88 5.9 1.82 2.73-.08 3.25-1.87 3.25-1.87-.93.5-1.93.46-3.17.26s-2.8-3.02-3.85-5.44"></path>
                </svg>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)" }}
            >
              <div className="mb-6">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FBBF24" />  
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"As a gardener, this platform has transformed my business with a steady stream of clients. The scheduling features make it easy to manage multiple jobs."</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 border-2 border-white shadow-md">
                  <span className="font-bold text-green-600">PS</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Priya Singh</h4>
                  <p className="text-gray-500 text-sm">Bangalore</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 text-green-200">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.39 23c-.8-1.68-1.79-2.77-2.78-3.9-1.39-1.61-3.32-1.55-4.95-1.94-1.54-.35-3.17-1.74-3.44-4.1-.31-2.68.7-4.12 2.08-5.16 1.55-1.18 3.83-1.32 5.31.28 1.01 1.09 1.28 2.85.87 4.58-.42 1.73-1.89 2.37-2.73 2.36-.84-.01-1.4-.18-2.15-.07-.74.12-1.46.12-1.46-.71s.96-.95 1.64-1c1.69-.13 2.33-2.19 1.33-3.47-.89-1.14-2.27-1.32-3.52-.78-1.25.54-1.97 1.59-2.34 2.86-.37 1.26-.36 2.74.6 4.72.36.31 1.17 1.31 2.09 1.73.92.42 1.66.62 2.35.36.91-.35 1.01-1.47 2.76-1.07 2.23.52 3.74 3.59 5.3 5.16 1.67 1.68 3.8 1.88 5.9 1.82 2.73-.08 3.25-1.87 3.25-1.87-.93.5-1.93.46-3.17.26s-2.8-3.02-3.85-5.44"></path>
                </svg>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)" }}
            >
              <div className="mb-6">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FBBF24" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"Found a plumber within minutes for an emergency leak. The quick response and reasonable price saved my day. Highly recommend this service!"</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 border-2 border-white shadow-md">
                  <span className="font-bold text-indigo-600">AK</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Amit Kumar</h4>
                  <p className="text-gray-500 text-sm">Delhi</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 text-indigo-200">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.39 23c-.8-1.68-1.79-2.77-2.78-3.9-1.39-1.61-3.32-1.55-4.95-1.94-1.54-.35-3.17-1.74-3.44-4.1-.31-2.68.7-4.12 2.08-5.16 1.55-1.18 3.83-1.32 5.31.28 1.01 1.09 1.28 2.85.87 4.58-.42 1.73-1.89 2.37-2.73 2.36-.84-.01-1.4-.18-2.15-.07-.74.12-1.46.12-1.46-.71s.96-.95 1.64-1c1.69-.13 2.33-2.19 1.33-3.47-.89-1.14-2.27-1.32-3.52-.78-1.25.54-1.97 1.59-2.34 2.86-.37 1.26-.36 2.74.6 4.72.36.31 1.17 1.31 2.09 1.73.92.42 1.66.62 2.35.36.91-.35 1.01-1.47 2.76-1.07 2.23.52 3.74 3.59 5.3 5.16 1.67 1.68 3.8 1.88 5.9 1.82 2.73-.08 3.25-1.87 3.25-1.87-.93.5-1.93.46-3.17.26s-2.8-3.02-3.85-5.44"></path>
                </svg>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/testimonials">
              <motion.button 
                className="text-blue-600 font-medium flex items-center justify-center mx-auto hover:text-blue-800"
                whileHover={{ x: 5 }}
              >
                Read More Testimonials <ChevronRight size={16} className="ml-1" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action with improved design */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-blue-500 opacity-20"
            style={{ bottom: '-10%', right: '5%' }}
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }} 
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-48 h-48 rounded-full bg-indigo-400 opacity-20"
            style={{ top: '10%', left: '5%' }}
            animate={{ 
              y: [0, 20, 0],
              scale: [1, 1.05, 1],
            }} 
            transition={{ duration: 15, repeat: Infinity, delay: 1 }}
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            className="inline-block mb-6 bg-white bg-opacity-20 px-4 py-1 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white font-medium">Join 10+ Happy Users</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Transform How You Find Services?
          </motion.h2>
          
          <motion.p 
            className="mb-10 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join our growing community of service providers and customers today and experience the convenience of Pragrati Mitar
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/register">
              <motion.button 
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now
                <motion.div
                  className="opacity-0 group-hover:opacity-100"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight size={18} />
                </motion.div>
              </motion.button>
            </Link>
            
            <Link to="/learn-more">
              <motion.button 
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      {showChatBubble && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="relative">
            {/* Chat Message Bubble */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ 
                opacity: isChatHovered ? 1 : 0,
                y: isChatHovered ? 0 : 10,
                scale: isChatHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.2 }}
              className="absolute -top-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 w-48"
            >
              <p className="text-gray-700 text-sm font-medium">Need help? Chat with our AI assistant!</p>
              <div className="absolute bottom-0 right-5 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
            </motion.div>
            
            {/* Chat Icon Button */}
            <a 
              href="https://chatmate-bay.vercel.app/home/pragrati"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsChatHovered(true)}
              onMouseLeave={() => setIsChatHovered(false)}
            >
              <motion.div
                className="bg-blue-600 hover:bg-blue-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircle size={24} className="text-white" />
              </motion.div>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default LandingPage