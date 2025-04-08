import React from 'react';
import { FaUser } from 'react-icons/fa';

const Relacionamento = () => {
  const clienteData = {
    nome: 'ODOS ACELERADORA LTDA',
    honorarios: 'R',
    empresasGrupo: 'Geral',
    contato: '(00) 0000-0000',
    desde: '00/00/0000'
  };

  const receitasPerdasData = {
    totalReceitas: '',
    totalPerdas: '',
    ltv: '',
    notaNPS: ''
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-3">
            <FaUser className="text-white w-4 h-4" />
          </div>
          <h2 className="text-md font-medium">Cliente</h2>
        </div>
        
        <div className="mt-4">
          <div className="flex mb-6">
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm"><strong>Nome:</strong> {clienteData.nome}</p>
            </div>
          </div>
          
          <div className="flex mb-6">
            <span className="flex items-center justify-center w-6 h-6 mr-3 text-gray-500">$</span>
            <div>
              <p className="text-sm"><strong>Honorários:</strong> {clienteData.honorarios}</p>
            </div>
          </div>
          
          <div className="flex">
            <span className="flex items-center justify-center w-6 h-6 mr-3 text-gray-500">≡</span>
            <div>
              <p className="text-sm"><strong>Empresas do Grupo:</strong> {clienteData.empresasGrupo}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
            </svg>
          </div>
          <h2 className="text-md font-medium">Quantidade de Indicações</h2>
        </div>
        
        <div className="mt-4 h-36 relative">
          <div className="absolute left-4 top-0 text-xs text-gray-500">1</div>
          
          <div className="absolute left-8 right-8 top-3 bottom-8 border border-gray-200">
          </div>
          
          <div className="absolute left-4 bottom-8 text-xs text-gray-500">0</div>
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
            Indicações
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.8,10.9c-2.27-0.59-3-1.2-3-2.15c0-1.09,1.01-1.85,2.7-1.85c1.78,0,2.44,0.85,2.5,2.1h2.21 c-0.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94,0.42-3.5,1.68-3.5,3.61c0,2.31,1.91,3.46,4.7,4.13c2.5,0.6,3,1.48,3,2.41 c0,0.69-0.49,1.79-2.7,1.79c-2.06,0-2.87-0.92-2.98-2.1H6.32c0.12,2.19,1.76,3.42,3.68,3.83V21h3v-2.15 c1.95-0.37,3.5-1.5,3.5-3.55C16.5,12.46,14.07,11.49,11.8,10.9z"/>
            </svg>
          </div>
          <h2 className="text-md font-medium">Receitas e Perdas Durante LTV</h2>
        </div>
        
        <div className="mt-6 space-y-6">
          <div className="flex">
            <div className="w-8 h-8 mr-3 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <p className="text-sm"><strong>Total de Receitas Extras:</strong> {receitasPerdasData.totalReceitas}</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-6 h-6 border-2 border-gray-300 rounded-full mr-3 bg-white"></div>
            <div>
              <p className="text-sm"><strong>Total de Perdas:</strong> {receitasPerdasData.totalPerdas}</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-500">LTV</span>
            </div>
            <div>
              <p className="text-sm"><strong>LTV:</strong> {receitasPerdasData.ltv}</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-6 h-6 mr-3 flex items-center justify-center text-yellow-500">
              ★
            </div>
            <div>
              <p className="text-sm"><strong>Nota do Último NPS:</strong> {receitasPerdasData.notaNPS}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relacionamento;