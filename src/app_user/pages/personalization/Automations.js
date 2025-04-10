import React, { useState } from 'react';
import { FiPlus, FiFile, FiMoreVertical, FiCalendar, FiCheckCircle, FiXCircle, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../../app/BaseLayout';
import Button from '../../../app/components/Button';
import FlipCard from '../../../app/components/FlipCard';

const Automacoes = () => {
  const navigate = useNavigate();
  
  const [automations, setAutomations] = useState([
    {
      id: 1,
      title: "Criar card de implantação",
      description: "Vendas e negociação: quando o card for movido para contrato (ganho) ele ficar na coluna implantação em sucesso do cliente!",
      startDate: "7 de Abril de 2025",
      startTime: "10:15",
      createdBy: "Admin Sequence",
      status: "active",
      successes: 3,
      failures: 0
    },
    {
      id: 2,
      title: "Criar card de implantação",
      description: "Vendas e negociação: quando o card for movido para contrato (ganho) ele ficar na coluna implantação em sucesso do cliente!",
      startDate: "7 de Abril de 2025",
      startTime: "10:15",
      createdBy: "Admin Sequence",
      status: "active",
      successes: 3,
      failures: 0
    },
    {
      id: 3,
      title: "Criar card de implantação",
      description: "Vendas e negociação: quando o card for movido para contrato (ganho) ele ficar na coluna implantação em sucesso do cliente!",
      startDate: "7 de Abril de 2025",
      startTime: "10:15",
      createdBy: "Admin Sequence",
      status: "active",
      successes: 3,
      failures: 0
    },
  ]);

  const toggleStatus = (id) => {
    setAutomations(prevAutomations => 
      prevAutomations.map(automation => 
        automation.id === id 
          ? { ...automation, status: automation.status === 'active' ? 'inactive' : 'active' }
          : automation
      )
    );
  };

  const handleNavigation = (id) => {
    navigate(`/deploymentcard?automationId=${id}`);
  };

  const renderAutomationCardFront = (automation) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4">
        <FiFile className="mr-3 text-gray-600 text-xl flex-shrink-0" />
        <h3 className="text-base font-medium text-gray-600">
          {automation.title}
        </h3>
      </div>

      <div className="flex-grow">
        <p className="text-sm text-gray-600 max-w-sm break-words">
          {automation.description}
        </p>
      </div>

      <div className="mt-auto">
        <button 
          className="bg-gray-200 text-xs text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          onClick={() => handleNavigation(automation.id)}
        >
          Ver mais
        </button>
      </div>
    </div>
  );

  const renderAutomationCardBack = (automation) => (
    <div className="flex flex-col h-full bg-white w-full p-2">
      <div className="flex justify-between items-center w-full mb-1">
        <div className="flex items-center gap-2">
          <FiCalendar className="text-[#0056d6] mr-1" size={14} />
          <span className="text-gray-700 text-sm font-medium">
            Iniciada em {automation.startDate} às {automation.startTime}
          </span>
        </div>
        
        <button className="hover:bg-gray-100 p-1 rounded">
          <FiMoreVertical size={18} className="text-gray-500" />
        </button>
      </div>
      
      <div className="flex flex-col space-y-1">
        <div className="flex items-center">
          <FiUser className="text-[#0056d6] mr-2" size={14} />
          <span className="text-gray-600 text-xs">
            Criado por: {automation.createdBy}
          </span>
        </div>
        
        <div className="flex items-center">
          <FiCheckCircle className="text-[#0056d6] mr-2" size={16} />
          <span className="text-gray-600 text-xs mr-1">Sucesso:</span>
          <span className="text-gray-600 font-medium">{automation.successes}</span>
        </div>
        
        <div className="flex items-center">
          <FiXCircle className="text-[#0056d6] mr-2" size={16} />
          <span className="text-gray-600 text-xs mr-1">Falha:</span>
          <span className="text-gray-600 font-medium">{automation.failures}</span>
        </div>
      </div>
      
      <div className="flex-grow"></div>
      
      <div className="w-full flex justify-between items-center mt-4">
        <button 
          className="bg-gray-200 text-xs text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          onClick={() => handleNavigation(automation.id)}
        >
          Ver mais
        </button>
        
        <div 
          className="relative inline-flex items-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleStatus(automation.id);
          }}
        >
          <input 
            type="checkbox" 
            checked={automation.status === 'active'} 
            onChange={() => {}}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-focus:ring-0">
            <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-all duration-200 ${automation.status === 'active' ? 'translate-x-5' : ''}`}></div>
          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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