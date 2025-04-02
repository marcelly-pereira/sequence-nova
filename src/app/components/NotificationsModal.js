import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div 
      className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800">Notificações</span>
        </div>
        <span className="text-sm text-blue-600">Novo</span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{notification.type}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
            {notification.checked && (
              <div className="w-5 h-5 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-2 text-center">
        <button 
          className="text-sm"
          onClick={() => navigate('/notification')}
        >
          Ver todas as notificações
        </button>
      </div>
    </div>
  );
};

export default NotificationsModal;