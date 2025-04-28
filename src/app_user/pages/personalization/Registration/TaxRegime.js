import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from '../../../../app/components/Button';
import Table from '../../../../app/components/Table';
import RegimeTributarioForm from '../../../../forms/TaxRegime/FormTaxRegime';
import ExcluirRegimeForm from '../../../../forms/TaxRegime/FormDeleteTaxRegime';
import TaxRegimeService from '../../../../services/taxRegime';
import { processarRegimes } from '../../../../utils/taxRegime';

const TaxRegime = () => {
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
        TaxRegimeService.fetchObrigacoes(),
        TaxRegimeService.fetchDepartamentos(),
        TaxRegimeService.fetchRegimesTributarios(pageNumber),
      ]);

      const regimesProcessados = processarRegimes(
        regimesData.results,
        obrigacoes,
        departamentos,
      );

      setObrigacoesMap(obrigacoes);
      setDepartamentosMap(departamentos);

      setRegimesTributarios((prevRegimes) =>
        append ? [...prevRegimes, ...regimesProcessados] : regimesProcessados,
      );

      setTotalRegistros(regimesData.count || 0);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError(
        'Não foi possível carregar os regimes tributários. Por favor, tente novamente.',
      );
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
      { threshold: 1.0 },
    );

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (loadMoreTriggerRef.current) {
        observer.unobserve(loadMoreTriggerRef.current);
      }
    };
  }, [
    currentPage,
    isLoading,
    isLoadingMore,
    regimesTributarios.length,
    totalRegistros,
    fetchData,
  ]);

  const colunas = [
    { titulo: 'NOME', campo: 'nome' },
    { titulo: 'OBRIGAÇÕES', campo: 'obrigacoesTags' },
    { titulo: 'DEPARTAMENTOS', campo: 'departamentosTags' },
    { titulo: 'AÇÕES', campo: 'acoes', align: 'right' },
  ];

  const renderizarConteudo = (coluna, item) => {
    if (coluna.campo === 'nome') {
      return item.nome;
    }

    if (coluna.campo === 'obrigacoesTags') {
      if (item.obrigacoesDetalhes && Array.isArray(item.obrigacoesDetalhes)) {
        return (
          <div className="flex flex-wrap gap-1">
            {item.obrigacoesDetalhes.map((obrigacao, index) => (
              <span
                key={obrigacao.id || index}
                className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800"
              >
                {obrigacao.nome}
              </span>
            ))}
          </div>
        );
      }

      if (
        item.obrigacoes &&
        Array.isArray(item.obrigacoes) &&
        Object.keys(obrigacoesMap).length > 0
      ) {
        const obrigacoesComNomes = item.obrigacoes
          .map((id) => obrigacoesMap[id])
          .filter(Boolean);

        return (
          <div className="flex flex-wrap gap-1">
            {obrigacoesComNomes.map((obrigacao, index) => (
              <span
                key={obrigacao.id || index}
                className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800"
              >
                {obrigacao.nome}
              </span>
            ))}
          </div>
        );
      }

      return item.obrigacoesTags || '-';
    }

    if (coluna.campo === 'departamentosTags') {
      if (
        !item.departamentosDetalhes ||
        item.departamentosDetalhes.length === 0
      ) {
        return '—';
      }

      return item.departamentosDetalhes
        .map((departamento) => departamento.nome)
        .join(', ');
    }

    if (coluna.campo === 'acoes') {
      return (
        <div className="flex items-center justify-center">
          <button
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleEditarRegime(item);
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
              handleAbrirExcluirForm(item);
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

    return item[coluna.campo] || '-';
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
      await TaxRegimeService.excluirRegimeTributario(regimeId);
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
      await TaxRegimeService.salvarRegimeTributario(regimeData);
      handleFecharFormulario();
      setCurrentPage(1);
      fetchData(1);
    } catch (error) {
      console.error('Erro ao salvar regime:', error);
      alert(
        `Erro ao ${
          regimeData.id ? 'atualizar' : 'criar'
        } regime tributário. Por favor, tente novamente.`,
      );
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
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
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
        <Button
          variant="primary"
          className="text-sm py-[0.45rem] px-2 shadow-sm"
          onClick={handleAbrirFormulario}
          icon={<FiPlus className="mr-2" />}
        >
          Cadastrar
        </Button>
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
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: 'linear',
                    }}
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

export default TaxRegime;