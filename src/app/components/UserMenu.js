import React from 'react';
import { FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

const MenuUsuario = ({ onItemClick }) => {
    const handleMinhaConta = () => {
        onItemClick();
    };

    const handleConfiguracao = () => {
        onItemClick();
    };

    const handleSair = () => {
        onItemClick();
    };

    return (
        <div className="absolute right-[-1.95rem] mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <div className="py-1">
                <button
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={handleMinhaConta}
                >
                    <FaUser size={16} className="mr-2" />
                    Minha Conta
                </button>

                <button
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={handleConfiguracao}
                >
                    <FiSettings size={16} className="mr-2" />
                    Configurações
                </button>

                <button
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={handleSair}
                >
                    <FiLogOut size={16} className="mr-2" />
                    Sair
                </button>
            </div>
        </div>
    );
};

export default MenuUsuario;