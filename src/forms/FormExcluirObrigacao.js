import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BaseForm from '../app/components/BaseForm';

const ExcluirObrigacaoForm = ({ isOpen, onClose, onConfirm, obrigacao }) => {
  if (!obrigacao) return null;

  const handleSubmit = () => {
    onConfirm(obrigacao.id || obrigacao.obrigacao_id);
  };

  const fields = [
    {
      id: 'confirmacao',
      label: 'Confirmação',
      type: 'info',
      content: `Você está prestes a excluir a obrigação "${obrigacao.nome || obrigacao.obrigacao_nome}".`
    },
    {
      id: 'aviso',
      label: 'Aviso',
      type: 'warning',
      content: 'Esta ação não poderá ser desfeita. Todos os dados associados a esta obrigação serão permanentemente removidos.'
    }
  ];

  const renderFormFields = () => {
    return (
      <div className="max-h-[calc(80vh-120px)] overflow-y-auto px-1">
        <div className="mb-4 pb-2">
          <h3 className="text-md font-medium text-gray-700">Confirmação de Exclusão</h3>
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
      <motion.div 
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
      </motion.div>
    );
  };

  const passiveMulta = obrigacao.passivel_multa || obrigacao.passivelMulta;

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Excluir Obrigação"
      icon={<FiAlertTriangle className="w-6 h-6" />}
      primaryColor="#EF4444"
      isValid={true}
      submitButtonText="Excluir"
      cancelButtonText="Cancelar"
    >
      {renderFormFields()}
      
      {passiveMulta && (
        <motion.div 
          className="mt-4 bg-yellow-50 p-4 rounded-md border border-yellow-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start">
            <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-yellow-700 text-sm">
              Esta obrigação está marcada como passível de multa. Sua exclusão pode afetar o controle de prazos legais.
            </p>
          </div>
        </motion.div>
      )}
    </BaseForm>
  );
};

export default ExcluirObrigacaoForm;