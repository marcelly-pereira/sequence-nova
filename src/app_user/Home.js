import React from 'react';
import BaseLayout from '../app/BaseLayout';
import FlipClock from '../app/components/FlipClock';

const Home = () => {
    return (
        <BaseLayout>
            <div className="p-6">
                {/* Cabeçalho */}
                <div className="mb-8 flex flex-wrap md:flex-nowrap items-start gap-6">
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-gray-800">Olá, <br />Marcelly Pereira</h1>
                        <p className="text-sm text-gray-600 mt-1">segunda-feira, 14 de abril de 2025</p>
                        
                        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 w-fit">
                            <div className="flex items-center">
                                <span className="text-gray-500 mr-2">✨</span>
                                <span className="text-gray-600 text-sm">Planeje, execute, avalie, melhore - o ciclo do sucesso!</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-auto mt-4 md:mt-0">
                        <FlipClock />
                    </div>
                </div>

                {/* Pontos de atenção */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Pontos de atenção</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Card Base de Clientes */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Base de Clientes</h3>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">0</span>
                                <div className="flex items-center mt-4">
                                    <div className="w-20 h-2 bg-teal-500 rounded-full"></div>
                                    <span className="ml-2 text-xs text-gray-500">+0 / -0</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Tarefas Pendentes */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Tarefas Pendentes</h3>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">2</span>
                                <div className="mt-4 flex justify-between">
                                    <div className="text-center">
                                        <div className="h-16 w-8 bg-red-500 rounded-sm"></div>
                                        <p className="text-xs mt-1 text-gray-600">2 vencidas</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="h-4 w-8 bg-blue-100 rounded-sm"></div>
                                        <p className="text-xs mt-1 text-gray-600">0 hoje</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="h-8 w-8 bg-yellow-100 rounded-sm"></div>
                                        <p className="text-xs mt-1 text-gray-600">0 a vencer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Prioridades */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Prioridades</h3>
                            <div className="flex flex-col space-y-3">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span className="text-sm text-gray-700">Tarefas que geram multas:</span>
                                    <span className="text-sm font-semibold">0</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span className="text-sm text-gray-700">Tarefas atrasadas:</span>
                                    <span className="text-sm font-semibold">2</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <span className="text-sm text-gray-700">E-mails com falha:</span>
                                    <span className="text-sm font-semibold">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarefas para a semana */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Tarefas para a semana</h2>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        {/* Dias da semana */}
                        <div className="flex mb-4 space-x-4">
                            <div className="flex-1">
                                <div className="bg-blue-600 text-white p-2 rounded-md flex justify-between items-center">
                                    <span>Segunda</span>
                                    <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded">14/Abr</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="bg-blue-900 text-white p-2 rounded-md flex justify-between items-center">
                                    <span>Terça</span>
                                    <span className="text-xs bg-white text-blue-900 px-2 py-1 rounded">15/Abr</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="bg-blue-600 text-white p-2 rounded-md flex justify-between items-center">
                                    <span>Quarta</span>
                                    <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded">16/Abr</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="bg-blue-600 text-white p-2 rounded-md flex justify-between items-center">
                                    <span>Quinta</span>
                                    <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded">17/Abr</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="bg-blue-600 text-white p-2 rounded-md flex justify-between items-center">
                                    <span>Sexta</span>
                                    <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded">18/Abr</span>
                                </div>
                            </div>
                        </div>

                        {/* Grid de tarefas */}
                        <div className="grid grid-cols-5 gap-2">
                            {/* Coluna Segunda */}
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={`seg-${item}`} className="p-3 text-center border border-gray-200 rounded text-gray-400">
                                        Tarefa
                                    </div>
                                ))}
                            </div>
                            
                            {/* Coluna Terça */}
                            <div className="space-y-2">
                                <div className="p-3 text-center border border-gray-200 rounded text-gray-700">
                                    Tela de Recorrências
                                </div>
                                {[2, 3, 4].map((item) => (
                                    <div key={`ter-${item}`} className="p-3 text-center border border-gray-200 rounded text-gray-400">
                                        Tarefa
                                    </div>
                                ))}
                            </div>
                            
                            {/* Coluna Quarta */}
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={`qua-${item}`} className="p-3 text-center border border-gray-200 rounded text-gray-400">
                                        Tarefa
                                    </div>
                                ))}
                            </div>
                            
                            {/* Coluna Quinta */}
                            <div className="space-y-2">
                                <div className="p-3 text-center border border-gray-200 rounded text-gray-700">
                                    Estilizar transição de botões
                                </div>
                                {[2, 3, 4].map((item) => (
                                    <div key={`qui-${item}`} className="p-3 text-center border border-gray-200 rounded text-gray-400">
                                        Tarefa
                                    </div>
                                ))}
                            </div>
                            
                            {/* Coluna Sexta */}
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={`sex-${item}`} className="p-3 text-center border border-gray-200 rounded text-gray-400">
                                        Tarefa
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sequências favoritas */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Sequências favoritas</h2>
                        <div className="flex items-center">
                            <select className="border border-gray-300 rounded-md p-1 text-sm">
                                <option>Todos</option>
                            </select>
                            <button className="ml-2 p-1 border border-gray-300 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="text-gray-700">Controle de Desenvolvimento</span>
                                <span className="ml-2 text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">Não categorizado</span>
                            </div>
                            <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="text-gray-700">Solicitações de Suporte</span>
                                <span className="ml-2 text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">Não categorizado</span>
                            </div>
                            <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Home;