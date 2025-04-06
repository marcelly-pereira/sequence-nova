import React, { useState } from 'react';
import { FaBuilding, FaFilter, FaCircle, FaChevronLeft, FaChevronRight, FaExclamationTriangle } from 'react-icons/fa';

const FiscalManagementUI = () => {
  const [activeTab, setActiveTab] = useState('Visão Geral');
  const [selectedMonth, setSelectedMonth] = useState('abril de 2025');
  const [activeSection, setActiveSection] = useState('Federal');

  const tabs = ['Visão Geral', 'Relacionamento', 'Operacional', 'Empresas Relacionadas', 'Registros Relevantes'];
  
  return (
    <div className="bg-gray-50 min-h-screen p-4">
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
      <div className="flex mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 rounded-lg ${
              activeTab === tab
                ? 'bg-indigo-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-gray-700 mb-2">Selecione um período para consultar:</p>
        <div className="flex items-center">
          <button className="border border-gray-300 rounded p-2 mr-2">
            <FaChevronLeft className="text-gray-500" />
          </button>
          
          <div className="relative">
            <select 
              className="border border-gray-300 rounded py-2 px-4 pr-8 bg-white appearance-none"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option>abril de 2025</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FaChevronRight className="text-gray-500 rotate-90" />
            </div>
          </div>
          
          <button className="border border-gray-300 rounded p-2 ml-2">
            <FaChevronRight className="text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
              <FaCircle className="text-white text-xs" />
            </div>
            <h2 className="text-lg font-medium">Tributos a pagar</h2>
          </div>
          
          <hr className="mb-4" />
          
          <h3 className="mb-2">Lista de Tributos</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="flex justify-between items-center p-3 border-b border-gray-200">
              <span className="text-gray-700">Imposto de Renda</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border-b border-gray-200">
              <span className="text-gray-700">Contribuição para o INSS</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border-b border-gray-200">
              <span className="text-gray-700">Imposto sobre Produtos e Serviços (ICMS)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3">
              <span className="text-gray-700">Imposto sobre Circulação de Mercadorias e Serviços (ICMS)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
          </div>
          
          <h3 className="mb-2">Parcelamentos</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 flex items-center">
            <FaExclamationTriangle className="text-yellow-600 mr-2" />
            <span className="text-yellow-800">Sem dados para reportar</span>
          </div>
          
          <h3 className="mb-2">Faturamento do mês</h3>
          <div className="flex justify-between py-1">
            <span className="text-gray-700">Simples Nacional</span>
            <span className="text-emerald-500">R$</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-700">Total de impostos</span>
            <span className="text-emerald-500">R$</span>
          </div>
          <div className="flex justify-between py-1 mb-4">
            <span className="text-gray-700"></span>
            <span className="text-emerald-500">%</span>
          </div>
          
          <h3 className="mb-2">Folha do mês</h3>
          <div className="flex justify-between py-1">
            <span className="text-gray-700"></span>
            <span className="text-emerald-500">R$</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
              <FaCircle className="text-white text-xs" />
            </div>
            <h2 className="text-lg font-medium">Obrigações</h2>
          </div>
          
          <hr className="mb-4" />
          
          <h3 className="mb-2">Lista de Obrigações</h3>
          <div className="flex items-center mb-4">
            <span className="mr-2">Departamento</span>
            <button className="border border-gray-300 rounded p-1">
              <FaFilter className="text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Imposto de Renda</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Contribuição para o INSS</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Imposto sobre Produtos e Serviços (ICMS)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Imposto sobre Circulação de Mercadorias e Serviços (ICMS)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Imposto sobre Serviços (ISS)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Contribuição Social sobre o Lucro Líquido (CSLL)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Programa de Integração Social (PIS)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Contribuição para o Financiamento da Seguridade Social (COFINS)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
              <span className="text-gray-700">Imposto sobre Propriedade de Veículos Automotores (IPVA)</span>
              <button className="bg-emerald-500 text-white px-4 py-1 rounded">Envio</button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
              <FaCircle className="text-white text-xs" />
            </div>
            <h2 className="text-lg font-medium">Situação Fiscal</h2>
          </div>
          
          <hr className="mb-4" />
          
          <div className="mb-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-emerald-500 text-white p-2 text-left">CERTIDÕES</th>
                  <th className="bg-emerald-500 text-white p-2 text-left">SITUAÇÃO</th>
                  <th className="bg-emerald-500 text-white p-2 text-left">DATA DE VALIDADE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">CND FEDERAL</td>
                  <td className="p-2 border-b">
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded block text-center">Regular</span>
                  </td>
                  <td className="p-2 border-b"></td>
                </tr>
                <tr>
                  <td className="p-2 border-b">CND ESTADUAL</td>
                  <td className="p-2 border-b">
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded block text-center">Regular</span>
                  </td>
                  <td className="p-2 border-b"></td>
                </tr>
                <tr>
                  <td className="p-2 border-b">CND ESTADUAL</td>
                  <td className="p-2 border-b">
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded block text-center">Regular</span>
                  </td>
                  <td className="p-2 border-b"></td>
                </tr>
                <tr>
                  <td className="p-2">CND MUNICIPAL</td>
                  <td className="p-2">
                    <span className="bg-yellow-500 text-white px-4 py-1 rounded block text-center">Irregular</span>
                  </td>
                  <td className="p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mb-2">
            <p className="font-medium mb-2">ODOS ACELERADORA LTDA - 12</p>
            <div className="flex mb-4">
              <button 
                className={`py-1 px-4 rounded-lg mr-2 ${
                  activeSection === 'Federal' ? 'bg-indigo-900 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveSection('Federal')}
              >
                Federal
              </button>
              <button 
                className={`py-1 px-4 rounded-lg mr-2 ${
                  activeSection === 'Estadual' ? 'bg-indigo-900 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveSection('Estadual')}
              >
                Estadual
              </button>
              <button 
                className={`py-1 px-4 rounded-lg ${
                  activeSection === 'Municipal' ? 'bg-indigo-900 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveSection('Municipal')}
              >
                Municipal
              </button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left border-b">OBRIGAÇÃO</th>
                  <th className="p-2 text-right border-b">VALOR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b">SIMPLES NAC.</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">IRRF</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">PIS</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">COFINS</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">IRPJ</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">CSLL</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">CP-SEGUR.</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">CP-PATRONAL</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2 border-b">CP-TERCEIROS</td>
                  <td className="p-2 text-right border-b">R$</td>
                </tr>
                <tr>
                  <td className="p-2">GFIP - MULTI ATR</td>
                  <td className="p-2 text-right">R$</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiscalManagementUI;