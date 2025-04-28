import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import BaseForm from '../../app/components/BaseForm';

const FormDeleteColaborador = ({
  isOpen,
  onClose,
  onConfirm,
  colaborador,
}) => {
  if (!colaborador) return null;

  const handleSubmit = () => {
    onConfirm(colaborador.id);
  };

  const fields = [
    {
      id: 'confirmacao',
      label: 'Confirmação',
      type: 'info',
      content: `Você está prestes a excluir o colaborador "${colaborador.nome}".`,
    },
    {
      id: 'aviso',
      label: 'Aviso',
      type: 'warning',
      content:
        'Esta ação não poderá ser desfeita. Todos os dados associados a este colaborador serão permanentemente removidos.',
    },
  ];

  const renderFormFields = () => {
    return (
      <div className="max-h-[calc(80vh-120px)] overflow-y-auto px-1">
        <div className="mb-4 pb-2">
          <h3 className="text-md font-medium text-gray-700">
            Confirmação de Exclusão
          </h3>
        </div>
        {renderFormSection(fields)}
      </div>
    );
  };

  const renderFormSection = (sectionFields) => {
    return (
      <div className="space-y-4">
        {sectionFields.map((field, index) => renderField(field, index))}
      </div>
    );
  };

  const renderField = (field, index) => {
    return (
      <div
        key={field.id}
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + index * 0.05 }}
      >
        {field.type === 'info' && (
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-700">{field.content}</p>
          </div>
        )}

        {field.type === 'warning' && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <div className="flex items-start">
              <FiAlertTriangle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-red-700 text-sm">{field.content}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const temDepartamento = colaborador.departamento && colaborador.departamento !== '-';
  const temCargoGerencial = ['Gerente', 'Diretor', 'Administrador'].includes(colaborador.nivel);

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Excluir Colaborador"
      icon={<FiAlertTriangle className="w-6 h-6" />}
      primaryColor="#EF4444"
      isValid={true}
      submitButtonText="Excluir"
      cancelButtonText="Cancelar"
    >
      {renderFormFields()}

      {temDepartamento && (
        <div
          className="mt-4 bg-yellow-50 p-4 rounded-md border border-yellow-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start">
            <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-yellow-700 text-sm">
              Este colaborador está vinculado a um departamento e será desvinculado.
            </p>
          </div>
        </div>
      )}

      {temCargoGerencial && (
        <div
          className="mt-4 bg-yellow-50 p-4 rounded-md border border-yellow-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start">
            <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-yellow-700 text-sm">
              Este colaborador possui cargo de gestão e pode estar vinculado a responsabilidades
              administrativas que serão interrompidas.
            </p>
          </div>
        </div>
      )}
    </BaseForm>
  );
};

export default FormDeleteColaborador;