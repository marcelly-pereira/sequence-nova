import React, { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BaseForm from '../app/components/BaseForm';
import { Input } from '../app/components/Input';
import ObrigacaoService from '../services/obligations';

const ObrigacaoForm = ({ isOpen, onClose, onSubmit, obrigacaoAtual = null }) => {
  const [formData, setFormData] = useState({
    nome: '',
    mininome: '',
    tempo_previsto_min: 1,
    entrega_janeiro: 'Todo dia 20',
    entrega_fevereiro: 'Todo dia 20',
    entrega_marco: 'Todo dia 20',
    entrega_abril: 'Todo dia 20',
    entrega_maio: 'Todo dia 20',
    entrega_junho: 'Todo dia 20',
    entrega_julho: 'Todo dia 20',
    entrega_agosto: 'Todo dia 20',
    entrega_setembro: 'Todo dia 20',
    entrega_outubro: 'Todo dia 20',
    entrega_novembro: 'Todo dia 20',
    entrega_dezembro: 'Todo dia 20',
    lembrar_responsavel_dias_antes: 3,
    tipo_dias_antes: 'Dias úteis',
    prazos_fixos_dias_nao_uteis: 'Antecipar para o dia útil anterior',
    competencias_referentes: '-1',
    exigir_robo: false,
    passivel_multa: false,
    alerta_guia_nao_lida: true,
    ativa: true,
    quantidade_arquivos_necessarios: 1,
    departamento: '',
    responsavel: ''
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const tiposDiasAntes = ['Dias úteis', 'Dias Corridos'];
  const prazosDiasNaoUteis = ['Antecipar para o dia útil anterior', 'Adiar para o próximo dia útil', 'Manter no dia não útil'];
  const competenciasReferentes = ['Mês atual', 'Mês anterior', 'Dois meses anteriores'];
  const competenciasValores = ['0', '-1', '-2'];
  const opcoesEntrega = [
    'Não Tem',
    'Todo dia 5',
    'Todo dia 10',
    'Todo dia 15',
    'Todo dia 20',
    'Todo dia 25',
    'Último dia útil',
    '1° dia útil',
    '5° dia útil',
    '10° dia útil',
    '15° dia útil'
  ];

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchInitialData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (obrigacaoAtual) {
      setFormData({
        ...obrigacaoAtual,
        departamento: obrigacaoAtual.departamento || '',
        responsavel: obrigacaoAtual.responsavel || ''
      });
    } else {
      resetForm();
    }
  }, [obrigacaoAtual, isOpen]);

  const resetForm = () => {
    setFormData({
      nome: '',
      mininome: '',
      tempo_previsto_min: 1,
      entrega_janeiro: 'Todo dia 20',
      entrega_fevereiro: 'Todo dia 20',
      entrega_marco: 'Todo dia 20',
      entrega_abril: 'Todo dia 20',
      entrega_maio: 'Todo dia 20',
      entrega_junho: 'Todo dia 20',
      entrega_julho: 'Todo dia 20',
      entrega_agosto: 'Todo dia 20',
      entrega_setembro: 'Todo dia 20',
      entrega_outubro: 'Todo dia 20',
      entrega_novembro: 'Todo dia 20',
      entrega_dezembro: 'Todo dia 20',
      lembrar_responsavel_dias_antes: 3,
      tipo_dias_antes: 'Dias úteis',
      prazos_fixos_dias_nao_uteis: 'Antecipar para o dia útil anterior',
      competencias_referentes: '-1',
      exigir_robo: false,
      passivel_multa: false,
      alerta_guia_nao_lida: true,
      ativa: true,
      quantidade_arquivos_necessarios: 1,
      departamento: '',
      responsavel: ''
    });
  };

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const departamentosData = await fetch('https://comercial.sequence.app.br/api/departamentos/');
      const departamentosJson = await departamentosData.json();
      
      const responsaveisData = await fetch('https://comercial.sequence.app.br/api/usuarios/');
      const responsaveisJson = await responsaveisData.json();

      setDepartamentos(departamentosJson.results || []);
      setResponsaveis(responsaveisJson.results || []);
      
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
    setFormData(prev => {
      // Se o campo for 'nome' e o mininome estiver vazio ou for igual ao nome anterior,
      // atualiza o mininome para os primeiros 15 caracteres do novo nome
      if (fieldId === 'nome' && (!prev.mininome || prev.mininome === prev.nome.substring(0, 15))) {
        return {
          ...prev,
          [fieldId]: value,
          mininome: value.substring(0, 15)
        };
      }

      return {
        ...prev,
        [fieldId]: value
      };
    });
  };

  const handleCheckboxChange = (fieldId) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

  const isFormValid = () => {
    return (
      formData.nome.trim() !== '' &&
      formData.departamento !== '' &&
      formData.responsavel !== ''
    );
  };

  const handleSubmit = () => {
    const obrigacaoData = {
      ...formData,
      tempo_previsto_min: parseInt(formData.tempo_previsto_min) || 1,
      lembrar_responsavel_dias_antes: parseInt(formData.lembrar_responsavel_dias_antes) || 3,
      quantidade_arquivos_necessarios: parseInt(formData.quantidade_arquivos_necessarios) || 1
    };

    onSubmit(obrigacaoData);
  };

  const renderLoadingIndicator = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div 
        className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"
      />
      <p className="mt-4 text-sm text-gray-500">Carregando dados...</p>
    </div>
  );

  const formSections = [
    {
      title: 'Informações Básicas',
      fields: [
        {
          id: 'nome',
          label: 'Nome da Obrigação',
          type: 'text',
          placeholder: 'Digite o nome da obrigação',
          required: true
        },
        {
          id: 'mininome',
          label: 'Nome Abreviado',
          type: 'text',
          placeholder: 'Versão curta do nome (máx. 15 caracteres)',
          required: false,
          maxLength: 15
        },
        {
          id: 'departamento',
          label: 'Departamento',
          type: 'select',
          options: departamentos.map(dep => ({
            value: dep.id,
            label: dep.nome
          })),
          required: true
        },
        {
          id: 'responsavel',
          label: 'Responsável',
          type: 'select',
          options: responsaveis.map(resp => ({
            value: resp.id,
            label: resp.nome || resp.username
          })),
          required: true
        },
        {
          id: 'tempo_previsto_min',
          label: 'Tempo Previsto (min)',
          type: 'number',
          min: 1,
          required: true
        },
        {
          id: 'quantidade_arquivos_necessarios',
          label: 'Quantidade de Arquivos Necessários',
          type: 'number',
          min: 1,
          required: true
        }
      ]
    },
    {
      title: 'Configurações',
      fields: [
        {
          id: 'passivel_multa',
          label: 'Passível de Multa',
          type: 'checkbox'
        },
        {
          id: 'exigir_robo',
          label: 'Exigir Robô',
          type: 'checkbox'
        },
        {
          id: 'alerta_guia_nao_lida',
          label: 'Alerta de Guia Não Lida',
          type: 'checkbox'
        },
        {
          id: 'ativa',
          label: 'Obrigação Ativa',
          type: 'checkbox'
        },
        {
          id: 'lembrar_responsavel_dias_antes',
          label: 'Lembrar Responsável (dias antes)',
          type: 'number',
          min: 0,
          required: true
        },
        {
          id: 'tipo_dias_antes',
          label: 'Tipo de Dias Antes',
          type: 'select',
          options: tiposDiasAntes.map(tipo => ({
            value: tipo,
            label: tipo
          })),
          required: true
        },
        {
          id: 'prazos_fixos_dias_nao_uteis',
          label: 'Prazos Fixos em Dias Não Úteis',
          type: 'select',
          options: prazosDiasNaoUteis.map(prazo => ({
            value: prazo,
            label: prazo
          })),
          required: true
        },
        {
          id: 'competencias_referentes',
          label: 'Competências Referentes',
          type: 'select',
          options: competenciasReferentes.map((comp, index) => ({
            value: competenciasValores[index],
            label: comp
          })),
          required: true
        }
      ]
    },
    {
      title: 'Prazos de Entrega',
      fields: [
        {
          id: 'entrega_janeiro',
          label: 'Janeiro',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_fevereiro',
          label: 'Fevereiro',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_marco',
          label: 'Março',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_abril',
          label: 'Abril',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_maio',
          label: 'Maio',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_junho',
          label: 'Junho',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_julho',
          label: 'Julho',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_agosto',
          label: 'Agosto',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_setembro',
          label: 'Setembro',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_outubro',
          label: 'Outubro',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_novembro',
          label: 'Novembro',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        },
        {
          id: 'entrega_dezembro',
          label: 'Dezembro',
          type: 'select',
          options: opcoesEntrega.map(opcao => ({
            value: opcao,
            label: opcao
          })),
          required: true
        }
      ]
    }
  ];

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
            {section.fields.map((field, index) => renderField(field, index, sectionIndex))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderField = (field, index, sectionIndex) => {
    return (
      <motion.div 
        key={field.id} 
        className={`space-y-1 ${
          field.type === 'checkbox' ? 'col-span-1' : 
          field.id.startsWith('entrega_') ? 'col-span-1' : 
          'col-span-1 md:col-span-2'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + sectionIndex * 0.05 + index * 0.02 }}
      >
        {field.type !== 'checkbox' && (
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {field.type === 'text' && (
          <Input
            type="text"
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            maxLength={field.maxLength}
            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
              transition-colors"
          />
        )}

        {field.type === 'number' && (
          <Input
            type="number"
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            min={field.min}
            required={field.required}
            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
              transition-colors"
          />
        )}

        {field.type === 'select' && (
          <select
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
              transition-colors bg-white"
          >
            <option value="">Selecione...</option>
            {field.options && field.options.map((option, optIndex) => (
              <option key={optIndex} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {field.type === 'checkbox' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.id}
              name={field.id}
              checked={formData[field.id] || false}
              onChange={() => handleCheckboxChange(field.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={field.id} className="ml-2 block text-sm text-gray-900">
              {field.label}
            </label>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={obrigacaoAtual ? "Editar Obrigação" : "Criar Obrigação"}
      icon={<FiFileText className="w-6 h-6" />}
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

export default ObrigacaoForm;