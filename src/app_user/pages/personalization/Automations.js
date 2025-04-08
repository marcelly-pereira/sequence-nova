import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiMoreVertical, FiFile } from 'react-icons/fi';
import BaseLayout from '../../../app/BaseLayout';
import Button from '../../../app/components/Button';

const AutomationCard = ({
  title,
  description,
  startDate,
  startTime,
  createdBy,
  status,
  onToggleStatus
}) => {
  const [isActive, setIsActive] = useState(status === "active");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggle = () => {
    setIsActive(!isActive);
    if (onToggleStatus) {
      onToggleStatus(!isActive);
    }
  };
  
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full flex flex-col hover:border-[#005efc] group transition-colors duration-200">
      <div className="flex justify-between flex-grow">
        <div className="flex flex-col">
          <div className="flex items-start mb-2">
            <FiFile className="mt-1 mr-3 text-gray-700 text-md flex-shrink-0 group-hover:text-[#005efc] transition-colors duration-200" />
            <div>
              <h3 className="text-base font-medium text-gray-800 group-hover:text-[#005efc] transition-colors duration-200">{title}</h3>
              <p className="text-sm text-gray-600 max-w-sm break-words">{description}</p>
            </div>
          </div>
          <div className="ml-8 text-xs text-gray-600 mt-1">
            <p>Iniciada em {startDate} às {startTime}</p>
            <p>Criado por {createdBy}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center relative" ref={menuRef}>
            <button 
              className="p-1 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FiMoreVertical size={16} className="text-gray-500" />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 top-8 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                <ul className="py-1">
                  <li>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Editar
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Duplicar
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Excluir
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 pt-2 flex justify-between items-center">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 px-4 rounded">
          Ver detalhes
        </button>
        <button 
          onClick={handleToggle} 
          className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${isActive ? 'bg-[#005efc]' : 'bg-gray-300'}`}
        >
          <div 
            className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${isActive ? 'translate-x-4' : 'translate-x-0'}`}
          />
        </button>
      </div>
    </div>
  );
};

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
      title: "Cria empresa na base de clientes",
      description: "Vendas e negociação: quando o card for movido para contrato (ganho) ele ficar na coluna implantação em sucesso do cliente!",
      startDate: "3 de Abril de 2025",
      startTime: "11:28",
      createdBy: "Admin Sequence",
      status: "inactive"
    }
  ]);

  const handleToggleStatus = (id, newStatus) => {
    setAutomations(prevAutomations => 
      prevAutomations.map(automation => 
        automation.id === id 
          ? { ...automation, status: newStatus ? "active" : "inactive" } 
          : automation
      )
    );
  };

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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {automations.map(automation => (
                <AutomationCard
                  key={automation.id}
                  title={automation.title}
                  description={automation.description}
                  startDate={automation.startDate}
                  startTime={automation.startTime}
                  createdBy={automation.createdBy}
                  status={automation.status}
                  onToggleStatus={(newStatus) => handleToggleStatus(automation.id, newStatus)}
                />
              ))}
            </div>
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