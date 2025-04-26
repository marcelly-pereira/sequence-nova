import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Table from '../../../../app/components/Table';
import RegimeTributarioForm from '../../../../forms/FormRegimeTributario';
import ExcluirRegimeForm from '../../../../forms/FormExcluirRegime';
import TaxRegime from '../../../../services/taxRegime';
import { processarRegimes } from '../../../../utils/taxRegime';

const RegimesTributarios = () => {
  const [regimesTributarios, setRegimesTributarios] = useState([]);
  const [obrigacoesMap, setObrigacoesMap] = useState({});
  const [departamentosMap, setDepartamentosMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExcluirFormOpen, setIsExcluirFormOpen] = useState(false);
  const [regimeAtual, setRegimeAtual] = useState(null);
  const [regimeParaExcluir, setRegimeParaExcluir] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const loadMoreTriggerRef = useRef(null);

  const fetchData = useCallback(async (pageNumber, append = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const [obrigacoes, departamentos, regimesData] = await Promise.all([
        TaxRegime.fetchObrigacoes(),
        TaxRegime.fetchDepartamentos(),
        TaxRegime.fetchRegimesTributarios(pageNumber)
      ]);

      const regimesProcessados = processarRegimes(
        regimesData.results, 
        obrigacoes, 
        departamentos
      );
      
      setObrigacoesMap(obrigacoes);
      setDepartamentosMap(departamentos);
      
      setRegimesTributarios(prevRegimes => 
        append 
          ? [...prevRegimes, ...regimesProcessados] 
          : regimesProcessados
      );
      
      setTotalRegistros(regimesData.count || 0);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Não foi possível carregar os regimes tributários. Por favor, tente novamente.');
    } finally {
      setTimeout(() => {
        if (append) {
          setIsLoadingMore(false);
        } else {
          setIsLoading(false);
        }
      }, 300);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting && 
          !isLoading && 
          !isLoadingMore && 
          regimesTributarios.length < totalRegistros
        ) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          fetchData(nextPage, true);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (loadMoreTriggerRef.current) {
        observer.unobserve(loadMoreTriggerRef.current);
      }
    };
  }, [currentPage, isLoading, isLoadingMore, regimesTributarios.length, totalRegistros, fetchData]);

  const colunas = [
    { titulo: 'NOME', campo: 'nome' },
    { titulo: 'OBRIGAÇÕES', campo: 'obrigacoesTags' },
    { titulo: 'DEPARTAMENTOS', campo: 'departamentosTags' },
    { titulo: 'AÇÕES', campo: 'acoes', align: 'right' }
  ];

  const renderizarConteudo = (coluna, item) => {
    if (coluna.campo === 'nome') {
      return item.nome;
    }

    if (coluna.campo === 'obrigacoesTags') {
      return item.obrigacoesTags;
    }

    if (coluna.campo === 'departamentosTags') {
      if (!item.departamentosDetalhes || item.departamentosDetalhes.length === 0) {
        return '—';
      }

      return item.departamentosDetalhes.map(departamento => departamento.nome).join(', ');
    }

    if (coluna.campo === 'acoes') {
      return (
        <div className="flex justify-end space-x-2">
          <motion.button 
            className="p-1 text-gray-500 hover:text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              handleEditarRegime(item);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiEdit2 size={16} />
          </motion.button>
          <motion.button 
            className="p-1 text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleAbrirExcluirForm(item);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiTrash2 size={16} />
          </motion.button>
        </div>
      );
    }

    return item[coluna.campo] || '—';
  };

  const handleAbrirFormulario = () => {
    setRegimeAtual(null);
    setIsFormOpen(true);
  };

  const handleFecharFormulario = () => {
    setIsFormOpen(false);
    setRegimeAtual(null);
  };

  const handleEditarRegime = (regime) => {
    setRegimeAtual(regime);
    setIsFormOpen(true);
  };

  const handleAbrirExcluirForm = (regime) => {
    setRegimeParaExcluir(regime);
    setIsExcluirFormOpen(true);
  };

  const handleFecharExcluirForm = () => {
    setIsExcluirFormOpen(false);
    setRegimeParaExcluir(null);
  };

  const handleExcluirRegime = async (regimeId) => {
    try {
      await TaxRegime.excluirRegimeTributario(regimeId);
      handleFecharExcluirForm();
      setCurrentPage(1);
      fetchData(1);
    } catch (error) {
      console.error('Erro ao excluir regime:', error);
      alert('Erro ao excluir regime. Por favor, tente novamente.');
    }
  };

  const handleSalvarRegime = async (regimeData) => {
    try {
      await TaxRegime.salvarRegimeTributario(regimeData);
      handleFecharFormulario();
      setCurrentPage(1);
      fetchData(1);
    } catch (error) {
      console.error('Erro ao salvar regime:', error);
      alert(`Erro ao ${regimeData.id ? 'atualizar' : 'criar'} regime tributário. Por favor, tente novamente.`);
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        className="flex justify-center items-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="py-4 text-center text-red-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {error}
        <div className="mt-4">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => fetchData(currentPage)}
          >
            Tentar novamente
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-4">
      <motion.div 
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-sm text-gray-500">
          {totalRegistros > 0 
            ? `${totalRegistros} regimes tributários encontrados` 
            : 'Nenhum regime tributário cadastrado'}
        </span>
        <motion.button
          className="flex items-center justify-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          onClick={handleAbrirFormulario}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus className="mr-2" />
          Cadastrar
        </motion.button>
      </motion.div>
      <motion.div 
        className="bg-white overflow-hidden rounded-md shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {regimesTributarios.length > 0 ? (
          <div className="max-h-[600px] overflow-y-auto">
            <Table
              colunas={colunas}
              dados={regimesTributarios}
              renderizarConteudo={renderizarConteudo}
            />
            
            {regimesTributarios.length < totalRegistros && (
              <div 
                ref={loadMoreTriggerRef} 
                className="h-20 flex items-center justify-center"
              >
                {isLoadingMore && (
                  <motion.div 
                    className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <motion.div 
            className="py-8 text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm">Nenhum regime tributário encontrado</p>
            <p className="text-xs mt-1">Clique no botão + para adicionar</p>
          </motion.div>
        )}
      </motion.div>
      
        {isFormOpen && (
          <RegimeTributarioForm 
            isOpen={isFormOpen}
            onClose={handleFecharFormulario}
            onSubmit={handleSalvarRegime}
            regimeAtual={regimeAtual}
          />
        )}
        {isExcluirFormOpen && (
          <ExcluirRegimeForm
            isOpen={isExcluirFormOpen}
            onClose={handleFecharExcluirForm}
            onConfirm={handleExcluirRegime}
            regime={regimeParaExcluir}
          />
        )}
    </div>
  );
};

export default RegimesTributarios;