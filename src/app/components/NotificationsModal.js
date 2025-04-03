import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotificationsModal = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 3, type: 'Empresa inativada', time: 'Agora', checked: true },
    { id: 6, type: 'Empresa inativada', time: 'Agora', checked: true },
    { id: 7, type: 'Empresa inativada', time: 'Agora', checked: true },
    { id: 6, type: 'Empresa inativada', time: 'Agora', checked: true },
    { id: 7, type: 'Empresa inativada', time: 'Agora', checked: true }
  ];

  return (
    <motion.div 
      className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
      onClick={(e) => e.stopPropagation()}
      initial="closed"
      animate="open"
      exit="closed"
      variants={containerVariants}
      style={{ originY: "top" }}
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800">Notificações</span>
        </div>
        <span className="text-sm text-blue-600">Novo</span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => (
          <NotificationItem 
            key={index} 
            notification={notification} 
            index={index}
          />
        ))}
      </div>

      <motion.div 
        className="p-2 text-center"
        variants={itemVariants}
      >
        <button 
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => navigate('/notification')}
        >
          Ver todas as notificações
        </button>
      </motion.div>
    </motion.div>
  );
};

const NotificationItem = ({ notification, index }) => {
  return (
    <motion.div 
      className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
      variants={itemVariants}
      custom={index}
    >
      <div className="flex items-center space-x-3">
        <motion.div 
          className="w-5 h-5 text-yellow-500"
          variants={iconVariants}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
        </motion.div>
        <div>
          <p className="text-sm font-medium text-gray-800">{notification.type}</p>
          <p className="text-xs text-gray-500">{notification.time}</p>
        </div>
      </div>
      {notification.checked && (
        <motion.div 
          className="w-5 h-5 text-blue-500"
          variants={iconVariants}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

const containerVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
  closed: {
    opacity: 0,
    y: -10,
  },
};

const iconVariants = {
  open: { 
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300 }
  },
  closed: { 
    scale: 0.6,
    opacity: 0 
  },
};

export default NotificationsModal;