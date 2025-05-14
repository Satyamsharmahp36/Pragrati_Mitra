import { motion } from 'framer-motion'
import { Mail, Phone, Facebook, Twitter, Instagram, Globe, ChevronUp, Sparkles, Star } from 'lucide-react'

function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  }

  const iconVariants = {
    hover: { 
      scale: 1.2, 
      rotate: 8,
      color: "#60A5FA", 
      transition: { 
        type: "spring", 
        stiffness: 500 
      }
    }
  }

  const pulseVariant = {
    initial: { opacity: 0.7, scale: 1 },
    animate: { 
      opacity: [0.7, 0.9, 0.7],
      scale: [1, 1.05, 1],
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <motion.footer 
      className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white relative overflow-hidden"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-blue-600 opacity-5"
          style={{ top: '5%', left: '10%' }}
          animate={{ 
            scale: [1, 1.4, 1],
            x: [0, 20, 0],
            opacity: [0.05, 0.08, 0.05]
          }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-indigo-500 opacity-5"
          style={{ bottom: '-15%', right: '10%' }}
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -20, 0],
            opacity: [0.05, 0.1, 0.05]
          }} 
          transition={{ duration: 18, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-40 h-40 rounded-full bg-purple-600 opacity-5"
          style={{ top: '40%', right: '25%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05]
          }} 
          transition={{ duration: 10, repeat: Infinity, delay: 5, ease: "easeInOut" }}
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.div className="inline-flex items-center space-x-2">
              <motion.div 
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={18} className="text-white" />
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Pragrati Mitar
              </motion.h2>
            </motion.div>
            
            <p className="text-gray-300 max-w-md leading-relaxed">
              Connecting skilled service providers with customers across India.
              Our platform ensures quality, reliability, and satisfaction.
            </p>
            
            <motion.div 
              className="inline-flex"
              variants={pulseVariant}
              initial="initial"
              animate="animate"
            >
              <motion.span 
                className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-full text-sm font-medium flex items-center shadow-lg shadow-blue-900/20"
                whileHover={{ scale: 1.05 }}
              >
                <Globe size={16} className="mr-2" />
                Trusted by thousands across India
              </motion.span>
            </motion.div>
          </motion.div>
          
          {/* Contact Section */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-indigo-300 flex items-center">
              <Star size={16} className="mr-2 text-indigo-400" />
              Contact Us
            </h3>
            
            <div className="space-y-4">
              <motion.a 
                href="mailto:support@pragatimitar.com"
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-indigo-900/60 mr-3 flex items-center justify-center"
                  whileHover={{ backgroundColor: "#4338ca" }}
                >
                  <Mail size={18} className="text-blue-400 group-hover:text-blue-300" />
                </motion.div>
                <div>
                  <p className="text-gray-400 text-sm">Email Us</p>
                  <p className="text-white group-hover:text-blue-300 transition-colors">support@pragatimitar.com</p>
                </div>
              </motion.a>
              
              <motion.a 
                href="tel:+919876543210"
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-indigo-900/60 mr-3 flex items-center justify-center"
                  whileHover={{ backgroundColor: "#4338ca" }}
                >
                  <Phone size={18} className="text-blue-400 group-hover:text-blue-300" />
                </motion.div>
                <div>
                  <p className="text-gray-400 text-sm">Call Us</p>
                  <p className="text-white group-hover:text-blue-300 transition-colors">+91 98765 43210</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Social Section */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-indigo-300 flex items-center">
              <Star size={16} className="mr-2 text-indigo-400" />
              Connect With Us
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <motion.a 
                href="#" 
                className="flex items-center p-3 rounded-lg hover:bg-indigo-900/40 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-blue-900/40 flex items-center justify-center mr-3"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Facebook size={20} className="text-blue-400 group-hover:text-blue-300" />
                </motion.div>
                <span className="group-hover:text-blue-300">Facebook</span>
              </motion.a>
              
              <motion.a 
                href="#" 
                className="flex items-center p-3 rounded-lg hover:bg-indigo-900/40 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-blue-900/40 flex items-center justify-center mr-3"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Twitter size={20} className="text-blue-400 group-hover:text-blue-300" />
                </motion.div>
                <span className="group-hover:text-blue-300">Twitter</span>
              </motion.a>
              
              <motion.a 
                href="#" 
                className="flex items-center p-3 rounded-lg hover:bg-indigo-900/40 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-blue-900/40 flex items-center justify-center mr-3"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Instagram size={20} className="text-blue-400 group-hover:text-blue-300" />
                </motion.div>
                <span className="group-hover:text-blue-300">Instagram</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute right-10 bottom-20 md:right-16 md:bottom-16"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 1 
          }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} className="text-white" />
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="mt-12 pt-6 border-t border-gray-800 text-center relative"
          variants={itemVariants}
        >
          <motion.div 
            className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1.5 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-400">© 2025 Pragrati Mitar. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer