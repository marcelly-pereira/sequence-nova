import React, { useState } from 'react';
import { FiSearch, FiMoreVertical, FiFileText, FiMenu } from 'react-icons/fi';
import BaseLayout from '../../../app/BaseLayout';
import Button from '../../../app/components/Button';
import { FiPlus } from 'react-icons/fi';

const ClientesAtivos = () => {
  const [empresas, setEmpresas] = useState([
    {
      id: 1,
      cnpj: '49.005.187/0001-05',
      regimeTributario: 'Simples Nacional',
      nomeFantasia: 'JULIANO CONTABILIDADE',
      cidade: 'TERESINA',
      uf: 'PI',
      status: 'inativo',
      prontuario: true,
    },
    {
      id: 2,
      cnpj: '32.220.762/0001-90',
      regimeTributario: 'Simples Nacional',
      nomeFantasia: 'MESQUITA E CRUZ',
      cidade: 'SAO LUIS',
      uf: 'MA',
      status: 'inativo',
      prontuario: true,
    },
    {
      id: 3,
      cnpj: '27.674.629/0001-73',
      regimeTributario: 'Simples Nacional',
      nomeFantasia: 'ABREU CONTABILIDADE',
      cidade: 'SAO LUIS',
      uf: 'MA',
      status: 'inativo',
      prontuario: true,
    },
    {
      id: 4,
      cnpj: '21.823.227/0001-07',
      regimeTributario: 'Simples Nacional',
      nomeFantasia: 'KAROL DIGITAL BOUTIQUE',
      cidade: 'ARAGUAINA',
      uf: 'TO',
      status: 'ativo',
      prontuario: true,
    },
  ]);

  const [filtro, setFiltro] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <BaseLayout>
      <div className="min-h-screen">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="mb-6">
            <Button
              variant="primary"
              className="py-2 px-4 font-medium shadow-sm"
              icon={<FiPlus size={18} />}
            >
              Cadastrar
            </Button>
          </div>

          <button
            className="ml-auto sm:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FiMenu size={24} />
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <div className="flex sm:mr-4 items-center">
              <input
                type="text"
                placeholder="Procurar empresa"
                className="border border-gray-300 rounded-md pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filtro}
                onChange={handleFiltroChange}
              />
              <button className="ml-2 text-gray-500">
                <FiSearch size={18} />
              </button>
            </div>
            <span className="text-gray-700 whitespace-nowrap text-sm sm:text-base">
              {empresas.length} empresas cadastradas
            </span>
          </div>
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-medium text-gray-500 tracking-wider">
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border-b">ID</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border-b">CNPJ</th>
                  <th className="hidden sm:table-cell px-4 py-3 border-b">
                    REGIME
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border-b">NOME</th>
                  <th className="hidden md:table-cell px-4 py-3 border-b">
                    CIDADE
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border-b">UF</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border-b">STATUS</th>
                  <th className="hidden sm:table-cell px-4 py-3 border-b">
                    PRONT.
                  </th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border-b">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {empresas.map((empresa) => (
                  <tr key={empresa.id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                      {empresa.id}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                      {empresa.cnpj}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 text-sm text-gray-700">
                      {empresa.regimeTributario}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                      {empresa.nomeFantasia || '—'}
                    </td>
                    <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-700">
                      {empresa.cidade}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                      {empresa.uf}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm">
                      <span
                        className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                          empresa.status === 'ativo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {empresa.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-4 text-center">
                      {empresa.prontuario && (
                        <div className="flex justify-center">
                          <FiFileText size={18} className="text-gray-600" />
                        </div>
                      )}
                    </td>
                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-center">
                      <div className="flex justify-around">
                        <button className="text-gray-600 hover:text-gray-900">
                          <FiFileText size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 ml-2">
                          <FiMoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-start">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-sm">
              1
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ClientesAtivos;
