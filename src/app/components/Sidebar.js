import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Squares2X2Icon,
  CheckCircleIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

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
    key: 'personalizacoes',
    title: 'Personalizações',
    icon: Cog6ToothIcon,
    submenu: [
      { name: 'Cadastros', link: '/configuracoes' },
      { name: 'Automações', link: '/lista-automacoes' }
    ]
  }
];

const Sidebar = () => {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [itemHovered, setItemHovered] = useState(null);

  return (
    <motion.div
      layout
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => {
        setSidebarHovered(false);
        setItemHovered(null);
      }}
      animate={{ width: sidebarHovered ? 220 : 60 }}
      className="h-screen bg-white border-r shadow-sm flex flex-col overflow-hidden z-50"
    >
      {/* Logo dinâmica */}
      <div className="flex items-center justify-start h-16 px-4 gap-2">
        <AnimatePresence mode="wait">
          {!sidebarHovered ? (
            <motion.img
              key="logo-mini"
              src="/static/assets/images/logoNova.png"
              alt="Logo pequena"
              className="w-auto h-10 object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ) : (
            <motion.img
              key="logo-expandida"
              src="/static/assets/images/logoSequence.png"
              alt="Logo expandida"
              className="w-auto h-10 object-contain"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Menu principal */}
      <nav className="flex flex-col gap-1 px-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = itemHovered === item.key;

          return (
            <div
              key={item.key}
              onMouseEnter={() => setItemHovered(item.key)}
              onMouseLeave={() => setItemHovered(null)}
            >
              <motion.div
                layout
                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200"
                style={{
                  backgroundColor: isActive ? 'rgba(68, 30, 112, 0.1)' : 'transparent'
                }}
              >
                <Icon
                  className="h-5 w-5 transition-colors duration-200"
                  style={{
                    color: isActive ? '#441e70' : '#4b5563'
                  }}
                />
                {sidebarHovered && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap text-gray-800"
                  >
                    {item.title}
                  </motion.span>
                )}
              </motion.div>

              {/* Submenu */}
              <AnimatePresence>
                {sidebarHovered && item.submenu && (
                  <motion.div
                    key={`${item.key}-submenu`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-10 mt-1 overflow-hidden text-xs text-slate-600 space-y-1"
                  >
                    {item.submenu.map((sub, idx) => (
                      <Link
                        to={sub.link}
                        key={idx}
                        className="block py-1 px-2 rounded hover:bg-gray-100 hover:text-black transition-colors whitespace-nowrap"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
