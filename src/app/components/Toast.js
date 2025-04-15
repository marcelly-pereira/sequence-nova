import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX, FiAlertTriangle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ 
  type = 'info', 
  message, 
  duration = 5000, 
  onClose,
  position = 'top-right' 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const toastConfig = {
    success: {
      icon: <FiCheckCircle size={18} />,
      color: 'text-green-600/80',
      progressColor: 'bg-green-500/70',
      bgColor: 'bg-[#ebffeb]/40',  // Verde bem claro e suave
      borderColor: 'border-green-200/30'
    },
    error: {
      icon: <FiAlertCircle size={18} />,
      color: 'text-red-600/80',
      progressColor: 'bg-red-500/70',
      bgColor: 'bg-[#ffebeb]/40',  // Vermelho bem claro e suave, como solicitado
      borderColor: 'border-red-200/30'
    },
    warning: {
      icon: <FiAlertTriangle size={18} />,
      color: 'text-yellow-600/80',
      progressColor: 'bg-yellow-500/70',
      bgColor: 'bg-[#fffbeb]/40',  // Amarelo bem claro e suave
      borderColor: 'border-yellow-200/30'
    },
    info: {
      icon: <FiInfo size={18} />,
      color: 'text-blue-600/80',
      progressColor: 'bg-blue-500/70',
      bgColor: 'bg-[#ebf5ff]/40',  // Azul bem claro e suave
      borderColor: 'border-blue-200/30'
    },
  };

  const positionClasses = {
    'top-left': 'fixed top-4 left-4',
    'top-center': 'fixed top-4 left-1/2 -translate-x-1/2',
    'top-right': 'fixed top-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'fixed bottom-4 right-4',
    'center': 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const getAnimationProps = (pos) => {
    if (pos.includes('top')) {
      return {
        initial: { opacity: 0, y: -20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 }
      };
    } else if (pos.includes('bottom')) {
      return {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 }
      };
    } else {
      return {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 }
      };
    }
  };

  const config = toastConfig[type] || toastConfig.info;
  const positionClass = positionClasses[position] || positionClasses['top-right'];
  const animationProps = getAnimationProps(position);

  useEffect(() => {
    if (!duration) return;
    
    const decrementInterval = 10; // Update progress every 10ms
    const decrementAmount = (decrementInterval / duration) * 100;
    let currentProgress = 100;
    
    const timer = setInterval(() => {
      currentProgress -= decrementAmount;
      setProgress(Math.max(0, currentProgress));
      
      if (currentProgress <= 0) {
        clearInterval(timer);
        setIsVisible(false);
        setTimeout(() => {
          onClose && onClose();
        }, 300);
      }
    }, decrementInterval);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={animationProps.initial}
          animate={animationProps.animate}
          exit={animationProps.exit}
          transition={{ duration: 0.2 }}
          className={`${positionClass} z-50`}
        >
          <motion.div 
            className={`relative overflow-hidden rounded-lg shadow-md 
                      backdrop-blur-sm ${config.bgColor} 
                      border ${config.borderColor} text-gray-700 dark:text-gray-200
                      px-4 py-2.5 min-w-[240px] max-w-[300px]`}
            role="alert"
            layout
          >
            <div className="flex items-center gap-3">
              <span className={`flex-shrink-0 ${config.color}`}>
                {config.icon}
              </span>
              <p className="flex-1 text-sm">{message}</p>
              <button
                onClick={handleClose}
                className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-600 
                          transition-colors focus:outline-none"
                aria-label="Fechar notificação"
              >
                <FiX size={16} />
              </button>
            </div>
            
            {/* Progress bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              className={`absolute bottom-0 left-0 h-[2px] origin-left ${config.progressColor}`}
              transition={{ ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;