import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Table from '../../../../app/components/Table';
import ObrigacaoService from '../../../../services/obligations';

const ObrigacoesResponsavel = () => {
  const [obrigacoes, setObrigacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const listContainerRef = useRef(null);

  const fetchData = useCallback(async (pageNumber, append = false) => {
    try {
      setIsLoading(true);
      
      const response = await ObrigacaoService.fetchObrigacoesResponsavel(pageNumber);
      
      const obrigacoesProcessadas = response.results.map(item => ({
        id: item.id,
        obrigacao_id: item.obrigacao,
        obrigacao_nome: item.obrigacao_nome,
        nome_departamento: item.nome_departamento,
        responsavel_nome: item.responsavel_nome,
        passivelMulta: verificarPassivelMulta(item.prazo_legal, item.prazo_tec),
        prazo_legal: formatarData(item.prazo_legal),
        prazo_tec: formatarData(item.prazo_tec),
        status: item.status,
        atrasada: item.atrasada,
        competencia: formatarData(item.competencia)
      }));
      
      setObrigacoes(prevObrigacoes => 
        append 
          ? [...prevObrigacoes, ...obrigacoesProcessadas] 
          : obrigacoesProcessadas
      );
      
      setTotalRegistros(response.count || 0);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Não foi possível carregar as obrigações. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      if (!listContainerRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = listContainerRef.current;
      
      if (scrollHeight - scrollTop - clientHeight < 200 && 
          obrigacoes.length < totalRegistros && 
          !isLoading) {
        
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchData(nextPage, true);
      }
    };

    const containerRef = listContainerRef.current;
    if (containerRef) {
      containerRef.addEventListener('scroll', handleScroll);
      return () => containerRef.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage, obrigacoes.length, totalRegistros, isLoading, fetchData]);

  const formatarData = (dataString) => {
    if (!dataString) return '—';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const verificarPassivelMulta = (prazoLegal, prazoTec) => {
    if (!prazoLegal || !prazoTec) return false;
    
    const dataLegal = new Date(prazoLegal);
    const dataTec = new Date(prazoTec);
    
    const diffTime = Math.abs(dataLegal - dataTec);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 2;
  };

  const handleEditarObrigacao = (obrigacao) => {
    console.log('Editar obrigação:', obrigacao);
    alert(`Editando obrigação: ${obrigacao.obrigacao_nome}`);
  };

  const handleExcluirObrigacao = (obrigacao) => {
    console.log('Excluir obrigação:', obrigacao);
    const confirmar = window.confirm(`Deseja realmente excluir a obrigação "${obrigacao.obrigacao_nome}"?`);
    if (confirmar) {
      alert(`Obrigação excluída com sucesso: ${obrigacao.obrigacao_nome}`);
    }
  };

  const handleCadastrarObrigacao = () => {
    alert('Abrindo formulário para cadastrar nova obrigação');
  };

  const colunas = [
    { titulo: 'ID', campo: 'obrigacao_id', width: '80px', align: 'center' },
    { titulo: 'NOME', campo: 'obrigacao_nome' },
    { titulo: 'DEPARTAMENTO', campo: 'nome_departamento' },
    { titulo: 'RESPONSÁVEL', campo: 'responsavel_nome' },
    { titulo: 'PASSÍVEL DE MULTA?', campo: 'passivelMulta', align: 'center' },
    { titulo: 'AÇÕES', campo: 'acoes', align: 'center', width: '100px' }
  ];

  const renderizarConteudo = (coluna, item) => {
    if (coluna.campo === 'passivelMulta') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${item.passivelMulta ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {item.passivelMulta ? 'Sim' : 'Não'}
        </span>
      );
    }

    if (coluna.campo === 'acoes') {
      return (
        <div className="flex justify-center space-x-2">
          <motion.button 
            className="p-1 text-gray-500 hover:text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              handleEditarObrigacao(item);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Editar"
          >
            <FiEdit2 size={16} />
          </motion.button>
          <motion.button 
            className="p-1 text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleExcluirObrigacao(item);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Excluir"
          >
            <FiTrash2 size={16} />
          </motion.button>
        </div>
      );
    }

    return item[coluna.campo] || '—';
  };

  if (isLoading && obrigacoes.length === 0) {
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

  if (error && obrigacoes.length === 0) {
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
            ? `Total: ${totalRegistros} obrigações`
            : 'Nenhuma obrigação cadastrada'}
        </span>
        <motion.button
          className="flex items-center justify-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          onClick={handleCadastrarObrigacao}
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
        {obrigacoes.length > 0 ? (
          <div 
            ref={listContainerRef}
            className="max-h-[600px] overflow-y-auto"
          >
            <Table
              colunas={colunas}
              dados={obrigacoes}
              renderizarConteudo={renderizarConteudo}
            />
            
            {isLoading && (
              <div className="flex justify-center py-4">
                <motion.div 
                  className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
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
            <p className="text-sm">Nenhuma obrigação encontrada</p>
            <p className="text-xs mt-1">Clique no botão + para adicionar</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ObrigacoesResponsavel;