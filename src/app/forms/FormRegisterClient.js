import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/Input';
import { Select } from '../components/Select'; 
import Button from '../components/Button';
import SelectResponsible from '../components/SelectResponsible';
const BaseFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  children, 
  primaryColor = '#0052cc', 
  isValid = true,
  submitButtonText = 'Salvar',
  cancelButtonText = 'Cancelar'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="relative w-11/12 max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Evita que cliques no modal fechem o modal
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div 
              className="px-6 py-4 flex justify-between items-center"
              style={{ borderColor: `${primaryColor}20` }}
            >
              <h2 className="text-lg font-medium text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-4 max-h-[calc(80vh-120px)] overflow-y-auto">
              {children}
            </div>
            
            <div className="px-6 py-4 flex justify-end items-center bg-gray-50">
              <div className="mr-2">
                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="py-2"
                >
                  {cancelButtonText}
                </Button>
              </div>
              
              <div>
                <Button 
                  variant="primary"
                  onClick={onSubmit}
                  disabled={!isValid}
                  className={`py-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitButtonText}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FormRegister = ({ 
  isOpen, 
  onClose, 
  onSave, 
  primaryColor = '#0052cc'
}) => {
  const [formData, setFormData] = useState({
    responsavel: [],
    cnpj: '',
    regimeTributario: '',
    nomeFantasia: '',
    razaoSocial: '',
    cidade: '',
    uf: '',
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    bairro: '',
    nire: '',
    fones: '',
    email: '',
    inscricaoMunicipal: '',
    inscricaoEstadual: '',
    dataInscricaoEstadual: '',
    comentarios: ''
  });

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
    { value: 'bruno-nunes', label: 'Bruno Nunes' }
  ];

  const regimeTributarioOptions = [
    { value: 'simples-nacional', label: 'Simples Nacional' },
    { value: 'teste', label: '(Teste)' },
    { value: 'teste-b', label: 'teste b' }
  ];

  const ufOptions = [
    { value: 'AC', label: 'AC' }, { value: 'AL', label: 'AL' },
    { value: 'AP', label: 'AP' }, { value: 'AM', label: 'AM' },
    { value: 'BA', label: 'BA' }, { value: 'CE', label: 'CE' },
    { value: 'DF', label: 'DF' }, { value: 'ES', label: 'ES' },
    { value: 'GO', label: 'GO' }, { value: 'MA', label: 'MA' },
    { value: 'MT', label: 'MT' }, { value: 'MS', label: 'MS' },
    { value: 'MG', label: 'MG' }, { value: 'PA', label: 'PA' },
    { value: 'PB', label: 'PB' }, { value: 'PR', label: 'PR' },
    { value: 'PE', label: 'PE' }, { value: 'PI', label: 'PI' },
    { value: 'RJ', label: 'RJ' }, { value: 'RN', label: 'RN' },
    { value: 'RS', label: 'RS' }, { value: 'RO', label: 'RO' },
    { value: 'RR', label: 'RR' }, { value: 'SC', label: 'SC' },
    { value: 'SP', label: 'SP' }, { value: 'SE', label: 'SE' },
    { value: 'TO', label: 'TO' }
  ];

  const requiredFields = [
    'responsavel', 
    'cnpj', 
    'nomeFantasia', 
    'razaoSocial',
    'email'
  ];

  const handleChange = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: value
    });
  };

  const isFormValid = () => {
    if (requiredFields.includes('responsavel') && formData.responsavel.length === 0) {
      return false;
    }
    
    return requiredFields.filter(field => field !== 'responsavel')
      .every(field => formData[field]);
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const formatCNPJ = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .substring(0, 9);
  };

  const formatPhone = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 11) {
      return value
        .replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
        .substring(0, 15);
    } else {
      return value
        .replace(/^(\d{2})(\d{4,5})(\d{4}).*/, '($1) $2-$3');
    }
  };

  const fields = [
    {
      id: 'responsavel',
      label: 'Responsável',
      type: 'multiselect',
      required: true
    },
    {
      id: 'cnpj',
      label: 'CNPJ',
      type: 'text',
      required: true,
      mask: formatCNPJ
    },
    {
      id: 'regimeTributario',
      label: 'Regime Tributário',
      type: 'select'
    },
    {
      id: 'nomeFantasia',
      label: 'Nome Fantasia',
      type: 'text',
      required: true
    },
    {
      id: 'razaoSocial',
      label: 'Razão Social',
      type: 'text',
      required: true
    },
    {
      id: 'cidade',
      label: 'Cidade',
      type: 'text'
    },
    {
      id: 'uf',
      label: 'UF',
      type: 'select'
    },
    {
      id: 'endereco',
      label: 'Endereço',
      type: 'text'
    },
    {
      id: 'numero',
      label: 'Número',
      type: 'text'
    },
    {
      id: 'complemento',
      label: 'Complemento',
      type: 'text'
    },
    {
      id: 'cep',
      label: 'CEP',
      type: 'text',
      mask: formatCEP
    },
    {
      id: 'bairro',
      label: 'Bairro',
      type: 'text'
    },
    {
      id: 'nire',
      label: 'NIRE',
      type: 'text'
    },
    {
      id: 'fones',
      label: 'Fones',
      type: 'text',
      mask: formatPhone
    },
    {
      id: 'email',
      label: 'Email',
      type: 'text',
      required: true
    },
    {
      id: 'inscricaoMunicipal',
      label: 'Inscrição Municipal',
      type: 'text'
    },
    {
      id: 'inscricaoEstadual',
      label: 'Inscrição Estadual',
      type: 'text'
    },
    {
      id: 'dataInscricaoEstadual',
      label: 'Data Inscrição Estadual',
      type: 'date'
    },
    {
      id: 'comentarios',
      label: 'Comentários',
      type: 'textarea'
    }
  ];

  const renderFormFields = () => {
    const personalInfo = fields.slice(0, 5);
    const addressInfo = fields.slice(5, 12);
    const contactInfo = fields.slice(12, 15);
    const fiscalInfo = fields.slice(15, 18);
    const additionalInfo = fields.slice(18);

    return (
      <>
        <div className="mb-4 pb-2">
          <h3 className="text-md font-medium text-gray-700">Dados do Cliente</h3>
        </div>
        {renderFormSection(personalInfo)}
        
        <div className="mt-6 mb-4 pb-2">
          <h3 className="text-md font-medium text-gray-700">Endereço</h3>
        </div>
        {renderFormSection(addressInfo)}
        
        <div className="mt-6 mb-4 pb-2">
          <h3 className="text-md font-medium text-gray-700">Contato</h3>
        </div>
        {renderFormSection(contactInfo)}
        
        <div className="mt-6 mb-4 pb-2">
          <h3 className="text-md font-medium text-gray-700">Informações Fiscais</h3>
        </div>
        {renderFormSection(fiscalInfo)}
        
        <div className="mt-6 mb-4 pb-2">
          <h3 className="text-md font-medium text-gray-700">Informações Adicionais</h3>
        </div>
        {renderFormSection(additionalInfo)}
      </>
    );
  };

  const renderFormSection = (sectionFields) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionFields.map((field, index) => renderField(field, index))}
      </div>
    );
  };

  const renderField = (field, index) => {
    const fullWidth = ['comentarios'].includes(field.id) ? 'md:col-span-2' : '';
    
    return (
      <motion.div 
        key={field.id} 
        className={`space-y-2 ${fullWidth}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + index * 0.05 }}
      >
        {field.type === 'multiselect' && field.id === 'responsavel' && (
          <SelectResponsible
            id={field.id}
            name={field.id}
            label={field.label}
            value={formData[field.id] || []}
            onChange={(value) => handleChange(field.id, value)}
            required={field.required}
            options={responsavelOptions}
          />
        )}
        
        {field.type === 'select' && (
          <Select
            id={field.id}
            name={field.id}
            label={field.label}
            value={formData[field.id] || ''}
            onChange={(value) => handleChange(field.id, value)}
            required={field.required}
            options={
              field.id === 'regimeTributario' 
                ? regimeTributarioOptions 
                : field.id === 'uf' 
                  ? ufOptions 
                  : []
            }
            placeholder="Selecione"
          />
        )}
        
        {field.type === 'text' && (
          <Input
            id={field.id}
            name={field.id}
            label={field.label}
            type="text"
            value={formData[field.id] || ''}
            onChange={(e) => {
              const value = field.mask ? field.mask(e.target.value) : e.target.value;
              handleChange(field.id, value);
            }}
            placeholder={field.placeholder}
            required={field.required}
          />
        )}

        {field.type === 'date' && (
          <Input
            id={field.id}
            name={field.id}
            label={field.label}
            type="date"
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
          />
        )}
        
        {field.type === 'textarea' && (
          <Input
            id={field.id}
            name={field.id}
            label={field.label}
            type="textarea"
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
          />
        )}
      </motion.div>
    );
  };

  return (
    <BaseFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Novo Cliente"
      primaryColor={primaryColor}
      isValid={isFormValid()}
      submitButtonText="Cadastrar"
      cancelButtonText="Cancelar"
    >
      {renderFormFields()}
    </BaseFormModal>
  );
};

export default FormRegister;