import React from 'react';

const Header = ({
}) => {
    return (
        <div className="bg-white px-4">
            <div className="flex justify-end">
                <div className="text-right">
                    <h1 className="text-sm font-bold text-gray-800">
                        Marcelly Pereira
                    </h1>
                    <p className="text-xs text-gray-600">
                        Estagiário - Controladoria
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;