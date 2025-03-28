import React, { useState, useRef, useEffect } from 'react';
import UserMenu from './UserMenu';

const Header = () => {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);

    const alternarMenu = () => {
        setMenuAberto(!menuAberto);
    };

    useEffect(() => {
        function handleClickFora(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        }

        document.addEventListener('mousedown', handleClickFora);
        
        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, []);

    return (
        <div className="bg-white px-4 shadow-sm">
            <div className="flex justify-end">
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

                    {menuAberto && (
                        <UserMenu 
                            onItemClick={() => setMenuAberto(false)} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;