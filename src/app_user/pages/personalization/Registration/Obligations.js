import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Table from '../../../../app/components/Table';
import ObrigacaoService from '../../../../services/obligations';

const Obrigacoes = () => {
  const [obrigacoes, setObrigacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const listContainerRef = useRef(null);

  const fetchData = useCallback(async (pageNumber, append = false) => {
    try {
      setIsLoading(true);
      
      const response = await ObrigacaoService.fetchObrigacoes(pageNumber);
      
      const obrigacoesProcessadas = response.results.map(item => ({
        id: item.id,
        nome: item.nome,
        mininome: item.mininome,
        departamento_id: item.departamento,
        departamento_nome: getDepartamentoNome(item.departamento),
        responsavel_id: item.responsavel,
        responsavel_nome: getResponsavelNome(item.responsavel),
        passivel_multa: item.passivel_multa,
        lembrar_dias_antes: item.lembrar_responsavel_dias_antes,
        tipo_dias_antes: item.tipo_dias_antes,
        ativa: item.ativa
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
  }, [fetchData, currentPage]);

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

  // Funções auxiliares para mapear IDs para nomes
  // Numa aplicação real, você provavelmente teria essa informação disponível
  // através do contexto ou de outra API
  const getDepartamentoNome = (id) => {
    const departamentos = {
      21: 'Fiscal',
      23: 'Consultoria',
      24: 'Financeiro',
      25: 'Contábil',
      26: 'Recursos Humanos',
      27: 'Tributos',
      28: 'Departamento Pessoal',
      30: 'Folha de Pagamento'
    };
    return departamentos[id] || 'Departamento não identificado';
  };

  const getResponsavelNome = (id) => {
    const responsaveis = {
      1: 'Miguel Lucas'
    };
    return responsaveis[id] || 'Responsável não identificado';
  };

  const handleEditarObrigacao = (obrigacao) => {
    console.log('Editar obrigação:', obrigacao);
    alert(`Editando obrigação: ${obrigacao.nome}`);
  };

  const handleExcluirObrigacao = async (obrigacao) => {
    const confirmar = window.confirm(`Deseja realmente excluir a obrigação "${obrigacao.nome}"?`);
    
    if (confirmar) {
      try {
        await ObrigacaoService.excluirObrigacao(obrigacao.id);
        setObrigacoes(obrigacoes.filter(o => o.id !== obrigacao.id));
        alert(`Obrigação excluída com sucesso: ${obrigacao.nome}`);
      } catch (error) {
        alert(`Erro ao excluir obrigação: ${error.message}`);
      }
    }
  };

  const handleCadastrarObrigacao = () => {
    // Dados padrão para nova obrigação
    const novaObrigacao = {
      nome: "",
      mininome: "",
      tempo_previsto_min: null,
      entrega_janeiro: null,
      entrega_fevereiro: null,
      entrega_marco: null,
      entrega_abril: null,
      entrega_maio: null,
      entrega_junho: null,
      entrega_julho: null,
      entrega_agosto: null,
      entrega_setembro: null,
      entrega_outubro: null,
      entrega_novembro: null,
      entrega_dezembro: null,
      lembrar_responsavel_dias_antes: null,
      tipo_dias_antes: null,
      prazos_fixos_dias_nao_uteis: null,
      competencias_referentes: null,
      exigir_robo: false,
      passivel_multa: false,
      alerta_guia_nao_lida: false,
      ativa: false,
      quantidade_arquivos_necessarios: null,
      departamento: null,
      responsavel: null
    };
    
    alert('Abrindo formulário para cadastrar nova obrigação');
    // Aqui você abriria um modal ou redirecionaria para um formulário
  };

  const colunas = [
    { titulo: 'ID', campo: 'id', width: '80px', align: 'center' },
    { titulo: 'NOME', campo: 'nome' },
    { titulo: 'DEPARTAMENTO', campo: 'departamento_nome' },
    { titulo: 'RESPONSÁVEL', campo: 'responsavel_nome' },
    { titulo: 'PASSÍVEL DE MULTA?', campo: 'passivel_multa', align: 'center' },
    { titulo: 'AÇÕES', campo: 'acoes', align: 'center', width: '100px' }
  ];

  const renderizarConteudo = (coluna, item) => {
    if (coluna.campo === 'passivel_multa') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${item.passivel_multa ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {item.passivel_multa ? 'Sim' : 'Não'}
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

export default Obrigacoes;