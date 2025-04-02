import React, { useState, useRef, useEffect } from 'react';
import { FaBellSlash } from 'react-icons/fa';
import UserMenu from './UserMenu';
import { SlBell, SlGrid } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';

const Header = ({ title = 'Dashboard' }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [notificacoesAberto, setNotificacoesAberto] = useState(false);
  const menuRef = useRef(null);
  const notificacoesRef = useRef(null);
  const navigate = useNavigate();

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const alternarNotificacoes = () => {
    setNotificacoesAberto(!notificacoesAberto);
  };

  const navegarParaNotificacoes = () => {
    setNotificacoesAberto(false);
    navigate('/notification');
  };

  useEffect(() => {
    function handleClickFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
      if (
        notificacoesRef.current &&
        !notificacoesRef.current.contains(event.target)
      ) {
        setNotificacoesAberto(false);
      }
    }

    document.addEventListener('mousedown', handleClickFora);

    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, []);

  const NotificacoesModal = () => (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 border">
      <div className="px-4 py-2 border-b">
        <h3 className="text-lg font-medium text-gray-700">Notificações</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        <FaBellSlash className="text-gray-400 mb-2" size={24} />
        <p className="text-gray-500">Sem notificações</p>
      </div>
      <div className="px-4 py-2 border-t text-center">
        <button
          onClick={navegarParaNotificacoes}
          className="text-gray-500 text-sm"
        >
          Ver todas as notificações
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white px-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-50 p-1.5 rounded-full mr-3">
            <SlGrid size={16} className='text-[#1526ff]' />
          </div>
          <h1 className="text-base font-semibold text-gray-800">{title}</h1>
        </div>

        <div className="flex items-center">
          <div className="mr-4 relative" ref={notificacoesRef}>
            <button
              className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
              onClick={alternarNotificacoes}
            >
              <SlBell size={16} className="text-gray-600" />
            </button>

            {notificacoesAberto && <NotificacoesModal />}
          </div>

          <div className="text-left relative" ref={menuRef}>
            <div
              className="cursor-pointer flex items-center space-x-2"
              onClick={alternarMenu}
            >
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
                <img
                  src="/static/assets/images/favicon.ico"
                  alt="Perfil"
                  className="h-8 w-8 object-cover"
                />
              </div>
              <div>
                <h1 className="text-xs font-bold text-gray-800">
                  Marcelly Pereira
                </h1>
                <p className="text-xs text-gray-500">
                  Estagiário - Controladoria
                </p>
              </div>
            </div>

            {menuAberto && <UserMenu onItemClick={() => setMenuAberto(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;