import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const SequenceGrid = ({ sequences = [], departmentName }) => {
  if (!sequences || sequences.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        Nenhuma sequência encontrada para este departamento.
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sequences.map((sequence) => (
        <Card
          key={sequence.id}
          title={sequence.nome}
          subtitle={departmentName}
          count={0} // Não temos a contagem de cards ainda
          color="#3B82F6" // Usamos uma cor padrão, mas poderia vir da sequência
          onClick={() => console.log(`Clicou na sequência ${sequence.id}: ${sequence.nome}`)}
        />
      ))}
    </div>
  );
};

SequenceGrid.propTypes = {
  sequences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nome: PropTypes.string.isRequired,
    })
  ),
  departmentName: PropTypes.string.isRequired
};

export default SequenceGrid;