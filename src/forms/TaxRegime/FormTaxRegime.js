import React, { useState, useEffect } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BaseForm from '../../app/components/BaseForm';
import { Input } from '../../app/components/Input';
import taxRegimeServices from '../../services/taxRegime';

const RegimeTributarioForm = ({
  isOpen,
  onClose,
  onSubmit,
  regimeAtual = null,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    obrigacoes: [],
    departamentos: [],
  });

  const [obrigacoes, setObrigacoes] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchInitialData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (regimeAtual) {
      setFormData({
        nome: regimeAtual.nome || '',
        obrigacoes: regimeAtual.obrigacoes || [],
        departamentos: regimeAtual.departamentos || [],
      });
    } else {
      setFormData({
        nome: '',
        obrigacoes: [],
        departamentos: [],
      });
    }
  }, [regimeAtual, isOpen]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [obrigacoesMap, departamentosMap] = await Promise.all([
        taxRegimeServices.fetchObrigacoes(),
        taxRegimeServices.fetchDepartamentos(),
      ]);

      const obrigacoesProcessadas = Object.values(obrigacoesMap)
        .filter((item) => item.ativa !== false)
        .sort((a, b) => a.nome.localeCompare(b.nome));
      setObrigacoes(obrigacoesProcessadas);

      const departamentosProcessados = Object.values(departamentosMap)
        .filter((item) => item.ativo !== false)
        .sort((a, b) => a.nome.localeCompare(b.nome));
      setDepartamentos(departamentosProcessados);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Erro ao carregar dados. Por favor, tente novamente.');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const toggleItem = (fieldId, itemId) => {
    setFormData((prev) => {
      const currentValues = prev[fieldId] || [];
      return {
        ...prev,
        [fieldId]: currentValues.includes(itemId)
          ? currentValues.filter((id) => id !== itemId)
          : [...currentValues, itemId],
      };
    });
  };

  const isFormValid = () => {
    return formData.nome.trim() !== '';
  };

  const handleSubmit = () => {
    const regimeData = {
      nome: formData.nome.trim(),
      ativo: true,
      obrigacoes: formData.obrigacoes,
      departamentos: formData.departamentos,
    };

    if (regimeAtual && regimeAtual.id) {
      regimeData.id = regimeAtual.id;
    }

    onSubmit(regimeData);
  };

  const renderLoadingIndicator = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500" />
      <p className="mt-4 text-sm text-gray-500">Carregando dados...</p>
    </div>
  );

  const formFields = [
    {
      id: 'nome',
      label: 'Nome do Regime Tributário',
      type: 'text',
      placeholder: 'Digite o nome do regime tributário',
      required: true,
      helpText: 'Defina o regime tributário',
    },
    {
      id: 'obrigacoes',
      label: 'Obrigações Relacionadas',
      type: 'checkbox-group',
      options: obrigacoes.map((item) => ({
        id: item.id,
        label: item.nome,
      })),
      required: false,
    },
    {
      id: 'departamentos',
      label: 'Departamentos Relacionados',
      type: 'checkbox-group',
      options: departamentos.map((item) => ({
        id: item.id,
        label: item.nome,
      })),
      required: false,
    },
  ];

  const renderFormFields = () => (
    <div className="space-y-6">
      {formFields.map((field, index) => (
        <motion.div
          key={field.id}
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.05 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === 'text' && (
            <>
              <Input
                type="text"
                id={field.id}
                name={field.id}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                  transition-colors"
              />
              {field.helpText && (
                <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
              )}
            </>
          )}

          {field.type === 'checkbox-group' && (
            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2">
              {field.options && field.options.length > 0 ? (
                field.options.map((option, optIndex) => (
                  <motion.div
                    key={option.id}
                    className="flex items-center mb-2 last:mb-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 + optIndex * 0.01 }}
                  >
                    <input
                      type="checkbox"
                      id={`${field.id}-${option.id}`}
                      checked={formData[field.id]?.includes(option.id) || false}
                      onChange={() => toggleItem(field.id, option.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`${field.id}-${option.id}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {option.label}
                    </label>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-2">
                  Nenhum item encontrado
                </p>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={
        regimeAtual ? 'Editar Regime Tributário' : 'Criar Regime Tributário'
      }
      icon={<FiDollarSign className="w-6 h-6" />}
      primaryColor="#1526ff"
      isValid={isFormValid()}
      submitButtonText="Salvar"
      cancelButtonText="Cancelar"
    >
      <div className="max-h-[60vh] overflow-y-auto pr-1">
        {isLoading ? (
          renderLoadingIndicator()
        ) : (
          <>
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

            {renderFormFields()}
          </>
        )}
      </div>
    </BaseForm>
  );
};

export default RegimeTributarioForm;
