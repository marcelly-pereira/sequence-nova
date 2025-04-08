import React from 'react';
import { FaUser, FaKey, FaFileAlt, FaGlobe } from 'react-icons/fa';

const Operacional = () => {
  const operacionalData = {
    acessos: [],
    senhas: [],
    outrasInformacoes: []
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-3">
          <FaGlobe className="text-white w-4 h-4" />
        </div>
        <h2 className="text-md font-medium">Informações Operacionais</h2>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <FaUser className="text-gray-400 mt-1 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Acessos:</p>
            {operacionalData.acessos.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {operacionalData.acessos.map((acesso, index) => (
                  <li key={index}>{acesso}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">Nenhum acesso registrado</p>
            )}
          </div>
        </div>
        
        <div className="flex items-start">
          <FaKey className="text-gray-400 mt-1 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Senhas:</p>
            {operacionalData.senhas.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {operacionalData.senhas.map((senha, index) => (
                  <li key={index}>{senha}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">Nenhuma senha registrada</p>
            )}
          </div>
        </div>
        
        <div className="flex items-start">
          <FaFileAlt className="text-gray-400 mt-1 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Outras Informações:</p>
            {operacionalData.outrasInformacoes.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {operacionalData.outrasInformacoes.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">Nenhuma informação adicional registrada</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operacional;