import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BaseForm from '../app/components/BaseForm';

const ExcluirRegimeForm = ({ isOpen, onClose, onConfirm, regime }) => {
  if (!regime) return null;

  const handleSubmit = () => {
    onConfirm(regime.id);
  };

  // Campos para o formulário de exclusão
  const fields = [
    {
      id: 'confirmacao',
      label: 'Confirmação',
      type: 'info',
      content: `Você está prestes a excluir o regime tributário "${regime.nome}".`
    },
    {
      id: 'aviso',
      label: 'Aviso',
      type: 'warning',
      content: 'Esta ação não poderá ser desfeita. Todos os dados associados a este regime serão permanentemente removidos.'
    }
  ];

  // Função para renderizar os campos do formulário
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

  // Função para renderizar uma seção do formulário
  const renderFormSection = (sectionFields) => {
    return (
      <div className="space-y-4">
        {sectionFields.map((field, index) => renderField(field, index))}
      </div>
    );
  };

  // Função para renderizar um campo do formulário
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

  // Se o regime tiver obrigações associadas, mostrar um aviso adicional
  const hasObrigacoes = regime.obrigacoes && regime.obrigacoes.length > 0;

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Excluir Regime Tributário"
      icon={<FiAlertTriangle className="w-6 h-6" />}
      primaryColor="#EF4444"
      isValid={true}
      submitButtonText="Excluir"
      cancelButtonText="Cancelar"
    >
      {renderFormFields()}
      
      {hasObrigacoes && (
        <motion.div 
          className="mt-4 bg-yellow-50 p-4 rounded-md border border-yellow-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start">
            <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-yellow-700 text-sm">
              Este regime possui {regime.obrigacoes.length} obrigações associadas que também serão desvinculadas.
            </p>
          </div>
        </motion.div>
      )}
    </BaseForm>
  );
};

export default ExcluirRegimeForm;