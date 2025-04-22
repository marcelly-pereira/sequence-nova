import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Table from '../../../../app/components/Table';

const ObrigacoesResponsavel = () => {
  const [obrigacoes, setObrigacoes] = useState([]);
  const [nextUrl, setNextUrl] = useState('https://comercial.sequence.app.br/api/v1/lista_de_obrigacoes_do_responsavel/');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const observerRef = useRef(null);

  const fetchMais = useCallback(async () => {
    if (!nextUrl || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch(nextUrl);
      const data = await res.json();
      setObrigacoes(prev => [...prev, ...data.results]);
      setNextUrl(data.next);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar obrigações');
    } finally {
      setIsLoading(false);
    }
  }, [nextUrl, isLoading]);

  useEffect(() => {
    fetchMais();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMais();
      }
    }, {
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchMais]);

  const colunas = [
    { titulo: 'ID', campo: 'id' },
    { titulo: 'NOME', campo: 'obrigacao_nome' },
    { titulo: 'DEPARTAMENTO', campo: 'nome_departamento' },
    { titulo: 'RESPONSÁVEL', campo: 'responsavel_nome' },
    { titulo: 'PASSÍVEL DE MULTA?', campo: 'passivel_de_multa' },
    { titulo: 'AÇÕES', campo: 'acoes', align: 'right' },
  ];

  const renderizarConteudo = (coluna, item) => {
    if (coluna.campo === 'passivel_de_multa') {
      return item.atrasada ? 'Sim' : 'Não';
    }

    if (coluna.campo === 'acoes') {
      return (
        <div className="flex justify-end space-x-2">
          <motion.button
            className="p-1 text-gray-500 hover:text-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              alert(`Editar obrigação ID: ${item.id}`);
            }}
          >
            <FiEdit2 size={16} />
          </motion.button>
          <motion.button
            className="p-1 text-gray-500 hover:text-red-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              alert(`Excluir obrigação ID: ${item.id}`);
            }}
          >
            <FiTrash2 size={16} />
          </motion.button>
        </div>
      );
    }

    return item[coluna.campo] || '—';
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          {obrigacoes.length} obrigações carregadas
        </span>
        <motion.button
          className="flex items-center justify-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          onClick={() => alert('Abrir formulário de nova obrigação')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus className="mr-2" />
          Cadastrar
        </motion.button>
      </div>

      <div className="bg-white overflow-hidden rounded-md shadow">
        {obrigacoes.length > 0 ? (
          <div className="overflow-x-auto">
            <Table
              colunas={colunas}
              dados={obrigacoes}
              renderizarConteudo={renderizarConteudo}
            />
            <div ref={observerRef} className="py-6 text-center text-gray-400">
              {isLoading ? 'Carregando mais...' : nextUrl ? 'Role para carregar mais' : 'Fim da lista'}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p className="text-sm">Nenhuma obrigação encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObrigacoesResponsavel;
