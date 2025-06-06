import React, { useState } from 'react';
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
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleMouseEnter = (key) => {
    setHoveredItem(key);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 70 }}
      className="h-screen bg-white border-r border-slate-100 flex flex-col shadow-sm transition-all duration-300 z-50"
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-slate-100">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.img
              key="logo-expandida"
              src="/static/assets/images/logoSequence.png"
              alt="Logo expandida"
              className="w-auto h-10 object-contain"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            />
          ) : (
            <motion.img
              key="logo-mini"
              src="/static/assets/images/logoNova.png"
              alt="Logo pequena"
              className="w-auto h-10 object-contain mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Menu */}
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
                <div
                  className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150
                    ${isHovered || isActive ? 'bg-slate-50 text-[#3c0f55]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#3c0f55]'}`}
                  onClick={() => setActiveItem(item.key)}
                >
                  <div className="relative">
                    {(isHovered || isActive) && (
                      <motion.div
                        className="absolute -left-3 top-0 bottom-0 w-1 bg-[#3c0f55] rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    <Icon
                      className={`h-5 w-5 flex-shrink-0 ${isHovered || isActive ? 'text-[#3c0f55]' : 'text-slate-500'}`}
                    />
                  </div>
                  
                  {isOpen && (
                    <div className="ml-3 flex items-center justify-between w-full">
                      <span className={`text-sm ${isHovered || isActive ? 'font-medium' : 'font-normal'}`}>
                        {item.title}
                      </span>
                      {item.submenu && (
                        <motion.div
                          animate={{ rotate: isHovered || isActive ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

                {/* Submenu */}
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
                          <div
                            key={index}
                            className="flex items-center px-3 py-1.5 rounded-md cursor-pointer text-slate-600 hover:bg-slate-50 hover:text-[#3c0f55] text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              // lógica de navegação
                            }}
                          >
                            {sub.name}
                          </div>
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

      {/* Footer with user profile and toggle */}
      <div className="border-t border-slate-100 p-4">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="profile-open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center min-w-0 flex-1">
                <div className="h-8 w-8 rounded-full bg-[#3c0f55] flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://ui-avatars.com/api/?name=Marcelly+Pereira&background=3c0f55&color=fff" 
                    alt="Marcelly Pereira"
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-slate-800 truncate">Marcelly Pereira</p>
                  <p className="text-xs text-slate-500 truncate">Desenvolvedora</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-full hover:bg-slate-100 transition-colors ml-2 flex-shrink-0"
              >
                <ChevronDoubleLeftIcon className="w-4 h-4 text-slate-500" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="profile-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <ChevronDoubleRightIcon className="w-4 h-4 text-slate-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default Sidebar;