import React from 'react';
import BaseLayout from '../../../app/BaseLayout';
import { FiSearch } from 'react-icons/fi';
import TemplateCard, { GridIcon, DocumentIcon } from '../../../app/components/TemplateCard';

const TemplatesSequencia = () => {
    const handleSearch = (e) => {
        console.log('Pesquisando:', e.target.value);
    };

    const handleCreateTemplate = () => {
        console.log('Criar novo template');
    };

    const handleUseTemplate = (templateName) => {
        console.log(`Usar template: ${templateName}`);
    };

    return (
        <BaseLayout>
            <div className="p-3 bg-white rounded-lg shadow-sm border-gray-200 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                        <div className="flex sm:mr-4 items-center">
                            <input
                                type="text"
                                placeholder="Procurar empresa"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                    focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                                    transition-colors"
                            />
                            <button className="ml-2 text-gray-500">
                                <FiSearch size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 mb-6 md:mb-0">
                            <div className="bg-white rounded-lg border p-2 w-full">
                                <h2 className="font-bold text-[0.85rem] text-gray-800 mb-4">Departamento</h2>
                                <ul>
                                    <li className="py-3 border-b flex justify-between items-center">
                                        <span className="text-gray-700">Controladoria</span>
                                        <span className="text-gray-500 text-sm">1</span>
                                    </li>
                                    <li className="py-3 border-b flex justify-between items-center">
                                        <span className="text-gray-700">Marketing</span>
                                        <span className="text-gray-500 text-sm">1</span>
                                    </li>
                                    <li className="py-3 border-b flex justify-between items-center">
                                        <span className="text-gray-700">Desenvolvimento</span>
                                        <span className="text-gray-500 text-sm">0</span>
                                    </li>
                                    <li className="py-3 border-b flex justify-between items-center">
                                        <span className="text-gray-700">Deploy e Testes</span>
                                        <span className="text-gray-500 text-sm">0</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <TemplateCard
                                    title="Criar do zero"
                                    icon={<GridIcon />}
                                    isCreateTemplate={true}
                                    onClick={handleCreateTemplate}
                                />

                                <TemplateCard
                                    title="Solicitações de Suporte"
                                    icon={<DocumentIcon />}
                                    department="Controladoria"
                                    onClick={() => handleUseTemplate('Solicitações de Suporte')}
                                />

                                <TemplateCard
                                    title="Demandas Marketing"
                                    icon={<DocumentIcon />}
                                    department="Marketing"
                                    onClick={() => handleUseTemplate('Demandas Marketing')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default TemplatesSequencia;