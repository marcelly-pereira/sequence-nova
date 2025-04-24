import React, { useState, useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BaseForm from '../app/components/BaseForm';
import ObrigacaoService from '../services/obligations';

const ExcluirObrigacaoForm = ({ isOpen, onClose, onConfirm, obrigacao }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [obrigacaoCompleta, setObrigacaoCompleta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (obrigacao && obrigacao.id && isOpen) {
      fetchObrigacaoDetalhes(obrigacao.id);
    }
  }, [obrigacao, isOpen]);

  const fetchObrigacaoDetalhes = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const detalhes = await ObrigacaoService.obterObrigacao(id);
      setObrigacaoCompleta(detalhes);
    } catch (error) {
      console.error(`Erro ao obter detalhes da obrigação ${id}:`, error);
      setError('Não foi possível carregar os detalhes da obrigação. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!obrigacao || !obrigacao.id) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await ObrigacaoService.excluirObrigacao(obrigacao.id);
      onConfirm(obrigacao.id);
    } catch (error) {
      console.error('Erro ao excluir obrigação:', error);
      setError(`Erro ao excluir: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  if (!obrigacao) return null;

  const fields = [
    {
      id: 'confirmacao',
      label: 'Confirmação',
      type: 'info',
      content: `Você está prestes a excluir a obrigação "${obrigacao.nome}".`
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

  const renderLoadingIndicator = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <div 
        className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-red-500"
      />
      <p className="mt-4 text-sm text-gray-500">Verificando dependências...</p>
    </div>
  );

  // Verificar se a obrigação está vinculada a outros registros
  // Isso poderia ser expandido conforme necessário para verificar outras relações
  const hasRelacoes = obrigacaoCompleta && 
                     obrigacaoCompleta.regimes_tributarios && 
                     obrigacaoCompleta.regimes_tributarios.length > 0;

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Excluir Obrigação"
      icon={<FiAlertTriangle className="w-6 h-6" />}
      primaryColor="#EF4444"
      isValid={!isSubmitting}
      submitButtonText={isSubmitting ? "Excluindo..." : "Excluir"}
      cancelButtonText="Cancelar"
      isSubmitting={isSubmitting}
    >
      {error && (
        <motion.div
          className="bg-red-50 text-red-600 p-3 rounded-md mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
      
      {isLoading ? (
        renderLoadingIndicator()
      ) : (
        <>
          {renderFormFields()}
          
          {hasRelacoes && (
            <motion.div 
              className="mt-4 bg-yellow-50 p-4 rounded-md border border-yellow-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start">
                <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-yellow-700 text-sm">
                  Esta obrigação está associada a {obrigacaoCompleta.regimes_tributarios.length} regimes tributários que serão afetados por esta exclusão.
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </BaseForm>
  );
};

export default ExcluirObrigacaoForm;