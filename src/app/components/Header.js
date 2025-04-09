import React, { useState, useRef, useEffect } from 'react';
import UserMenu from './UserMenu';
import { SlBell, SlGrid } from "react-icons/sl";
import NotificationsModal from '../components/NotificationsModal';
import { AnimatePresence } from 'framer-motion';

const Header = ({ title = 'Automações' }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [notificacoesAberto, setNotificacoesAberto] = useState(false);
  const menuRef = useRef(null);
  const notificacoesRef = useRef(null);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const alternarNotificacoes = () => {
    setNotificacoesAberto(!notificacoesAberto);
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

  return (
    <div className="bg-white shadow-sm mx-2 mt-2 rounded-2xl mb-2">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h1 className="text-lg font-medium text-gray-800">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={notificacoesRef}>
            <button
              className="cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100"
              onClick={alternarNotificacoes}
            >
              <SlBell size={18} className="text-gray-600" />
            </button>

            <AnimatePresence>
              {notificacoesAberto && <NotificationsModal />}
            </AnimatePresence>
          </div>

          <div className="text-left relative" ref={menuRef}>
            <div
              className="cursor-pointer flex items-center space-x-3"
              onClick={alternarMenu}
            >
              <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=12"
                  alt="Perfil"
                  className="h-10 w-10 object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="text-sm font-medium text-gray-800">
                  Marcelly Pereira
                </h1>
                <p className="text-xs text-gray-500">
                  Estagiário - Controladoria
                </p>
              </div>
            </div>

            <AnimatePresence>
              {menuAberto && <UserMenu onItemClick={() => setMenuAberto(false)} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;