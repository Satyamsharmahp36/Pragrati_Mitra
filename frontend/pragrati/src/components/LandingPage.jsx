import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  ArrowRight,
  Menu,
  Moon,
  Sparkles,
  CheckCircle2,
  Leaf,
  Clock,
  Zap,
  Award,
  Heart
} from 'lucide-react';
import { useState, useEffect } from 'react';

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [isChatHovered, setIsChatHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setShowChatBubble(true);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemFadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const slideIn = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 100 }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 100 }
  };
  
  const navVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20 
      } 
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-5 blur-3xl"
          style={{ top: '10%', right: '5%' }}
          animate={{ 
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }} 
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full bg-blue-600 opacity-5 blur-3xl"
          style={{ bottom: '5%', left: '-10%' }}
          animate={{ 
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }} 
          transition={{ duration: 25, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-cyan-400 opacity-5 blur-3xl"
          style={{ top: '40%', left: '20%' }}
          animate={{ 
            x: [0, 40, 0],
            scale: [1, 1.2, 1],
          }} 
          transition={{ duration: 30, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Navigation */}
      {/* <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="text-cyan-400" size={24} />
                <span className="font-bold text-xl text-white tracking-tight">Pragrati Mitar</span>
              </motion.div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">Services</Link>
              <Link to="/how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors">How It Works</Link>
              <Link to="/testimonials" className="text-gray-300 hover:text-cyan-400 transition-colors">Testimonials</Link>
              <Link to="/register">
                <motion.button 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ArrowRight size={16} className="ml-2" />
                </motion.button>
              </Link>
            </div>
            
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav> */}
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-gray-900 z-40 md:hidden flex flex-col p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-end mb-8">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className="text-white"
              >
                <X size={24} />
              </motion.button>
            </div>
            
            <div className="flex flex-col items-center space-y-8 text-lg">
              <Link to="/services" className="text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link to="/how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </Link>
              <Link to="/testimonials" className="text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Testimonials
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <motion.button 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block mb-4 bg-cyan-500/20 px-4 py-1 rounded-full border border-cyan-500/30"
              >
                <span className="text-cyan-400 font-medium flex items-center">
                  <Sparkles size={16} className="mr-2" />
                  Transforming Service Delivery
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white">Connect with expert</span>
                {" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  service providers
                </span>
                {" "}
                <span className="text-white">at your fingertips</span>
              </motion.h1>
              
              <motion.p 
                className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Discover a seamless digital experience connecting skilled professionals with customers, revolutionizing how services are found and delivered.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link to="/register">
                  <motion.button 
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium shadow-lg flex items-center justify-center gap-2 group"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0px 10px 25px -5px rgba(8, 145, 178, 0.4)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Users size={18} />
                    Get Started
                    <motion.span
                      className="opacity-0 group-hover:opacity-100 ml-1"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </motion.button>
                </Link>
                
                <Link to="/login">
                  <motion.button 
                    className="px-8 py-4 border border-gray-700 bg-gray-800/50 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:border-cyan-500 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Briefcase size={18} />
                    Login
                  </motion.button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="mt-12 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-br ${
                      ['from-purple-400 to-purple-600', 
                       'from-cyan-400 to-blue-600', 
                       'from-green-400 to-green-600', 
                       'from-amber-400 to-amber-600'][i]
                    }`}></div>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">Trusted by <span className="text-cyan-400 font-semibold">10,000+</span> users</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 lg:pl-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <motion.div 
                  className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-6 rounded-xl shadow-xl relative z-10"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Active Services</h3>
                    <span className="bg-cyan-500/20 text-cyan-400 text-xs font-medium px-2 py-1 rounded-full">Live</span>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.div 
                      className="bg-gray-900/80 border border-gray-800 p-4 rounded-lg flex items-center gap-4"
                      whileHover={{ x: 5 }}
                    >
                      <div className="bg-cyan-500/20 text-cyan-400 p-3 rounded-full">
                        <ChefHat size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-white">Chef Service</h4>
                          <span className="text-cyan-400 text-sm">30 min</span>
                        </div>
                        <p className="text-gray-400 text-sm">Premium dinner preparation</p>
                      </div>
                      <div className="bg-cyan-500 text-white h-8 w-8 rounded-full flex items-center justify-center">
                        <ChevronRight size={16} />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gray-900/80 border border-gray-800 p-4 rounded-lg flex items-center gap-4"
                      whileHover={{ x: 5 }}
                    >
                      <div className="bg-green-500/20 text-green-400 p-3 rounded-full">
                        <Sprout size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-white">Garden Service</h4>
                          <span className="text-green-400 text-sm">2 hrs</span>
                        </div>
                        <p className="text-gray-400 text-sm">Landscape maintenance</p>
                      </div>
                      <div className="bg-green-500 text-white h-8 w-8 rounded-full flex items-center justify-center">
                        <ChevronRight size={16} />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gray-900/80 border border-gray-800 p-4 rounded-lg flex items-center gap-4"
                      whileHover={{ x: 5 }}
                    >
                      <div className="bg-amber-500/20 text-amber-400 p-3 rounded-full">
                        <Droplets size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-white">Plumbing Service</h4>
                          <span className="text-amber-400 text-sm">1 hr</span>
                        </div>
                        <p className="text-gray-400 text-sm">Emergency repairs</p>
                      </div>
                      <div className="bg-amber-500 text-white h-8 w-8 rounded-full flex items-center justify-center">
                        <ChevronRight size={16} />
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="#F59E0B" />
                        ))}
                      </div>
                      <span className="text-white text-sm">4.9 avg. rating</span>
                    </div>
                    <div className="text-cyan-400 text-sm font-medium">View All</div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg z-20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield size={24} />
                </motion.div>
                
                <motion.div 
                  className="absolute -top-4 -right-4 bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg shadow-lg z-20 flex items-center gap-2"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#F59E0B" />
                    ))}
                  </div>
                  <span className="text-white text-xs font-medium">Top Rated</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Blurred gradient at bottom */}
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-cyan-500/20 px-4 py-1 rounded-full border border-cyan-500/30 mb-4"
            >
              <span className="text-cyan-400 font-medium">WHY CHOOSE US</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Premium Features
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Discover how Pragrati Mitar revolutionizes service delivery with our powerful platform
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl relative overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -10, backgroundColor: "rgba(17, 24, 39, 0.8)" }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-500/20 rounded-full mb-6 group-hover:bg-blue-500/30 transition-all">
                  <Briefcase size={24} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">For Service Providers</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Create professional profiles showcasing your expertise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Set your own pricing and availability with smart scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Build your reputation with verified client reviews</span>
                  </li>
                </ul>
                <motion.div 
                  className="mt-6 text-blue-400 font-medium flex items-center cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  Learn more <ChevronRight size={16} className="ml-1" />
                </motion.div>
              </div>
              
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-500/10 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 w-0 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl relative overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -10, backgroundColor: "rgba(17, 24, 39, 0.8)" }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center w-14 h-14 bg-cyan-500/20 rounded-full mb-6 group-hover:bg-cyan-500/30 transition-all">
                  <Users size={24} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">For Customers</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Find skilled professionals with location-based discovery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Book services instantly with real-time availability</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Share your experiences with ratings and reviews</span>
                  </li>
                </ul>
                <motion.div 
                  className="mt-6 text-cyan-400 font-medium flex items-center cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  Learn more <ChevronRight size={16} className="ml-1" />
                </motion.div>
              </div>
              
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-cyan-500/10 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 w-0 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl relative overflow-hidden group"
              variants={itemFadeIn}
              whileHover={{ y: -10, backgroundColor: "rgba(17, 24, 39, 0.8)" }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center w-14 h-14 bg-green-500/20 rounded-full mb-6 group-hover:bg-green-500/30 transition-all">
                  <Shield size={24} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Our Guarantees</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <span>All service providers are thoroughly vetted and verified</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <span>Secure payment processing with multiple options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={18} className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                    <span>100% satisfaction guarantee with premium support</span>
                  </li>
                </ul>
                <motion.div 
                  className="mt-6 text-green-400 font-medium flex items-center cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  Learn more <ChevronRight size={16} className="ml-1" />
                </motion.div>
              </div>
              
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-green-500/10 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 w-0 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Service Categories */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-purple-500/20 px-4 py-1 rounded-full border border-purple-500/30 mb-4"
            >
              <span className="text-purple-400 font-medium">EXPLORE SERVICES</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Popular Service Categories
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Browse through our most requested services that connect customers with top-rated professionals
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { 
                icon: <ChefHat className="text-amber-400" size={28} />, 
                title: "Culinary Services", 
                count: 348, 
                color: "amber",
                items: ["Personal Chefs", "Catering", "Cooking Classes"]
              },
              { 
                icon: <Sprout className="text-green-400" size={28} />, 
                title: "Home & Garden", 
                count: 256, 
                color: "green",
                items: ["Gardening", "Lawn Care", "Home Cleaning"]
              },
              { 
                icon: <Briefcase className="text-blue-400" size={28} />, 
                title: "Professional", 
                count: 192, 
                color: "blue",
                items: ["Financial Advising", "Legal Services", "Business Consulting"]
              },
              { 
                icon: <Heart className="text-rose-400" size={28} />, 
                title: "Health & Wellness", 
                count: 217, 
                color: "rose",
                items: ["Personal Training", "Nutrition", "Massage Therapy"]
              }
            ].map((category, index) => (
              <motion.div 
                key={index}
                className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden group cursor-pointer`}
                variants={itemFadeIn}
                whileHover={{ y: -10, backgroundColor: "rgba(17, 24, 39, 0.8)" }}
              >
                <div className={`bg-${category.color}-500/10 p-6`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className={`bg-${category.color}-500/20 p-3 rounded-full`}>
                      {category.icon}
                    </div>
                    <div className={`text-${category.color}-400 text-sm font-medium`}>
                      {category.count} Providers
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle2 size={16} className={`text-${category.color}-400 mr-2`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <motion.div 
                    className={`mt-6 text-${category.color}-400 font-medium flex items-center`}
                    whileHover={{ x: 5 }}
                  >
                    Explore {category.title} <ChevronRight size={16} className="ml-1" />
                  </motion.div>
                </div>
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${category.color}-400 to-${category.color}-600 w-0 group-hover:w-full transition-all duration-300`}></div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/all-services">
              <motion.button 
                className="px-6 py-3 border border-gray-700 bg-gray-800/50 text-white rounded-full font-medium inline-flex items-center justify-center gap-2 hover:border-purple-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Categories
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative bg-gray-900/50">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-blue-600 opacity-5 blur-3xl"
            style={{ top: '30%', right: '-10%' }}
            animate={{ 
              x: [0, 50, 0],
              scale: [1, 1.2, 1],
            }} 
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-blue-500/20 px-4 py-1 rounded-full border border-blue-500/30 mb-4"
            >
              <span className="text-blue-400 font-medium">SIMPLE PROCESS</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              How It Works
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Getting started with Pragrati Mitar is easy - follow these simple steps
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                icon: <Search className="text-blue-400" size={32} />,
                title: "Discover",
                description: "Browse through our extensive catalog of verified service providers. Filter by location, category, ratings, and availability.",
                number: "01",
                color: "blue"
              },
              {
                icon: <Calendar className="text-cyan-400" size={32} />,
                title: "Book",
                description: "Select your preferred service provider, choose your desired time slot, and book instantly with our secure platform.",
                number: "02",
                color: "cyan"
              },
              {
                icon: <ThumbsUp className="text-green-400" size={32} />,
                title: "Enjoy",
                description: "Receive quality service from skilled professionals and share your experience with our community through ratings and reviews.",
                number: "03",
                color: "green"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl overflow-hidden group"
                variants={itemFadeIn}
                whileHover={{ y: -10, backgroundColor: "rgba(17, 24, 39, 0.8)" }}
              >
                <div className="absolute -right-6 -top-6 text-5xl font-bold text-gray-700/30 group-hover:text-gray-700/40 transition-colors">
                  {step.number}
                </div>
                <div className={`bg-${step.color}-500/20 p-4 rounded-full inline-flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${step.color}-400 to-${step.color}-600 w-0 group-hover:w-full transition-all duration-300`}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-amber-500/20 px-4 py-1 rounded-full border border-amber-500/30 mb-4"
            >
              <span className="text-amber-400 font-medium">TESTIMONIALS</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              What Our Users Say
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Hear from our satisfied customers and service providers about their experience
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              {
                name: "Aarav Patel",
                role: "Homeowner",
                image: "https://i.pravatar.cc/100?img=1",
                quote: "Finding reliable home services used to be a nightmare. With Pragrati Mitar, I can quickly connect with verified professionals who deliver quality work every time.",
                rating: 5
              },
              {
                name: "Priya Sharma",
                role: "Professional Chef",
                image: "https://i.pravatar.cc/100?img=5",
                quote: "As a culinary professional, this platform has transformed my business. I've expanded my client base and can focus on what I love - creating amazing food experiences.",
                rating: 5
              },
              {
                name: "Vikram Mehta",
                role: "Business Owner",
                image: "https://i.pravatar.cc/100?img=3",
                quote: "The scheduling system is a game-changer for my consulting business. My clients appreciate the smooth booking experience and I love the professional interface.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl relative"
                variants={itemFadeIn}
                whileHover={{ y: -10 }}
              >
                <div className="absolute -top-5 -left-5">
                  <div className="p-2 bg-gray-900 rounded-full border border-gray-700">
                    <MessageCircle size={24} className="text-amber-400" />
                  </div>
                </div>
                
                <div className="flex text-amber-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/testimonials">
              <motion.button 
                className="px-6 py-3 border border-gray-700 bg-gray-800/50 text-white rounded-full font-medium inline-flex items-center justify-center gap-2 hover:border-amber-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Testimonials
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-10 md:p-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Ready to transform how you<br className="hidden md:block" /> discover services?
                </motion.h2>
                
                <motion.p 
                  className="text-gray-300 max-w-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Join thousands of satisfied users who've found the perfect service providers for their needs. Sign up today and experience the difference.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/register">
                  <motion.button 
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0px 10px 25px -5px rgba(8, 145, 178, 0.4)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
                
                <Link to="/contact">
                  <motion.button 
                    className="px-8 py-4 border border-gray-400/30 bg-gray-800/50 text-white rounded-full font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center mb-6">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="text-cyan-400" size={24} />
                  <span className="font-bold text-xl text-white tracking-tight">Pragrati Mitar</span>
                </motion.div>
              </Link>
              <p className="text-gray-400 mb-6 pr-8">
                Transforming service delivery with our innovative platform connecting skilled professionals with customers across India.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social, index) => (
                  <a 
                    key={index} 
                    href={`#${social}`} 
                    className="bg-gray-800 text-gray-400 hover:text-cyan-400 p-2 rounded-full transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                {["About Us", "Our Mission", "Careers", "Press", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6">Services</h3>
              <ul className="space-y-4">
                {["For Professionals", "For Customers", "Pricing", "Enterprise", "Partner Program"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                {["Help Center", "Blog", "Tutorials", "FAQs", "Community"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Pragrati Mitar. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Bubble
      <AnimatePresence>
        {showChatBubble && (
          <motion.div 
            className="fixed bottom-6 right-6 z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="bg-white p-3 rounded-lg shadow-lg mb-4 max-w-xs mx-auto"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ delay: 0.2 }}
              style={{ display: isChatHovered ? "block" : "none" }}
            >
              <p className="text-gray-800 text-sm">Need help? Start a chat with our support team!</p>
            </motion.div>
            
            <motion.button 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsChatHovered(true)}
              onMouseLeave={() => setIsChatHovered(false)}
              onClick={() => console.log("Chat opened")}
            >
              <MessageCircle size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}

export default LandingPage;

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Calendar(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}