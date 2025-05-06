import { motion } from 'framer-motion'
import { Mail, Phone, Facebook, Twitter, Instagram, Globe } from 'lucide-react'

function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const iconVariants = {
    hover: { scale: 1.2, rotate: 5 }
  }

  return (
    <motion.footer 
      className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white relative overflow-hidden"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-blue-500 opacity-10"
          style={{ top: '10%', left: '5%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }} 
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-indigo-500 opacity-10"
          style={{ bottom: '-10%', right: '5%' }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }} 
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      <div className="container mx-auto p-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between">
          <motion.div 
            className="mb-8 md:mb-0"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Pragrati Mitar
            </motion.h2>
            <p className="text-gray-300 max-w-md">
              Connecting skilled service providers with customers across India.
              Our platform ensures quality, reliability, and satisfaction.
            </p>
            
            <motion.div 
              className="mt-4 inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="px-4 py-2 bg-blue-700 rounded-full text-sm font-medium flex items-center">
                <Globe size={16} className="mr-2" />
                Trusted by thousands across India
              </span>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="mb-8 md:mb-0"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">Contact Us</h3>
            <motion.div 
              className="flex items-center mb-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Mail size={18} className="mr-2 text-blue-400" />
              <p>support@pragatimitar.com</p>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Phone size={18} className="mr-2 text-blue-400" />
              <p>+91 98765 43210</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">Follow Us</h3>
            <div className="flex gap-4">
              <motion.a 
                href="#" 
                className="hover:text-blue-400 flex items-center"
                variants={iconVariants}
                whileHover="hover"
              >
                <Facebook size={20} className="mr-1" />
                Facebook
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-blue-400 flex items-center"
                variants={iconVariants}
                whileHover="hover"
              >
                <Twitter size={20} className="mr-1" />
                Twitter
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-blue-400 flex items-center"
                variants={iconVariants}
                whileHover="hover"
              >
                <Instagram size={20} className="mr-1" />
                Instagram
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-700 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-400">© 2025 Pragrati Mitar. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer