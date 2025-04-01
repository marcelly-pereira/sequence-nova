import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaBellSlash } from 'react-icons/fa';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
    navigate('/notification'); // Navega para a página de notificações
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

  // Modal de notificações pequeno
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
    <div className="bg-white px-4 shadow-sm">
      <div className="flex justify-end items-center">
        <div className="mr-4 relative" ref={notificacoesRef}>
          <button
            className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
            onClick={alternarNotificacoes}
          >
            <FaBell size={18} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
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
              <h1 className="text-sm font-bold text-gray-800">
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
  );
};

export default Header;
