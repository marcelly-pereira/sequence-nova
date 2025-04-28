import React, { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../../app/BaseLayout';
import Button from '../../../app/components/Button';
import Table from '../../../app/components/Table';
import Pagination from '../../../app/components/Pagination';
import FormRegisterClient from '../../../forms/FormRegisterClient';
import empresasService from '../../../services/companies';

const ActiveClients = () => {
  const navigate = useNavigate();
  
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const itensPorPagina = 10;

  useEffect(() => {
    fetchEmpresas();
  }, []);

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

  const fetchEmpresas = async () => {
    setLoading(true);
    try {
      const empresasFormatadas = await empresasService.listarEmpresas();
      setEmpresas(empresasFormatadas);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      onClick: (empresa) => handleProntuarioClick(empresa)
    },
    { titulo: 'AÇÕES', tipo: 'acao', centralizado: true },
  ];

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
    setPaginaAtual(1);
  };

  const empresasFiltradas = filtro 
    ? empresas.filter(empresa => 
        empresa.nomeFantasia.toLowerCase().includes(filtro.toLowerCase()) ||
        empresa.cnpj.includes(filtro)
      )
    : empresas;

  const totalPages = Math.ceil(empresasFiltradas.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const empresasPaginadas = empresasFiltradas.slice(indiceInicial, indiceFinal);

  const handlePageChange = (page) => {
    setPaginaAtual(page);
  };

  const handleAcaoClick = (empresa) => {
    console.log('Ação clicada para empresa:', empresa);
  };

  const handleProntuarioClick = (empresa) => {
    navigate(`/record?id=${empresa.id}`);
  };

  const handleOpenCadastroModal = () => {
    setFormModalOpen(true);
  };

  const handleCloseCadastroModal = () => {
    setFormModalOpen(false);
  };

  const handleSaveCliente = async (formData) => {
    try {
      const novoCliente = await empresasService.cadastrarEmpresa(formData);
      setEmpresas([...empresas, novoCliente]);
      setFormModalOpen(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
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

        <div className="bg-white rounded-2xl shadow-sm border-gray-200 p-3 sm:p-6">
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
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Erro: {error}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <Table 
                  colunas={colunas}
                  dados={empresasPaginadas}
                  onAcaoClick={handleAcaoClick}
                  renderizarStatus={renderizarStatus}
                  renderizarProntuario={renderizarProntuario}
                />
              </div>

              {empresasFiltradas.length > 0 && (
                <Pagination 
                  currentPage={paginaAtual} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange}
                  showPageNumbers={true}
                  maxPageNumbers={5}
                />
              )}
            </>
          )}
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

export default ActiveClients;