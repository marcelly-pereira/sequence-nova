import React, { useState } from 'react';
import BaseLayout from '../app/BaseLayout';
import Input from '../app/components/Input';

const User = () => {
    const [userData, setUserData] = useState({
        nome: 'Marcelly Pereira',
        email: 'marcelly@odoscontabilidade.com.br',
        nivel: 'Estagiário',
        setor: 'Controladoria',
        telefone: '+55 98 8559-633',
        imagem: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setUserData({
            ...userData,
            imagem: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados salvos:', userData);
    };

    return (
        <BaseLayout>
            <div className="flex justify-between items-center mb-6">
                <h4 className='text-[1.10rem]'>Minha Conta</h4>
                <div className="text-sm">
                    <span className="text-gray-600">Sequence</span>
                    <span className="mx-2 text-gray-500">&gt;</span>
                    <span className="text-gray-600">Minha Conta</span>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow mb-6 p-6">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                        <img src="/api/placeholder/48/48" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Marcelly Pereira</h2>
                        <p className="text-sm text-gray-600">Estagiário - Controladoria</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Dados Pessoais e profissionais</h3>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="nivel" className="block font-medium text-gray-700 mb-1">
                                Nome Completo:
                            </label>
                            <Input
                                id="nome"
                                name="nome"
                                value={userData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="nivel" className="block font-medium text-gray-700 mb-1">
                                E-mail Corporativo
                            </label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-3">
                            <label htmlFor="nivel" className="block font-medium text-gray-700 mb-1">
                                Nível Hierárquico:
                            </label>
                            <div className="relative">
                                <select
                                    id="nivel"
                                    name="nivel"
                                    value={userData.nivel}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none pr-10
                                             focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                                             transition-colors"
                                >
                                    <option value="Estagiário">Estagiário</option>
                                    <option value="Assistente">Assistente</option>
                                    <option value="Analista">Analista</option>
                                    <option value="Gerente">Gerente</option>
                                    <option value="Diretor">Diretor</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="setor" className="block font-medium text-gray-700 mb-1">
                                Setor:
                            </label>
                            <div className="relative">
                                <select
                                    id="setor"
                                    name="setor"
                                    value={userData.setor}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none pr-10
                                             focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                                             transition-colors"
                                >
                                    <option value="Controladoria">Controladoria</option>
                                    <option value="Contabilidade">Marketing</option>
                                    <option value="Financeiro">Desenvolvimento</option>
                                    <option value="RH">Deploy e Testes</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Input
                            id="telefone"
                            name="telefone"
                            label="Telefone de Contato"
                            value={userData.telefone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="imagem" className="block font-medium text-gray-700 mb-1">
                            Imagem de Perfil:
                        </label>
                        <div className="flex">
                            <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-l-md border border-r-0 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
                                Escolher Arquivo
                                <input
                                    type="file"
                                    id="imagem"
                                    name="imagem"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            <span className="px-4 py-2 bg-white border border-gray-300 rounded-r-md flex-grow">
                                {userData.imagem ? userData.imagem.name : "Nenhum arquivo escolhido"}
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    );
};

export default User;