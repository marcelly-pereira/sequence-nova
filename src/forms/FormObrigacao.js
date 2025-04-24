import React, { useState, useEffect, useMemo } from 'react';
import { FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BaseForm from '../app/components/BaseForm';
import { Input } from '../app/components/Input';
import ObrigacaoService from '../services/obligations';

// Separate configuration into its own file/module
const FORM_OPTIONS = {
  departamentos: [
    { value: 'fiscal', label: 'Fiscal' },
    { value: 'contabil', label: 'Contábil' },
    { value: 'dp', label: 'DP' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'sucessoCliente', label: 'Sucesso do Cliente' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'recursosHumanos', label: 'Recursos Humanos' },
    { value: 'legalizacao', label: 'Legalização' },
    { value: 'gestaoRiscos', label: 'Gestão de Riscos' },
    { value: 'padrao', label: 'Padrão' }
  ],
  
  responsaveis: [
    { value: 'mariaFernanda', label: 'Maria Fernanda | Gestão & Contabilidade (Assistente)' },
    { value: 'erikaFernanda', label: 'Erika Fernanda | Gestão & Contabilidade (Gerente)' },
    { value: 'fernandoLima', label: 'Fernando Lima | Gestão & Contabilidade (Gerente)' },
    { value: 'miguelLucas', label: 'Miguel Lucas | Gestão & Contabilidade (Diretor)' }
  ],
  
  prazos_entrega: [
    { value: '', label: '--------- ' },
    { value: 'naoTem', label: 'Não tem' },
    ...['1DiaUtil', '2DiaUtil', '3DiaUtil', '4DiaUtil', '5DiaUtil', 
        '6DiaUtil', '7DiaUtil', '8DiaUtil', '9DiaUtil', '10DiaUtil', 
        '11DiaUtil', '12DiaUtil', '13DiaUtil', '14DiaUtil', '15DiaUtil', 
        '16DiaUtil', '17DiaUtil', '18DiaUtil', '19DiaUtil', '20DiaUtil']
      .map(value => ({ value, label: value.replace('DiaUtil', '° dia útil') })),
    { value: 'ultimoDiaUtil', label: 'Último dia útil' },
    ...Array.from({length: 31}, (_, i) => ({
      value: `todoDia${i+1}`, 
      label: `Todo dia ${i+1 < 10 ? '0' : ''}${i+1}`
    }))
  ],
  
  dias_antes: Array.from({length: 181}, (_, i) => ({
    value: `${i}`, 
    label: `${i} dias antes`
  })),
  
  tipos_dias: [
    { value: 'diasUteis', label: 'Dias úteis' },
    { value: 'diasCorridos', label: 'Dias corridos' }
  ],
  
  opcoes_dias_nao_uteis: [
    { value: 'antecipar', label: 'Antecipar para o dia útil anterior' },
    { value: 'postergar', label: 'Postergar para o dia útil seguinte' },
    { value: 'manter', label: 'Manter dia exato' }
  ],
  
  competencias: [
    { value: 'mesAnterior', label: 'Mês anterior' },
    { value: '2MesesAntes', label: '2 meses antes' },
    { value: '3MesesAntes', label: '3 meses antes' },
    { value: 'anoAnterior', label: 'Ano anterior' },
    { value: 'anoAtual', label: 'Ano atual' },
    { value: 'mesAtual', label: 'Mês atual' },
    { value: 'mesSeguinte', label: 'Mês seguinte' }
  ]
};

// Initial form state as a separate constant
const INITIAL_FORM_STATE = {
  nome: '',
  mininome: '',
  tempo_previsto_min: null,
  entrega_janeiro: null,
  entrega_fevereiro: null,
  entrega_marco: null,
  entrega_abril: null,
  entrega_maio: null,
  entrega_junho: null,
  entrega_julho: null,
  entrega_agosto: null,
  entrega_setembro: null,
  entrega_outubro: null,
  entrega_novembro: null,
  entrega_dezembro: null,
  lembrar_responsavel_dias_antes: null,
  tipo_dias_antes: null,
  prazos_fixos_dias_nao_uteis: null,
  competencias_referentes: null,
  exigir_robo: false,
  passivel_multa: false,
  alerta_guia_nao_lida: false,
  ativa: false,
  quantidade_arquivos_necessarios: null,
  departamento: null,
  responsavel: null
};

const ObrigacaoForm = ({ isOpen, onClose, onSubmit, obrigacaoAtual = null }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Memoize form sections to avoid unnecessary recalculations
  const formSections = useMemo(() => {
    const months = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 
                    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    return [
      {
        title: 'Informações Básicas',
        fields: [
          { id: 'nome', label: 'Nome da Atividade', type: 'text', required: true },
          { id: 'mininome', label: 'Nome Abreviado', type: 'text', maxLength: 15 },
          { 
            id: 'departamento', 
            label: 'Departamento Responsável', 
            type: 'select', 
            options: FORM_OPTIONS.departamentos, 
            required: true 
          },
          { 
            id: 'responsavel', 
            label: 'Responsável pela Atividade', 
            type: 'select', 
            options: FORM_OPTIONS.responsaveis, 
            required: true 
          },
          { 
            id: 'tempo_previsto_min', 
            label: 'Tempo Previsto (em minutos)', 
            type: 'number', 
            min: 0, 
            required: true 
          },
        ],
      },
      {
        title: 'Prazos de Entrega',
        fields: months.map((mes) => ({
          id: `entrega_${mes}`,
          label: `Entrega - ${mes.charAt(0).toUpperCase() + mes.slice(1)}`,
          type: 'select',
          options: FORM_OPTIONS.prazos_entrega,
          required: true,
        })),
      },
      {
        title: 'Configurações',
        fields: [
          { 
            id: 'lembrar_responsavel_dias_antes', 
            label: 'Avisar Responsável (dias antes)', 
            type: 'select', 
            options: FORM_OPTIONS.dias_antes, 
            required: true 
          },
          { 
            id: 'tipo_dias_antes', 
            label: 'Tipo de Contagem de Dias', 
            type: 'select', 
            options: FORM_OPTIONS.tipos_dias, 
            required: true 
          },
          { 
            id: 'prazos_fixos_dias_nao_uteis', 
            label: 'Permitir Prazos Fixos em Finais de Semana/Feriados', 
            type: 'select', 
            options: FORM_OPTIONS.opcoes_dias_nao_uteis, 
            required: true 
          },
          { 
            id: 'competencias_referentes', 
            label: 'Competências Associadas', 
            type: 'select', 
            options: FORM_OPTIONS.competencias, 
            required: true 
          },
          { id: 'exigir_robo', label: 'Automação Obrigatória', type: 'checkbox' },
          { id: 'passivel_multa', label: 'Sujeito a Multa', type: 'checkbox' },
          { id: 'alerta_guia_nao_lida', label: 'Exibir Alerta para Guia Não Lida', type: 'checkbox' },
          { id: 'ativa', label: 'Atividade Ativa', type: 'checkbox' },
        ],
      },
    ];
  }, []);

  // Effect to set initial form data when component opens or when obrigacaoAtual changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      
      // If editing an existing obligation, set its data
      if (obrigacaoAtual) {
        setFormData(obrigacaoAtual);
      } else {
        // Otherwise reset to initial state
        setFormData(INITIAL_FORM_STATE);
      }
      
      // Simulate data loading (remove if using actual data fetching)
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, obrigacaoAtual]);

  // Handler for input changes
  const handleChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (fieldId) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  // Form validation
  const isFormValid = () => {
    return formData.nome && formData.departamento && formData.responsavel;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!isFormValid()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = obrigacaoAtual
        ? await ObrigacaoService.atualizarObrigacao(obrigacaoAtual.id, formData)
        : await ObrigacaoService.cadastrarObrigacao(formData);

      onSubmit(result);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar obrigação:', error);
      setError(`Erro ao ${obrigacaoAtual ? 'atualizar' : 'cadastrar'} obrigação: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render individual form field
  const renderField = (field) => {
    if (field.type === 'checkbox') {
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={field.id}
            checked={formData[field.id] || false}
            onChange={() => handleCheckboxChange(field.id)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={field.id} className="ml-2 block text-sm text-gray-900">
            {field.label}
          </label>
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <select
          id={field.id}
          value={formData[field.id] || ''}
          onChange={(e) => handleChange(field.id, e.target.value)}
          required={field.required}
          className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 transition-colors bg-white"
        >
          <option value="">Selecione uma opção</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <Input
        type={field.type}
        id={field.id}
        value={formData[field.id] || ''}
        onChange={(e) => handleChange(field.id, e.target.value)}
        placeholder={`Digite ${field.label}`}
        required={field.required}
        className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 transition-colors"
      />
    );
  };

  // Render form fields with sections
  const renderFormFields = () => (
    <div className="space-y-8">
      {formSections.map((section, sectionIndex) => (
        <motion.div
          key={`section-${sectionIndex}`}
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + sectionIndex * 0.05 }}
        >
          <h3 className="text-md font-medium text-gray-700 border-b pb-2">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={obrigacaoAtual ? "Editar Obrigação" : "Criar Obrigação"}
      icon={<FiFileText className="w-6 h-6" />}
      primaryColor="#a855f7"
      isValid={!isSubmitting && isFormValid()}
      submitButtonText={isSubmitting ? 'Salvando...' : 'Salvar'}
    >
      {isLoading ? (
        <div className="text-center text-gray-500">Carregando...</div>
      ) : (
        <>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {renderFormFields()}
        </>
      )}
    </BaseForm>
  );

}
export default ObrigacaoForm;