import React, { useState, useEffect } from 'react';
import Table from '../../../../app/components/Table';
import Button from '../../../../app/components/Button';
import DepartamentoForm from '../../../../forms/Department/FormDepartment';
import ExcluirDepartamentoForm from '../../../../forms/Department/FormDeleteDepartment';
import { departmentService } from '../../../../services/department';

const Department = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [currentDepartamento, setCurrentDepartamento] = useState(null);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        setLoading(true);

        const responseData = await departmentService.listarDepartamentos();

        const dadosMapeados = responseData.map((item) => ({
          id: item.id,
          nome: item.nome,
          emails: '-',
          gestores:
            item.gestores && item.gestores.length > 0
              ? 'tem gestores'
              : 'sem gestores',
          solicitacoes: '-',
          responderPara: '-',
          obrigacoes: '-',
        }));

        setDepartamentos(dadosMapeados);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar departamentos:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDepartamentos();
  }, []);

  const colunas = [
    { campo: 'id', titulo: 'ID' },
    { campo: 'nome', titulo: 'NOME' },
    { campo: 'emails', titulo: 'EMAILS' },
    { campo: 'gestores', titulo: 'GESTORES' },
    { campo: 'solicitacoes', titulo: 'SOLICITAÇÕES', tipo: 'status' },
    { campo: 'responderPara', titulo: 'RESPONDER PARA' },
    { campo: 'obrigacoes', titulo: 'OBRIGAÇÕES' },
    { campo: 'acoes', titulo: 'AÇÕES', tipo: 'acoes', align: 'center' },
  ];

  const handleOpenCadastro = () => {
    setCurrentDepartamento(null);
    setIsFormOpen(true);
  };

  const handleOpenEdicao = (item) => {
    setCurrentDepartamento(item);
    setIsFormOpen(true);
  };

  const handleOpenExclusao = (item) => {
    setCurrentDepartamento(item);
    setIsDeleteFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentDepartamento(null);
  };

  const handleCloseDeleteForm = () => {
    setIsDeleteFormOpen(false);
    setCurrentDepartamento(null);
  };

  const handleFormSubmit = (departamentoSalvo) => {
    fetchDepartamentos();
  };

  const handleConfirmDelete = async (departamentoId) => {
    try {
      await departmentService.excluirDepartamento(departamentoId);

      fetchDepartamentos();
      setIsDeleteFormOpen(false);
    } catch (error) {
      console.error('Erro ao excluir departamento:', error);
    }
  };

  const fetchDepartamentos = async () => {
    try {
      setLoading(true);
      const responseData = await departmentService.listarDepartamentos();

      const dadosMapeados = responseData.map((item) => ({
        id: item.id,
        nome: item.nome,
        emails: '-',
        gestores:
          item.gestores && item.gestores.length > 0
            ? 'tem gestores'
            : 'sem gestores',
        solicitacoes: '-',
        responderPara: '-',
        obrigacoes: '-',
      }));

      setDepartamentos(dadosMapeados);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar departamentos:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAcaoClick = (item) => {
    console.log('Ação clicada para o item:', item);
  };

  const renderizarStatus = (status) => {
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
        {status || '-'}
      </span>
    );
  };

  const handleRowClick = (item) => {
    console.log('Linha clicada:', item);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>Erro ao carregar departamentos: {error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 p-4">
      <div className="flex justify-end items-center mb-4">
        <Button
          className="text-sm py-[0.45rem] px-2 shadow-sm"
          type="button"
          variant="primary"
          onClick={handleOpenCadastro}
          icon={
            <svg
              className="w-4 h-4 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
            >
              <g mask="url(#mask0_21_345)">
                <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
              </g>
            </svg>
          }
        >
          Cadastrar
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {departamentos.length > 0 ? (
          <Table
            colunas={colunas}
            dados={departamentos}
            onAcaoClick={handleAcaoClick}
            renderizarStatus={renderizarStatus}
            onRowClick={handleRowClick}
            renderizarConteudo={(coluna, item) => {
              if (coluna.campo === 'solicitacoes') {
                return item[coluna.campo] || '—';
              }

              if (coluna.campo === 'emails') {
                return String(item.emails) === 'true' || item.emails === true
                  ? 'True'
                  : 'False';
              }

              if (coluna.campo === 'acoes') {
                return (
                  <div className="flex items-center justify-center">
                    <button
                      className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdicao(item);
                      }}
                      title="Editar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenExclusao(item);
                      }}
                      title="Excluir"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                );
              }

              return item[coluna.campo] || '—';
            }}
          />
        ) : (
          <div className="p-8 text-center text-gray-500">
            Nenhum departamento encontrado.
            <button
              onClick={fetchDepartamentos}
              className="ml-2 text-blue-500 hover:underline"
            >
              Recarregar
            </button>
          </div>
        )}
      </div>

      {isFormOpen && (
        <DepartamentoForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          departamento={currentDepartamento}
        />
      )}

      {isDeleteFormOpen && (
        <ExcluirDepartamentoForm
          isOpen={isDeleteFormOpen}
          onClose={handleCloseDeleteForm}
          onConfirm={handleConfirmDelete}
          departamento={currentDepartamento}
        />
      )}
    </div>
  );
};

export default Department;
