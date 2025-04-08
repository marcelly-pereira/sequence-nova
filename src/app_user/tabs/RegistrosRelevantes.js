import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const RegistroRelevantes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const departmentOptions = [
    { value: 'fiscal', label: 'Departamento Fiscal', color: 'bg-blue-300' },
    { value: 'pessoal', label: 'Departamento Pessoal', color: 'bg-pink-600' },
    { value: 'legal', label: 'Departamento Legal', color: 'bg-green-400' },
    { value: 'contabil', label: 'Departamento Contábil', color: 'bg-fuchsia-600' },
    { value: 'sucesso', label: 'Departamento Sucesso', color: 'bg-gray-900' },
    { value: 'financeiro', label: 'Departamento Finaceiro', color: 'bg-purple-500' },
    { value: 'marketing', label: 'Departamento Marketing', color: 'bg-yellow-500' },
    { value: 'vendas', label: 'Departamento Vendas', color: 'bg-orange-500' },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleDepartmentSelect = (deptValue) => {
    setSelectedDepartments(prev => {
      if (prev.includes(deptValue)) {
        return prev.filter(item => item !== deptValue);
      } else {
        return [...prev, deptValue];
      }
    });
  };

  const clearFilters = () => {
    setSelectedDepartments([]);
  };

  const filteredDepartmentOptions = departmentOptions.filter(dept => 
    dept.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const registros = [
    {
      id: 1,
      empresa: 'ODOS ACELERADORA LTDA',
      departamento: 'Marketing',
      responsavel: 'João Silva',
      canal: 'Telefone',
      registro: 'Reunião sobre campanha de marketing digital.',
    },
    {
      id: 2,
      empresa: 'ODOS ACELERADORA LTDA',
      departamento: 'Financeiro',
      responsavel: 'Maria Santos',
      canal: 'E-mail',
      registro: 'Envio de relatório financeiro trimestral.',
    },
    {
      id: 3,
      empresa: 'ODOS ACELERADORA LTDA',
      departamento: 'Vendas',
      responsavel: 'Carlos Oliveira',
      canal: 'WhatsApp',
      registro: 'Negociação de contrato com novo cliente.',
    },
  ];

  const filteredRegistros = registros.filter(registro => {
    const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(
      departmentOptions.find(d => d.label.includes(registro.departamento))?.value
    );
    
    const matchesSearch = !searchTerm || 
      registro.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registro.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registro.registro.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registro.departamento.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md font-medium text-gray-800">
            Departamento
          </h2>

          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400 stroke-1" />
              </div>
              <input
                type="text"
                className="block text-sm w-64 px-4 py-1 border border-gray-300 
                rounded-full focus:outline-none focus:ring-1 
                focus:ring-blue-500/25 focus:border-blue-700 transition-colors"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div
              className="ml-3 text-gray-300 cursor-pointer hover:text-blue-700 transition-colors"
              onClick={toggleFilter}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredRegistros.length > 0 ? (
            filteredRegistros.map((registro) => (
              <div
                key={registro.id}
                className="mb-6 bg-white rounded-lg shadow-sm"
              >
                <div className="flex p-4">
                  <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-medium text-gray-900">
                      {registro.empresa}
                    </h3>

                    <div className="flex text-sm text-gray-600 mt-1">
                      <span className="mr-6">
                        Departamento: {registro.departamento}
                      </span>
                      <span className="mr-6">
                        Responsável: {registro.responsavel}
                      </span>
                      <span className="flex items-center">
                        Canal: {registro.canal}
                        <svg
                          className="w-4 h-4 ml-1 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pl-16 flex items-start">
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="text-sm text-gray-500 italic">
                    {registro.registro}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              <p className="mt-4 text-gray-500">Nenhum registro encontrado</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="fixed top-20 right-[1.5rem] w-80 bg-white shadow-lg z-50 overflow-y-auto rounded-lg max-h-[500px]"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-md font-medium">Filtrar cards</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleFilter}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {filteredDepartmentOptions.map((dept) => (
                  <button
                    key={dept.value}
                    className={`flex items-center space-x-2 w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors ${
                      selectedDepartments.includes(dept.value) ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleDepartmentSelect(dept.value)}
                  >
                    <div className={`w-4 h-4 rounded-full ${dept.color}`}></div>
                    <span className="text-gray-700 text-sm flex-1">{dept.label}</span>
                    {selectedDepartments.includes(dept.value) && (
                      <div className="flex-shrink-0">
                        <div className="h-5 w-5 rounded-full flex items-center justify-center">
                          <svg className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
                
                {filteredDepartmentOptions.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <p>Nenhum departamento encontrado</p>
                  </div>
                )}
              </div>

              {selectedDepartments.length > 0 && (
                <button
                  className="w-full mt-8 py-1 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  onClick={clearFilters}
                >
                  Limpar filtro
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isFilterOpen && (
        <motion.div
          className="fixed inset-0 bg-transparent z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleFilter}
        />
      )}
    </div>
  );
};

export default RegistroRelevantes;