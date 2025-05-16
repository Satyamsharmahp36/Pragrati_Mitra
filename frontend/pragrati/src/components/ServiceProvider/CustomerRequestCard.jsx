import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, CheckCircle, XCircle, Star, MessageSquare, Calendar, Mail, User, Clock } from "lucide-react";

const CustomerRequestCard = ({ booking, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: "auto", opacity: 1, transition: { duration: 0.3 } }
  };

  const statusConfig = {
    pending: { color: "bg-yellow-500/20 text-yellow-300", icon: <Clock size={16} className="mr-1" /> },
    accepted: { color: "bg-green-500/20 text-green-300", icon: <CheckCircle size={16} className="mr-1" /> },
    rejected: { color: "bg-red-500/20 text-red-300", icon: <XCircle size={16} className="mr-1" /> },
    completed: { color: "bg-blue-500/20 text-blue-300", icon: <CheckCircle size={16} className="mr-1" /> }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <User className="text-blue-400 mr-2" size={20} />
            <h3 className="text-xl font-bold text-white">{booking.customerName}</h3>
          </div>
          
          <div className="flex items-center">
            <motion.div 
              className={`px-3 py-1 rounded-full flex items-center ${statusConfig[booking.status].color}`}
              whileHover={{ scale: 1.05 }}
            >
              {statusConfig[booking.status].icon}
              <span>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <Calendar className="mr-2 text-blue-400" size={16} />
              <span>{new Date(booking.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Phone className="mr-2 text-blue-400" size={16} />
              <span>{booking.customerPhone}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Mail className="mr-2 text-blue-400" size={16} />
              <span>{booking.customerEmail}</span>
            </div>
          </div>
          
          {/* Actions based on status */}
          <div className="flex justify-end">
            {booking.status === 'pending' && (
              <div className="flex gap-2">
                <motion.button 
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => onStatusChange(booking._id, 'accepted')}
                >
                  <CheckCircle size={16} className="mr-1" />
                  Accept
                </motion.button>
                <motion.button 
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => onStatusChange(booking._id, 'rejected')}
                >
                  <XCircle size={16} className="mr-1" />
                  Reject
                </motion.button>
              </div>
            )}
            
            {booking.status === 'accepted' && (
              <div className="flex flex-col gap-2">
                <motion.button 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => onStatusChange(booking._id, 'completed')}
                >
                  <CheckCircle size={16} className="mr-1" />
                  Mark Completed
                </motion.button>
                <motion.a 
                  href={`tel:${booking.customerPhone}`}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Phone size={16} className="mr-1" />
                  Call Customer
                </motion.a>
              </div>
            )}
          </div>
        </div>
        
        {/* Message toggle button */}
        <motion.button
          className="mt-4 text-blue-400 flex items-center"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={16} className="mr-1" />
          {isExpanded ? "Hide Message" : "View Message"}
        </motion.button>
        
        {/* Expandable message section */}
        <motion.div
          className="overflow-hidden"
          variants={expandVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          <div className="bg-gray-700 p-4 rounded-lg mt-2">
            <p className="text-gray-300">{booking.message}</p>
          </div>
        </motion.div>

        {/* Review section for completed bookings */}
        {booking.status === 'completed' && booking.review && (
          <motion.div 
            className="mt-6 pt-4 border-t border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold mb-2 text-white flex items-center">
              <Star className="text-yellow-400 mr-1" size={16} />
              Customer Review:
            </h4>
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  {i < booking.review.rating ? 
                    <Star size={18} fill="currentColor" /> : 
                    <Star size={18} />}
                </motion.span>
              ))}
            </div>
            <p className="italic text-gray-300 bg-gray-700 p-3 rounded-lg">{booking.review.comment}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomerRequestCard;