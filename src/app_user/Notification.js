import React, { useState } from 'react';
import BaseLayout from '../app/BaseLayout';

const Notification = () => {
  const [filtroAtivo, setFiltroAtivo] = useState('nao-lidas');

  const handleFiltroChange = (filtro) => {
    setFiltroAtivo(filtro);
  };

  return (
    <BaseLayout>
      <div className="bg-white min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
          <div className="flex items-center rounded-lg mb-6 w-full">
            <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h1 className="ml-3 text-md font-medium text-gray-800 flex-grow">
              Gerencie suas notificações recentes
            </h1>
          </div>

          <div className="border-b pb-4 mb-10">
            <div className="flex items-center">
              <div className="text-sm text-gray-700 mr-4">Filtrar por:</div>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-1 rounded-full text-sm ${
                    filtroAtivo === 'nao-lidas'
                      ? 'bg-[#1526ff] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleFiltroChange('nao-lidas')}
                >
                  Não lidas
                </button>
                <button
                  className={`px-4 py-1 rounded-full text-sm ${
                    filtroAtivo === 'lidas'
                      ? 'bg-[#1526ff] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleFiltroChange('lidas')}
                >
                  Lidas
                </button>
                <button
                  className={`px-4 py-1 rounded-full text-sm ${
                    filtroAtivo === 'todas'
                      ? 'bg-[#1526ff] text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleFiltroChange('todas')}
                >
                  Todas
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-300 mb-4">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6.44v0.61"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13.76V16.3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9996 1.93994C7.49965 1.93994 3.93965 5.49994 3.93965 9.99994V12.3299C3.93965 13.0399 3.67965 14.0999 3.24965 14.6999L2.10965 16.3299C1.33965 17.4499 1.86965 18.8299 3.15965 19.2399C8.44965 20.9399 15.5596 20.9399 20.8496 19.2399C22.0696 18.8499 22.6196 17.3999 21.8896 16.3299L20.7496 14.6999C20.3196 14.0999 20.0596 13.0399 20.0596 12.3299V9.99994C20.0596 5.50994 16.4896 1.93994 11.9996 1.93994Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 22C9.6 22.82 10.75 23.25 12 23.25C13.25 23.25 14.4 22.82 15.5 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="3"
                  y1="3"
                  x2="21"
                  y2="21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-medium mb-1">Sem notificações</p>
            <p className="text-gray-500 text-sm">
              Não há notificações para exibir neste momento.
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Notification;
