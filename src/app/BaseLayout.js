import React, { useState, useRef, useEffect } from 'react';
import {
  Squares2X2Icon,
  CheckCircleIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { SlBell } from "react-icons/sl";

const menuItems = [
  {
    key: 'sequencias',
    title: 'Sequência',
    icon: Squares2X2Icon,
    submenu: [
      { name: 'Minhas Sequências', link: '/sequencia' },
      { name: 'Templates de Sequências', link: '/templates' }
    ]
  },
  {
    key: 'tarefas',
    title: 'Tarefas',
    icon: CheckCircleIcon,
    submenu: [
      { name: 'Listas', link: '/tarefas' },
      { name: 'Recorrentes', link: '/detalhes_tarefas' }
    ]
  },
  {
    key: 'empresas',
    title: 'Empresas',
    icon: BuildingOffice2Icon,
    submenu: [
      { name: 'Clientes Ativos', link: '/empresas' }
    ]
  },
  {
    key: 'financeiro',
    title: 'Financeiro',
    icon: BanknotesIcon,
    submenu: [
      { name: 'Receitas', link: '/receitas' },
      { name: 'Despesas', link: '/despesas' }
    ]
  },
  {
    key: 'relatorios',
    title: 'Relatórios',
    icon: ArrowTrendingUpIcon,
    submenu: [
      { name: 'Desempenho', link: '/relatorios/desempenho' },
      { name: 'Análise', link: '/relatorios/analise' }
    ]
  },
  {
    key: 'personalizacoes',
    title: 'Configurações',
    icon: Cog6ToothIcon,
    submenu: [
      { name: 'Cadastros', link: '/configuracoes' },
      { name: 'Automações', link: '/lista-automacoes' }
    ]
  }
];

const BaseLayout = ({ title = 'Automações', children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState('tarefas');
  const [notificacoesAberto, setNotificacoesAberto] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const notificacoesRef = useRef(null);

  const handleMouseEnter = (key) => {
    setHoveredItem(key);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const alternarNotificacoes = () => {
    setNotificacoesAberto(!notificacoesAberto);
  };

  const alternarTema = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    function handleClickFora(event) {
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar com animação melhorada */}
      <motion.aside
        layout
        className="bg-white border-r border-slate-100 flex flex-col z-30 fixed left-0 top-0 h-full shadow-sm"
        style={{
          width: isOpen ? "240px" : "fit-content",
        }}
      >
        {/* Logo Header */}
        <div className="flex items-center h-14 px-4 border-b border-slate-100 flex-shrink-0">
          <motion.div layout className="flex items-center">
            <motion.div
              layout
              className="grid size-10 place-content-center rounded-md bg-[#3c0f55] flex-shrink-0"
            >
              <svg
                width="20"
                height="auto"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white"
              >
                <path
                  d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                  stopColor="#000000"
                ></path>
                <path
                  d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                  stopColor="#000000"
                ></path>
              </svg>
            </motion.div>
            {isOpen && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className="ml-3"
              >
                <span className="block text-sm font-semibold text-gray-800">SequenceFlow</span>
                <span className="block text-xs text-slate-500">Pro Plan</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Menu navegação */}
        <div className="flex-1 overflow-y-auto py-4 text-sm">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredItem === item.key;
              const isActive = activeItem === item.key;

              return (
                <div 
                  key={item.key}
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.button
                    layout
                    onClick={() => setActiveItem(item.key)}
                    className={`relative flex h-10 w-full items-center rounded-lg transition-colors ${
                      isActive ? 'bg-slate-50 text-[#3c0f55]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#3c0f55]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#3c0f55] rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    <motion.div
                      layout
                      className="grid h-full w-10 place-content-center text-lg flex-shrink-0"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    
                    {isOpen && (
                      <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-sm font-medium ml-3 flex-1 text-left"
                      >
                        {item.title}
                      </motion.span>
                    )}

                    {isOpen && item.submenu && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.125 }}
                        className="mr-3"
                      >
                        <motion.div
                          animate={{ rotate: isHovered || isActive ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRightIcon className="w-3.5 h-3.5" />
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.button>

                  {isOpen && item.submenu && (
                    <AnimatePresence initial={false}>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.15 }}
                          className="ml-10 mt-1 space-y-1"
                        >
                          {item.submenu.map((sub, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center px-3 py-1.5 rounded-md cursor-pointer text-slate-600 hover:bg-slate-50 hover:text-[#3c0f55] text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              {sub.name}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Toggle Button */}
        <motion.button
          layout
          onClick={() => setIsOpen(!isOpen)}
          className="border-t border-slate-100 transition-colors hover:bg-slate-50 flex-shrink-0"
        >
          <div className="flex items-center p-3">
            <motion.div
              layout
              className="grid size-10 place-content-center text-lg flex-shrink-0"
            >
              <ChevronDoubleLeftIcon
                className={`w-4 h-4 text-slate-500 transition-transform ${!isOpen && "rotate-180"}`}
              />
            </motion.div>
            {isOpen && (
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className="text-sm font-medium text-slate-600 ml-3"
              >
                Ocultar
              </motion.span>
            )}
          </div>
        </motion.button>
      </motion.aside>

      <div 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: isOpen ? '240px' : '70px' }}
      >
        {/* Header */}
        <header className="bg-white border-b border-slate-100 h-14 flex items-center justify-between px-6 z-40 flex-shrink-0">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={alternarTema}
              className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="h-4 w-4 text-gray-600" />
              ) : (
                <MoonIcon className="h-4 w-4 text-gray-600" />
              )}
            </button>

            <div className="relative" ref={notificacoesRef}>
              <button
                className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
                onClick={alternarNotificacoes}
              >
                <SlBell size={14} className="text-gray-600" />
              </button>

              <AnimatePresence>
                {notificacoesAberto && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <h3 className="text-sm font-medium text-gray-800">Notificações</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        Nenhuma notificação no momento
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-2 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;