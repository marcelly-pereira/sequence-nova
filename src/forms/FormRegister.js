import React, { useState } from 'react';
import BaseForm from '../../app/components/BaseForm';
import { motion } from 'framer-motion';
import SelectResponsible from '../components/SelectResponsible'; 
import { Input } from '../components/Input';
import { Select } from '../components/Select';

const RegistroForm = ({ isOpen, onClose, onSubmit, mode, registro }) => {
  const formTitle =
    mode === 'create' ? 'Adicionar Registro' : 'Editar Registro';

  const [selectedTipo, setSelectedTipo] = useState(
    registro?.canal || 'Ligação',
  );

  const responsavelOptions = [
    { value: 'andre-anjos', label: 'André Anjos' },
    { value: 'milena-uchoa', label: 'Milena Uchôa' },
    { value: 'paulo-silva', label: 'Paulo Silva' },
    { value: 'marcelly-pereira', label: 'Marcelly Pereira' },
    { value: 'felipe-mesquita', label: 'Felipe Mesquita' },
    { value: 'admin-sequence', label: 'Admin Sequence' },
    { value: 'pedro-assuncao', label: 'Pedro Assunção' },
    { value: 'joao-silva', label: 'João Silva' },
    { value: 'elivelton-bouteille', label: 'Elivelton Bouteille' },
    { value: 'nathalia-leal', label: 'Nathalia Leal' },
    { value: 'bruno-nunes', label: 'Bruno Nunes' },
  ];

  const formFields = [
    {
      id: 'tipo',
      label: 'Tipo de Registro',
      type: 'custom',
      required: true,
      value: selectedTipo,
    },
    {
      id: 'responsavel',
      label: 'Responsável',
      type: 'customSelect',
      required: true,
      options: responsavelOptions,
      initialValue: registro?.responsavel ? [registro.responsavel] : [],
    },
    {
      id: 'departamento',
      label: 'Departamento',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Selecione um departamento' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Financeiro', label: 'Financeiro' },
        { value: 'Vendas', label: 'Vendas' },
        { value: 'Recursos Humanos', label: 'Recursos Humanos' },
      ],
      initialValue: registro?.departamento || '',
    },
    {
      id: 'assunto',
      label: 'Assunto',
      type: 'select',
      required: false,
      options: [
        { value: '', label: 'Selecione um assunto' },
        { value: 'Orçamento', label: 'Orçamento' },
        { value: 'Suporte', label: 'Suporte' },
        { value: 'Informações', label: 'Informações' },
        { value: 'Reclamação', label: 'Reclamação' },
      ],
      initialValue: registro?.assunto || '',
    },
    {
      id: 'comentarios',
      label: 'Comentários',
      type: 'textarea',
      required: false,
      placeholder: 'Adicione seus comentários aqui...',
      initialValue: registro?.registro || '',
    },
  ];

  const [formData, setFormData] = useState(() => {
    const initialData = {};
    formFields.forEach((field) => {
      if (field.id === 'tipo') {
        initialData[field.id] = selectedTipo;
      } else if (field.id === 'responsavel') {
        initialData[field.id] = field.initialValue;
      } else if (field.initialValue !== undefined) {
        initialData[field.id] = field.initialValue;
      }
    });
    return initialData;
  });

  const handleChange = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: value,
    });
  };

  const handleTipoSelect = (tipo) => {
    setSelectedTipo(tipo);
    handleChange('tipo', tipo);
  };

  const isFormValid = () => {
    const requiredFields = formFields.filter((field) => field.required);
    for (const field of requiredFields) {
      if (field.id === 'tipo') {
        if (!selectedTipo) return false;
      } else if (field.id === 'responsavel') {
        if (!formData[field.id] || formData[field.id].length === 0)
          return false;
      } else if (!formData[field.id]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    const responsavelPrincipal =
      formData.responsavel && formData.responsavel.length > 0
        ? formData.responsavel[0]
        : '';

    onSubmit({
      ...formData,
      canal: selectedTipo,
      registro: formData.comentarios,
      responsavel: responsavelPrincipal, 
    });
  };

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={formTitle}
      primaryColor="#1976D2"
      submitButtonText="Salvar"
      cancelButtonText="Fechar"
      isValid={isFormValid()}
    >
      {formFields.map((field, index) => (
        <motion.div
          key={field.id}
          className="space-y-2 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.05 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.id === 'tipo' && (
            <div className="grid grid-cols-5 gap-0 border rounded-md overflow-hidden">
              <motion.button
                type="button"
                className={`py-3 flex flex-col items-center justify-center border-r ${
                  selectedTipo === 'Ligação'
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTipoSelect('Ligação')}
                whileHover={{
                  backgroundColor: selectedTipo === 'Ligação' ? '' : '#f9fafb',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5 mb-1"
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
                <span className="text-xs">Ligação</span>
              </motion.button>
              <motion.button
                type="button"
                className={`py-3 flex flex-col items-center justify-center border-r ${
                  selectedTipo === 'E-mail'
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTipoSelect('E-mail')}
                whileHover={{
                  backgroundColor: selectedTipo === 'E-mail' ? '' : '#f9fafb',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs">E-mail</span>
              </motion.button>
              <motion.button
                type="button"
                className={`py-3 flex flex-col items-center justify-center border-r ${
                  selectedTipo === 'WhatsApp'
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTipoSelect('WhatsApp')}
                whileHover={{
                  backgroundColor: selectedTipo === 'WhatsApp' ? '' : '#f9fafb',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-xs">WhatsApp</span>
              </motion.button>
              <motion.button
                type="button"
                className={`py-3 flex flex-col items-center justify-center border-r ${
                  selectedTipo === 'Presencial'
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTipoSelect('Presencial')}
                whileHover={{
                  backgroundColor:
                    selectedTipo === 'Presencial' ? '' : '#f9fafb',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-xs">Presencial</span>
              </motion.button>
              <motion.button
                type="button"
                className={`py-3 flex flex-col items-center justify-center ${
                  selectedTipo === 'Online'
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTipoSelect('Online')}
                whileHover={{
                  backgroundColor: selectedTipo === 'Online' ? '' : '#f9fafb',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs">Online</span>
              </motion.button>
            </div>
          )}

          {field.type === 'customSelect' && field.id === 'responsavel' && (
            <SelectResponsible
              id={field.id}
              name={field.id}
              label=""
              value={formData[field.id] || []}
              onChange={(value) => handleChange(field.id, value)}
              required={field.required}
              options={field.options}
              placeholder="Selecionar responsável"
            />
          )}

          {field.type === 'select' && (
            <Select
              id={field.id}
              name={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
              options={field.options}
            />
          )}

          {field.type === 'textarea' && (
            <Input
              type="textarea"
              id={field.id}
              name={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
            />
          )}
        </motion.div>
      ))}
    </BaseForm>
  );
};

export default RegistroForm;
