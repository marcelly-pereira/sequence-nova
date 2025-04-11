import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { CiFileOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Table = ({ 
  colunas, 
  dados, 
  onAcaoClick, 
  renderizarStatus,
  renderizarConteudo,
  onRowClick 
}) => {
  const navigate = useNavigate();

  const handleProntuarioClick = (item) => {
    navigate(`/record?id=${item.id}`);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr className="text-left text-xs font-medium text-gray-500 tracking-wider">
          {colunas.map((coluna, index) => (
            <th 
              key={index} 
              className={`
                ${coluna.apenasDesktop ? 'hidden sm:table-cell' : ''} 
                px-2 sm:px-4 py-2 sm:py-3 border-b
              `}
            >
              {coluna.titulo}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {dados.map((item, itemIndex) => (
          <tr 
            key={itemIndex} 
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick && onRowClick(item)}
          >
            {colunas.map((coluna, colunaIndex) => (
              <td 
                key={colunaIndex}
                className={`
                  ${coluna.apenasDesktop ? 'hidden sm:table-cell' : ''} 
                  px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700
                  ${coluna.centralizado ? 'text-center' : ''}
                  ${coluna.tipo === 'prontuario' && item[coluna.campo] ? 'cursor-pointer' : ''}
                `}
                onClick={coluna.tipo === 'prontuario' && item[coluna.campo] 
                  ? (e) => {
                      e.stopPropagation();
                      handleProntuarioClick(item);
                    } 
                  : undefined
                }
              >
                {renderizarConteudo 
                  ? renderizarConteudo(coluna, item) 
                  : renderConteudoPadrao(coluna, item, onAcaoClick, renderizarStatus)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const renderConteudoPadrao = (coluna, item, onAcaoClick, renderizarStatus) => {
  const valor = item[coluna.campo];

  if (coluna.tipo === 'status' && renderizarStatus) {
    return renderizarStatus(valor);
  }
  
  if (coluna.tipo === 'prontuario') {
    return valor ? (
      <div className="flex justify-center">
        <div className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <CiFileOn size={18} className="text-gray-600" />
        </div>
      </div>
    ) : null;
  }
  
  if (coluna.tipo === 'acao' || coluna.tipo === 'acoes') {
    return (
      <div className="flex justify-center">
        <button 
          className="text-gray-600 hover:text-gray-900"
          onClick={(e) => {
            e.stopPropagation();
            onAcaoClick && onAcaoClick(item);
          }}
        >
          <FiMoreVertical size={18} />
        </button>
      </div>
    );
  }
  
  if (coluna.tipo === 'checkbox') {
    return (
      <input 
        type="checkbox" 
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        onClick={(e) => e.stopPropagation()}
      />
    );
  }
  
  return valor || '—';
};

export default Table;