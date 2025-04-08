import React, { useState } from 'react';
import RegistroForm from '../../app/forms/FormRegister';
import { Button } from '../../app/components/Button';

const RegistroRelevantes = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentRegistro, setCurrentRegistro] = useState(null);

  const handleOpenCreateForm = () => {
    setFormMode('create');
    setCurrentRegistro(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (registro) => {
    setFormMode('edit');
    setCurrentRegistro(registro);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmitForm = () => {
    console.log('Formulário enviado:', formMode, currentRegistro);
    setIsFormOpen(false);
  };

  const registros = [
    {
      id: 1,
      empresa: 'ODOS ACELERADORA LTDA',
      departamento: 'Marketing',
      responsavel: 'João Silva',
      canal: 'Telefone',
      registro: 'Reunião sobre campanha de marketing digital.',
    },
    {
      id: 2,
      empresa: 'ODOS ACELERADORA LTDA',
      departamento: 'Financeiro',
      responsavel: 'Maria Santos',
      canal: 'E-mail',
      registro: 'Envio de relatório financeiro trimestral.',
    },
    {
      id: 3,
      empresa: 'ODOS ACELERADORA LTDA',
      departamento: 'Vendas',
      responsavel: 'Carlos Oliveira',
      canal: 'WhatsApp',
      registro: 'Negociação de contrato com novo cliente.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end p-4 bg-white border-b">
        <Button
          variant="primary"
          className="bg-[#18183A] text-sm py-[0.45rem] px-2 shadow-sm"
          onClick={handleOpenCreateForm}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Adicionar Registro
        </Button>
      </div>

      <div className="flex p-8">
        <div className="w-60 mr-8">
          <h2 className="text-md font-medium text-gray-800 mb-4">
            Departamento
          </h2>

          <Button
            variant="primary"
            className="w-full bg-[#18183A] text-white py-3 rounded-md flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filtrar
          </Button>
        </div>

        <div className="flex-1">
          {registros.map((registro) => (
            <div
              key={registro.id}
              className="mb-6 bg-white rounded-lg shadow-sm"
            >
              <div className="flex p-4">
                <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-3 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-md font-medium text-gray-900">
                    {registro.empresa}
                  </h3>

                  <div className="flex text-sm text-gray-600 mt-1">
                    <span className="mr-6">
                      Departamento: {registro.departamento}
                    </span>
                    <span className="mr-6">
                      Responsável: {registro.responsavel}
                    </span>
                    <span className="flex items-center">
                      Canal: {registro.canal}
                      <svg
                        className="w-4 h-4 ml-1 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <button
                  className="text-[#18183A] p-1.5 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center w-8 h-8"
                  onClick={() => handleOpenEditForm(registro)}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              <div className="px-4 pb-4 pl-16 flex items-start">
                <svg
                  className="w-4 h-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-sm text-gray-500 italic">
                  {registro.registro}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RegistroForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        mode={formMode}
        registro={currentRegistro}
      />
    </div>
  );
};

export default RegistroRelevantes;
