import React from 'react';
import { motion } from 'framer-motion';

/**
 * Processa a lista de regimes adicionando informações de departamentos e obrigações
 * @param {Array} regimes - Lista de regimes tributários
 * @param {Object} obrigacoesMap - Mapa de obrigações
 * @param {Object} departamentosMap - Mapa de departamentos
 * @returns {Array} - Lista processada de regimes
 */
export const processarRegimes = (regimes, obrigacoesMap, departamentosMap) => {
  return regimes.map(regime => ({
    id: regime.id,
    nome: regime.nome,
    ativo: regime.ativo,
    obrigacoes: regime.obrigacoes || [],
    departamentos: regime.departamentos || [],
    departamentosDetalhes: (regime.departamentos || [])
      .map(id => departamentosMap[id])
      .filter(Boolean),
    obrigacoesTags: mapearObrigacoes(regime.obrigacoes || [], obrigacoesMap)
  }));
};

/**
 * Mapeia IDs de obrigações para seus componentes visuais
 * @param {Array} obrigacoesIds - Lista de IDs de obrigações
 * @param {Object} obrigacoesMap - Mapa de obrigações
 * @returns {JSX.Element} - Componente React com as tags de obrigações
 */
export const mapearObrigacoes = (obrigacoesIds, obrigacoesMap) => {
  if (!obrigacoesIds || obrigacoesIds.length === 0) {
    return <span className="text-gray-400">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {obrigacoesIds.map((id) => {
        const obrigacao = obrigacoesMap[id];
        if (!obrigacao) return null;

        return (
          <motion.span 
            key={id} 
            className="px-2 py-1 bg-cyan-100 text-cyan-600 text-xs rounded-md"
            title={obrigacao.nome}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {obrigacao.mininome}
          </motion.span>
        );
      })}
    </div>
  );
};