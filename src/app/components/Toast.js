import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ type, message, duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(100);
  
  const config = {
    success: {
      icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      progressColor: 'bg-green-500',
      title: 'Sucesso'
    },
    error: {
      icon: <FaTimesCircle className="w-5 h-5 text-red-500" />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      progressColor: 'bg-red-500',
      title: 'Erro'
    },
    warning: {
      icon: <FaExclamationCircle className="w-5 h-5 text-yellow-500" />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      progressColor: 'bg-yellow-500',
      title: 'Aviso'
    },
    info: {
      icon: <FaInfoCircle className="w-5 h-5 text-blue-500" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      progressColor: 'bg-blue-500',
      title: 'Informação'
    }
  }[type];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 0.5;
      });
    }, duration / 200);
    
    const timeout = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);
  
  return (
    <div className={`w-80 rounded-md shadow-lg border-l-4 border-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'blue'}-500 ${config.bgColor} overflow-hidden`}>
      <div className="p-4 flex items-start">
        {config.icon}
        <div className="ml-3 w-full">
          <p className={`text-sm font-medium ${config.textColor}`}>{config.title}</p>
          <p className={`mt-1 text-sm ${config.textColor} opacity-90`}>{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <FaTimes className={`w-4 h-4 ${config.textColor}`} />
        </button>
      </div>
      
      <div className="w-full bg-gray-200 h-1">
        <div 
          className={`h-full ${config.progressColor} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const ToastDemo = () => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Demonstração de Toasts</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => addToast('success', "Operação realizada com sucesso!")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Mostrar Sucesso
        </button>
        
        <button
          onClick={() => addToast('error', "Ocorreu um erro ao processar a solicitação.")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Mostrar Erro
        </button>
        
        <button
          onClick={() => addToast('warning', "Atenção! Esta ação não pode ser desfeita.")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Mostrar Aviso
        </button>
        
        <button
          onClick={() => addToast('info', "A sincronização será concluída em alguns minutos.")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mostrar Informação
        </button>
      </div>
      
      <div className="fixed top-4 right-4 space-y-4 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            duration={5000}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastDemo;