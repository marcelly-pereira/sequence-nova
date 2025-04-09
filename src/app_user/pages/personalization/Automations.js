import React, { useState } from 'react';
import { FiPlus, FiFile } from 'react-icons/fi';
import BaseLayout from '../../../app/BaseLayout';
import Button from '../../../app/components/Button';
import FlipCard from '../../../app/components/FlipCard';

const Automacoes = () => {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      title: "Criar card de implantação",
      description: "Vendas e negociação: quando o card for movido para contrato (ganho) ele ficar na coluna implantação em sucesso do cliente!",
      startDate: "7 de Abril de 2025",
      startTime: "10:15",
      createdBy: "Admin Sequence",
      status: "active"
    },
    {
      id: 2,
      title: "Criar card de implantação",
      description: "Vendas e negociação: quando o card for movido para contrato (ganho) ele ficar na coluna implantação em sucesso do cliente!",
      startDate: "7 de Abril de 2025",
      startTime: "10:15",
      createdBy: "Admin Sequence",
      status: "active"
    },
  ]);

  const renderAutomationCardFront = (automation) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4">
        <FiFile className="mr-3 text-[#005efc] text-xl flex-shrink-0" />
        <h3 className="text-base font-medium text-[#005efc]">
          {automation.title}
        </h3>
      </div>

      <div className="flex-grow">
        <p className="text-sm text-gray-600 max-w-sm break-words">
          {automation.description}
        </p>
      </div>

      <div className="mt-auto">
        <button className="bg-gray-200 text-xs text-gray-700 px-4 py-2 rounded">
          Ver mais
        </button>
      </div>
    </div>
  );

  const renderAutomationCardBack = (automation) => (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FiFile className="mr-3 text-[#005efc] text-xl flex-shrink-0" />
          <h3 className="text-base font-medium text-[#005efc]">Detalhes da Automação</h3>
        </div>
      </div>
      <div className="mb-2">
        <h4 className="font-medium">{automation.title}</h4>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">{automation.description}</p>
      </div>
      <div className="mt-auto">
        <p>Status: {automation.status === 'active' ? 'Ativo' : 'Inativo'}</p>
      </div>
    </div>
  );
  return (
    <BaseLayout title="Automações">
      <div className="min-h-screen">
        <div className="mb-6">
          <Button
            variant="primary"
            className="text-sm py-[0.45rem] px-4 shadow-sm"
            icon={<FiPlus size={18} />}
          >
            Criar Nova
          </Button>
        </div>

        {automations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automations.map(automation => (
              <FlipCard
                key={automation.id}
                frontContent={renderAutomationCardFront(automation)}
                backContent={renderAutomationCardBack(automation)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border-gray-200">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-700 font-medium mb-1">
                Nenhuma automação encontrada.
              </p>
              <p className="text-gray-600">
                Crie uma nova usando as Sequências disponíveis.
              </p>
            </div>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default Automacoes;