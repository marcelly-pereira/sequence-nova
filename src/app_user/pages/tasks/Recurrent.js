import React from 'react';
import BaseLayout from '../../../app/BaseLayout';
import { FiSearch, FiList, FiFilter } from 'react-icons/fi';

const Recorrentes = () => {
    return (
        <BaseLayout title="Tarefas Recorrentes">
            <div className="bg-white rounded-2xl shadow-sm border-gray-200 min-h-screen">
                <div className="flex justify-between items-center p-3">
                    <div className="flex items-center flex-grow">
                        <input
                            type="text"
                            placeholder="Procurar..."
                            className="text-sm px-4 py-2 border border-gray-300 rounded-md 
                                    focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                                    transition-colors"
                        />
                        <div className="ml-2 p-2 text-gray-400">
                            <FiSearch size={16} />
                        </div>
                    </div>
                    <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm mr-2 text-gray-400">
                        <FiList size={16} className="mr-2 text-gray-400" />
                        <span>Listas</span>
                    </button>

                    <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm ml-2 text-gray-400">
                        <FiFilter size={16} className="mr-2 text-gray-400" />
                        <span>Filtrar</span>
                    </button>
                </div>

                <div className="px-4 py-3 text-gray-600 text-sm">
                    Nenhuma obrigação encontrada.
                </div>
            </div>
        </BaseLayout>
    );
};

export default Recorrentes;