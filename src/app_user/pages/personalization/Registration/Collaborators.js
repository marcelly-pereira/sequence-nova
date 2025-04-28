import React, { useState, useEffect, useRef, useCallback } from 'react';
import Table from '../../../../app/components/Table';
import { FiPlus } from 'react-icons/fi';
import colaboradoresService from '../../../../services/collaborators';
import Button from '../../../../app/components/Button'; 
import ColaboradorForm from '../../../../forms/Collaborators/FormColaborador';
import ExcluirColaboradorForm from '../../../../forms/Collaborators/FormDeleteColaborador';

const Collaborators = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [departamentos, setDepartamentos] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const loadMoreTriggerRef = useRef(null);
  
  // Estados para controle dos modais de formulário
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [currentColaborador, setCurrentColaborador] = useState(null);

  const fetchColaboradores = useCallback(async (page = 1, isLoadingMore = false) => {
    if (isLoadingMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    
    try {
      const data = await colaboradoresService.fetchColaboradores(page);
      
      if (data.results && Array.isArray(data.results)) {
        if (isLoadingMore) {
          setColaboradores(prev => [...prev, ...data.results]);
        } else {
          setColaboradores(data.results);
        }
        
        setHasNextPage(!!data.next);
        setCurrentPage(page);
        setTotalRegistros(data.count || 0);
      } else if (Array.isArray(data)) {
        if (isLoadingMore) {
          setColaboradores(prev => [...prev, ...data]);
        } else {
          setColaboradores(data);
        }
        setHasNextPage(false);
        setCurrentPage(page);
        setTotalRegistros(data.length || 0);
      } else {
        throw new Error('Formato de resposta inválido');
      }
    } catch (err) {
      setError(`Falha ao carregar os colaboradores: ${err.message}`);
    } finally {
      setTimeout(() => {
        if (isLoadingMore) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }, 300);
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await fetchColaboradores();
        
        const depData = await colaboradoresService.fetchDepartamentos();
        setDepartamentos(depData);
      } catch (err) {
        console.error("Erro ao carregar dados iniciais:", err);
        setError("Falha ao carregar dados iniciais. Tente novamente mais tarde.");
      }
    };
    
    loadInitialData();
  }, [fetchColaboradores]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting && 
          !loading && 
          !loadingMore && 
          hasNextPage &&
          colaboradores.length < totalRegistros
        ) {
          const nextPage = currentPage + 1;
          fetchColaboradores(nextPage, true);
        }
      },
      { threshold: 0.5 }
    );
    
    const currentTarget = loadMoreTriggerRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [currentPage, loading, loadingMore, hasNextPage, colaboradores.length, totalRegistros, fetchColaboradores]);

  const handleRetry = () => {
    setError(null);
    fetchColaboradores(1);
  };

  useEffect(() => {
    if (Object.keys(departamentos).length === 0 && colaboradores.length > 0) {
      const depMap = {};
      colaboradores.forEach(item => {
        if (item.departamento && !depMap[item.departamento]) {
          depMap[item.departamento] = {
            id: item.departamento,
            nome: `Departamento ${item.departamento}`
          };
        }
      });
      if (Object.keys(depMap).length > 0) {
        setDepartamentos(depMap);
      }
    }
  }, [colaboradores, departamentos]);

  // Funções para gerenciar os modais de formulário
  const handleOpenCadastro = () => {
    setCurrentColaborador(null);
    setIsFormOpen(true);
  };

  const handleOpenEdicao = (item) => {
    setCurrentColaborador(item);
    setIsFormOpen(true);
  };

  const handleOpenExclusao = (item) => {
    setCurrentColaborador(item);
    setIsDeleteFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentColaborador(null);
  };

  const handleCloseDeleteForm = () => {
    setIsDeleteFormOpen(false);
    setCurrentColaborador(null);
  };

  const handleFormSubmit = (colaboradorSalvo) => {
    // Recarrega a lista após a adição/edição
    setCurrentPage(1);
    fetchColaboradores(1);
  };

  const handleConfirmDelete = async (colaboradorId) => {
    try {
      await colaboradoresService.deleteColaborador(colaboradorId);
      fetchColaboradores(1);
      setIsDeleteFormOpen(false);
    } catch (error) {
      console.error('Erro ao excluir colaborador:', error);
    }
  };

  const handleAcaoClick = (action) => {
    if (action.type === 'edit') {
      handleOpenEdicao(action.item);
    } else if (action.type === 'delete') {
      handleOpenExclusao(action.item);
    }
  };

  const handleRowClick = (item) => {
    console.log("Linha clicada:", item);
  };

  const renderizarConteudo = (coluna, item) => {
    if (!item || typeof item !== 'object') {
      return '—';
    }

    if (coluna.campo === 'acoes') {
      return (
        <div className="flex items-center justify-center">
          <button
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleAcaoClick({ type: 'edit', item });
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
              handleAcaoClick({ type: 'delete', item });
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
    
    if (coluna.campo === 'departamento') {
      const dep = departamentos[item.departamento];
      return dep ? dep.nome : (item.departamento || '-');
    }
    
    if (coluna.campo === 'telefone' || coluna.campo === 'departamento') {
      return item[coluna.campo] || '-';
    }
    
    return item[coluna.campo];
  };

  const colunas = [
    { campo: 'id', titulo: 'ID', align: 'left' },
    { campo: 'nome', titulo: 'NOME', align: 'left' },
    { campo: 'email', titulo: 'EMAIL', align: 'left' },
    { campo: 'nivel', titulo: 'NÍVEL', align: 'left' },
    { campo: 'departamento', titulo: 'DEPARTAMENTO', align: 'left' },
    { campo: 'telefone', titulo: 'TELEFONE', align: 'left' },
    { campo: 'acoes', titulo: 'AÇÕES', align: 'center', tipo: 'acoes' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>Erro: {error}</p>
        <button 
          className="mt-2 bg-red-200 hover:bg-red-300 text-red-800 py-1 px-3 rounded"
          onClick={handleRetry}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {totalRegistros > 0 
            ? `${totalRegistros} colaboradores encontrados` 
            : 'Nenhum colaborador cadastrado'}
        </span>
        
        <Button 
          variant="primary"
          className='text-sm py-[0.45rem] px-2 shadow-sm' 
          onClick={handleOpenCadastro}
          icon={<FiPlus className="mr-2" />}
        >
          Cadastrar
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {Array.isArray(colaboradores) && colaboradores.length > 0 ? (
          <>
            <div className="max-h-[600px] overflow-y-auto">
              <Table
                colunas={colunas}
                dados={colaboradores}
                onAcaoClick={handleAcaoClick}
                renderizarConteudo={renderizarConteudo}
                onRowClick={handleRowClick}
              />
              
              {hasNextPage && (
                <div 
                  ref={loadMoreTriggerRef} 
                  className="w-full"
                >
                  {loadingMore && (
                    <div className="flex justify-center items-center h-20">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center py-4">Nenhum colaborador encontrado.</p>
        )}
      </div>
      
      {isFormOpen && (
        <ColaboradorForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          colaborador={currentColaborador}
        />
      )}

      {isDeleteFormOpen && (
        <ExcluirColaboradorForm
          isOpen={isDeleteFormOpen}
          onClose={handleCloseDeleteForm}
          onConfirm={handleConfirmDelete}
          colaborador={currentColaborador}
        />
      )}
    </div>
  );
};

export default Collaborators;