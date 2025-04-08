import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SlGrid } from "react-icons/sl";

const Icon = ({ children }) => (
  <div className="w-10 h-10 flex items-center justify-center transition-colors duration-200 text-white">
    {children}
  </div>
);

const Sidebar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const menuRefs = useRef({});
  const submenuRef = useRef(null);
  const timeoutRef = useRef(null);
  const [submenuVisible, setSubmenuVisible] = useState(false);

  const menuItems = [
    {
      key: 'sequencias',
      title: 'Sequência',
      icon: (
        <SlGrid size={16}/>
      ),
      path: '/sequences',
      submenu: [
        { name: 'Minhas Sequências', link: '/sequencia' },
        { name: 'Templates de Sequências', link: '/templates' }
      ]
    },
    {
      key: 'tarefas',
      title: 'Tarefas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      ),
      path: '/tarefas',
      submenu: [
        { name: 'Listas', link: '/tarefas' },
        { name: 'Recorrentes', link: '/detalhes_tarefas' }
      ]
    },
    {
      key: 'empresas',
      title: 'Empresas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18"></path>
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
          <path d="M9 9h6"></path>
          <path d="M9 13h6"></path>
          <path d="M9 17h6"></path>
        </svg>
      ),
      path: '/empresas',
      submenu: [
        { name: 'Clientes Ativos', link: '/empresas' },
      ]
    },
    {
      key: 'personalizações',
      title: 'Personalizações',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      path: '/configuracoes',
      submenu: [
        { name: 'Cadastros', link: '/configurações' },
        { name: 'Automações', link: '/lista-automacoes' }
      ]
    }
  ];

  useEffect(() => {
    menuItems.forEach(item => {
      if (!menuRefs.current[item.key]) {
        menuRefs.current[item.key] = React.createRef();
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeSubmenu) {
      setTimeout(() => {
        setSubmenuVisible(true);
      }, 50);
    } else {
      setSubmenuVisible(false);
    }
  }, [activeSubmenu]);

  const handleMenuHover = (key) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveSubmenu(key);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 100);
  };

  const renderSubmenu = (menuKey) => {
    if (!menuKey) return null;

    const menu = menuItems.find(item => item.key === menuKey);
    if (!menu || !menu.submenu) return null;

    const ref = menuRefs.current[menuKey];
    if (!ref) return null;

    const rect = ref.getBoundingClientRect();

    const lastItemRef = menuRefs.current[menuItems[menuItems.length - 1].key];
    let lastBottom = 0;
    if (lastItemRef) {
      const lastRect = lastItemRef.getBoundingClientRect();
      lastBottom = lastRect.bottom + 10;
    }

    const heightToLastItem = lastBottom - rect.top + 150;

    return (
      <div
        ref={submenuRef}
        className={`fixed left-12 z-50 shadow-lg transition-all duration-300 ease-in-out ${
          submenuVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
        style={{ top: rect.top, width: '180px' }}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
        onMouseLeave={handleMenuLeave}
      >
        <div className="flex flex-col w-full">
          <div className="text-md bg-indigo-800 text-white text-base px-2 py-2 font-medium flex items-center h-10 w-full">
            {menu.title}
          </div>

          <div
            className="bg-[#252563] w-full overflow-hidden"
            style={{ height: `${heightToLastItem}px` }}
          >
            <ul className="py-2 w-full">
              {menu.submenu.map((item, index) => (
                <li 
                  key={index} 
                  className="w-full text-left transform transition-transform duration-300 ease-in-out" 
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    transform: submenuVisible ? 'translateX(0)' : 'translateX(-10px)',
                    opacity: submenuVisible ? 1 : 0
                  }}
                >
                  <Link
                    to={item.link}
                    className="block py-2 text-gray-300 hover:text-white text-md transition-colors w-full text-left px-8"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const MenuItem = ({ item }) => (
    <div
      className={`relative w-16 h-10 flex justify-center transition-colors duration-200 ${activeSubmenu === item.key ? 'bg-indigo-800' : 'hover:bg-indigo-800/60'}`}
      ref={ref => menuRefs.current[item.key] = ref}
      onMouseEnter={() => handleMenuHover(item.key)}
      onMouseLeave={handleMenuLeave}
    >
      <Link to={item.path} aria-label={item.title}>
        <Icon>{item.icon}</Icon>
      </Link>
    </div>
  );

  return (
    <div className="h-full w-12 bg-indigo-900 fixed left-0 top-0 flex flex-col items-center py-[1.4rem]">
      <div className="mb-8">
        <Link to="/" className="flex items-center justify-center" aria-label="Home">
          <img src='/static/assets/images/favicon.ico' alt='Logo' className='w-6 h-6' />
        </Link>
      </div>

      <nav className="flex flex-col items-center space-y-6 relative">
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.key} item={menuItem} />
        ))}
      </nav>

      {activeSubmenu && renderSubmenu(activeSubmenu)}
    </div>
  );
};

export default Sidebar;