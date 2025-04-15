// app/components/Toast.js
import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX, FiAlertTriangle } from 'react-icons/fi';

const Toast = ({ type = 'info', message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Configurações de aparência baseadas no tipo
  const toastConfig = {
    success: {
      icon: <FiCheckCircle size={20} />,
      bgColor: 'bg-green-500',
      borderColor: 'border-green-600',
    },
    error: {
      icon: <FiAlertCircle size={20} />,
      bgColor: 'bg-red-500',
      borderColor: 'border-red-600',
    },
    warning: {
      icon: <FiAlertTriangle size={20} />,
      bgColor: 'bg-yellow-500',
      borderColor: 'border-yellow-600',
    },
    info: {
      icon: <FiInfo size={20} />,
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-600',
    },
  };

  const config = toastConfig[type] || toastConfig.info;

  // Efeito para fechar automaticamente após a duração
  useEffect(() => {
    if (!duration) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Tempo para a animação de fechamento
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Manipulador de fechamento manual
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  return (
    <div 
      className={`
        flex items-center p-3 rounded-md shadow-md border-l-4 ${config.borderColor}
        ${config.bgColor} text-white min-w-[280px] max-w-[400px]
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
    >
      <div className="mr-3">
        {config.icon}
      </div>
      <div className="flex-1 text-sm">{message}</div>
      <button
        onClick={handleClose}
        className="ml-2 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Fechar notificação"
      >
        <FiX size={18} />
      </button>
    </div>
  );
};

export default Toast;