import React, { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import BaseLayout from '../../../app/BaseLayout';
import Button from '../../../app/components/Button';
import Table from '../../../app/components/Table';
import FormRegisterClient from '../../../app/forms/FormRegisterClient'; 

const ClientesAtivos = () => {
  const navigate = useNavigate(); // Hook para navegação
  
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
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [formModalOpen, setFormModalOpen] = useState(false); 

  useEffect(() => {
    if (formModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [formModalOpen]);

  const colunas = [
    { titulo: 'ID', campo: 'id' },
    { titulo: 'CNPJ', campo: 'cnpj' },
    { titulo: 'REGIME \nTRiBUTÁRIO', campo: 'regimeTributario', apenasDesktop: true },
    { titulo: 'NOME', campo: 'nomeFantasia' },
    { titulo: 'CIDADE', campo: 'cidade', apenasDesktop: true },
    { titulo: 'UF', campo: 'uf' },
    { titulo: 'STATUS', campo: 'status', tipo: 'status' },
    { 
      titulo: 'PRONT.', 
      campo: 'prontuario', 
      tipo: 'prontuario', 
      apenasDesktop: true,
      onClick: (empresa) => handleProntuarioClick(empresa) // Adicionando onClick para prontuário
    },
    { titulo: 'AÇÕES', tipo: 'acao', centralizado: true },
  ];

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const empresasFiltradas = filtro 
    ? empresas.filter(empresa => 
        empresa.nomeFantasia.toLowerCase().includes(filtro.toLowerCase()) ||
        empresa.cnpj.includes(filtro)
      )
    : empresas;

  const handleAcaoClick = (empresa) => {
    console.log('Ação clicada para empresa:', empresa);
  };

  // Função para lidar com cliques no prontuário
  const handleProntuarioClick = (empresa) => {
    console.log('Prontuário clicado para empresa:', empresa);
    // Navegar para a tela de prontuário com o ID da empresa
    navigate(`/record?id=${empresa.id}`);
  };

  const handleOpenCadastroModal = () => {
    setFormModalOpen(true);
  };

  const handleCloseCadastroModal = () => {
    setFormModalOpen(false);
  };

  const handleSaveCliente = (formData) => {
    const novoCliente = {
      id: empresas.length + 1,
      cnpj: formData.cnpj,
      regimeTributario: formData.regimeTributario,
      nomeFantasia: formData.nomeFantasia,
      cidade: formData.cidade,
      uf: formData.uf,
      status: 'ativo', 
      prontuario: false
    };

    setEmpresas([...empresas, novoCliente]);
    
    setFormModalOpen(false);
    
    console.log('Cliente cadastrado com sucesso:', novoCliente);
  };

  const renderizarStatus = (status) => (
    <span
      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
        status === 'ativo'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      {status === 'ativo' ? 'Ativo' : 'Inativo'}
    </span>
  );

  const renderizarProntuario = (temProntuario, empresa) => {
    return (
      <div 
        className={`cursor-pointer flex justify-center`}
        onClick={() => handleProntuarioClick(empresa)}
      >
        <div className={`w-3 h-3 rounded-full ${temProntuario ? 'bg-green-500' : 'bg-gray-300'}`}></div>
      </div>
    );
  };

  return (
    <BaseLayout title="Clientes ativos">
      <div className="min-h-screen">
        <div className="flex items-center">
          <div className="mb-6">
            <Button
              variant="primary"
              className="text-sm py-[0.45rem] px-2 shadow-sm"
              icon={<FiPlus size={18} />}
              onClick={handleOpenCadastroModal}
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

        <div className="bg-white rounded-lg shadow-sm border-gray-200 p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <div className="flex sm:mr-4 items-center">
              <input
                type="text"
                placeholder="Procurar empresa"
                className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                          transition-colors"
                value={filtro}
                onChange={handleFiltroChange}
              />
              <button className="ml-2 text-gray-400">
                <FiSearch size={18} />
              </button>
            </div>
            <span className="text-gray-700 whitespace-nowrap text-sm sm:text-base">
              {empresasFiltradas.length} empresas cadastradas
            </span>
          </div>
          
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <Table 
              colunas={colunas}
              dados={empresasFiltradas}
              onAcaoClick={handleAcaoClick}
              renderizarStatus={renderizarStatus}
              renderizarProntuario={renderizarProntuario}
              paginaAtual={paginaAtual}
              onChangePagina={setPaginaAtual}
            />
          </div>

          <div className="mt-4 flex justify-start">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-sm">
              1
            </button>
          </div>
        </div>
      </div>

      <FormRegisterClient 
        isOpen={formModalOpen}
        onClose={handleCloseCadastroModal}
        onSave={handleSaveCliente}
        primaryColor="#0052cc"
      />
    </BaseLayout>
  );
};

export default ClientesAtivos;