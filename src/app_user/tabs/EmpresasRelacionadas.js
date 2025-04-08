import React from 'react';
import { FaBuilding } from 'react-icons/fa';

const EmpresasRelacionadas = () => {
  const empresasIndicadas = [];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-3">
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </div>
        <h2 className="text-md font-medium">Empresas Indicadas pelo Cliente</h2>
      </div>

      <div className="min-h-48">
        {empresasIndicadas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {empresasIndicadas.map((empresa, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-medium mb-2">{empresa.nome}</h3>
                <div className="text-sm text-gray-600">
                  <p>CNPJ: {empresa.cnpj}</p>
                  <p>Contato: {empresa.contato}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-40">
            <FaBuilding className="text-gray-300 text-4xl mb-3" />
            <p className="text-gray-500">
              Nenhuma empresa relacionada encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpresasRelacionadas;
