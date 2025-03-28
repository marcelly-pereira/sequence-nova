import React from 'react';
import BaseLayout from '../../../app/BaseLayout';

const Automacoes = () => {
  return (
    <BaseLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-indigo-800 mb-4">
          Olá, eu sou a tela de Automações!
        </h1>
        <p className="text-gray-700">Configure as automações do sistema aqui.</p>
      </div>
    </BaseLayout>
  );
};

export default Automacoes;