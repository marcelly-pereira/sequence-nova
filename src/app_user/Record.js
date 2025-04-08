import React, { useState } from 'react';
import BaseLayout from '../app/BaseLayout';
import { FaBuilding } from 'react-icons/fa';
import VisaoGeral from './tabs/VisaoGeral';
import Relacionamento from './tabs/Relacionamento';
import Operacional from './tabs/Operacional';
import EmpresasRelacionadas from './tabs/EmpresasRelacionadas';
import RegistrosRelevantes from './tabs/RegistrosRelevantes';

const FiscalManagementUI = () => {
  const [activeTab, setActiveTab] = useState('Visão Geral');
  
  const tabs = ['Visão Geral', 'Relacionamento', 'Operacional', 'Empresas Relacionadas', 'Registros Relevantes'];

  const tabComponents = {
    'Visão Geral': <VisaoGeral />,
    'Relacionamento': <Relacionamento />,
    'Operacional': <Operacional />,
    'Empresas Relacionadas': <EmpresasRelacionadas />,
    'Registros Relevantes': <RegistrosRelevantes />
  };

  return (
    <BaseLayout title="Prontuário do Cliente">
      <div className="min-h-screen">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <div className="flex flex-row">
            <div className="w-64 p-4 border border-gray-200 rounded-lg flex items-center justify-center">
              <FaBuilding className="text-gray-400 text-6xl" />
            </div>

            <div className="ml-8 flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">ODOS ACELERADORA LTDA</h1>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500">Sócio-Administrador:</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500">Regime Tributário: teste b</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500">Honorário Mensal: R$</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500">Grupo:</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500">Cidade: TERESINA</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500">Contato Principal: (00) 0000-0000</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500">Cliente desde: 00/00/0000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 rounded-lg text-sm ${activeTab === tab
                ? 'bg-[#252563] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {tabComponents[activeTab] || tabComponents['Visão Geral']}
      </div>
    </BaseLayout>
  );
};

export default FiscalManagementUI;