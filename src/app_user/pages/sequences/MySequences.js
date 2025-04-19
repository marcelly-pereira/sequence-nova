import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../../app/BaseLayout';
import Accordion from '../../../app/components/Accordion';
import Button from '../../../app/components/Button';
import { AnimatedExpandingButton } from '../../../app/components/Button';
import FormMySequence from '../../../forms/FormMySequence';
import { IoFlashOutline } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { fetchDepartamentos, fetchSequencias } from '../../../services/mysequences';
import Card from '../../../app/components/Card';

const MinhasSequencias = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [sequencias, setSequencias] = useState([]);
  const [sections, setSections] = useState([]);
  const [loadingStates, setLoadingStates] = useState({
    departamentos: true,
    sequencias: true
  });
  const [error, setError] = useState(null);

  const isAllLoaded = () => {
    return !Object.values(loadingStates).some(state => state === true);
  };

  const agruparSequenciasPorDepartamento = (sequencias, departamentos) => {
    const departamentosMap = {};
    departamentos.forEach(dep => {
      departamentosMap[dep.id] = dep.nome || dep.departamento || 'Departamento Desconhecido';
    });
    
    const grupos = {};
    
    sequencias.forEach(seq => {
      const depNome = departamentosMap[seq.departamento] || seq.departamento || 'Outros';
      
      if (!grupos[depNome]) {
        grupos[depNome] = [];
      }
      
      grupos[depNome].push(seq);
    });
    
    return grupos;
  };

  useEffect(() => {
    const getDepartamentos = async () => {
      try {
        const data = await fetchDepartamentos();
        setDepartamentos(data);
        
        setLoadingStates(prev => ({
          ...prev,
          departamentos: false
        }));
      } catch (error) {
        console.error('Erro ao buscar departamentos:', error);
        setError(error.message);
        setLoadingStates(prev => ({
          ...prev,
          departamentos: false
        }));
      }
    };

    const getSequencias = async () => {
      try {
        const data = await fetchSequencias();
        setSequencias(data);
        
        setLoadingStates(prev => ({
          ...prev,
          sequencias: false
        }));
      } catch (error) {
        console.error('Erro ao buscar sequências:', error);
        setError(error.message);
        setLoadingStates(prev => ({
          ...prev,
          sequencias: false
        }));
      }
    };

    getDepartamentos();
    getSequencias();
  }, []);

  useEffect(() => {
    if (isAllLoaded() && !error) {
      const sequenciasPorDepartamento = agruparSequenciasPorDepartamento(sequencias, departamentos);
      
      const newSections = Object.keys(sequenciasPorDepartamento).map(depNome => {
        const depSequencias = sequenciasPorDepartamento[depNome];
        
        return {
          id: depNome,
          title: depNome,
          count: depSequencias.length,
          expanded: false,
          items: depSequencias.map(seq => (
            <Card 
              key={seq.id}
              title={seq.nome}
              subtitle={depNome}
              count={0}
              onClick={() => handleCardClick(seq.id)}
              className="h-auto min-h-[160px]"
            />
          )),
          icon: (
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
          ),
        };
      });
      
      setSections(newSections);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingStates, error, sequencias, departamentos]);

  const toggleSection = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, expanded: !section.expanded }
          : section,
      ),
    );
  };

  const handleCardClick = (sequenciaId) => {
    console.log(`Sequência clicada: ${sequenciaId}`);
    // Aqui você pode navegar para uma página de detalhes da sequência
    // navigate(`/sequencias/${sequenciaId}`);
  };

  const addIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
  );

  const customAutomationIcon = (
    <div className="w-full h-full text-white transition-all duration-200 ease-in-out group-hover:text-[#0056d6] group-focus:text-[#0056d6]">
      <IoFlashOutline className="w-full h-full" />
    </div>
  );

  const customTemplateIcon = (
    <div className="w-full h-full text-white transition-all duration-200 ease-in-out group-hover:text-[#0056d6] group-focus:text-[#0056d6]">
      <LuLayoutTemplate className="w-full h-full" />
    </div>
  );

  const FormMySequenceFields = [
    {
      id: 'departamento',
      label: 'Qual departamento?',
      type: 'select',
      options: !isAllLoaded() 
        ? [{ value: '', label: 'Carregando...' }]
        : departamentos.map(dep => ({ 
            value: dep.id.toString(), 
            label: dep.nome || dep.departamento || 'Departamento ' + dep.id
          }))
    },
    {
      id: 'nome',
      label: 'Nome da Sequência:',
      type: 'text',
      required: true
    },
    {
      id: 'cor',
      label: 'Cor da Sequência:',
      type: 'color',
      required: true
    }
  ];

  const handleSaveFormMySequence = (data) => {
    console.log('Dados salvos:', data);
    setIsModalOpen(false);
  };

  if (!isAllLoaded()) {
    return (
      <BaseLayout title="Minhas Sequências">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout title="Minhas Sequências">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Erro ao carregar dados: {error}</p>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Minhas Sequências">
      <div>
        <div className="mb-6 flex space-x-2">
          <Button
            variant="primary"
            className="text-sm py-[0.45rem] px-4 shadow-sm"
            icon={addIcon}
            onClick={() => setIsModalOpen(true)}
          >
            Nova Sequência
          </Button>

          <AnimatedExpandingButton
            onClick={() => navigate('/lista-automacoes')}
            text="Automações"
            icon={customAutomationIcon}
            className="border-[1px] border-[#0056d6]"
          />

          <AnimatedExpandingButton
            onClick={() => navigate('/templates')}
            text="Templates de Sequência"
            icon={customTemplateIcon}
            className="border-[1px] border-[#0056d6]"
          />
        </div>
        
        {sections.length > 0 ? (
          <Accordion
            sections={sections}
            onToggleSection={toggleSection}
            emptyStateMessage="Nenhuma sequência encontrada neste departamento."
            emptyStateSubMessage="Clique em 'Nova Sequência' para criar uma."
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma sequência encontrada.</p>
            <p>Clique em "Nova Sequência" para criar uma.</p>
          </div>
        )}

        <FormMySequence
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveFormMySequence}
          title="Nova Sequência"
          fields={FormMySequenceFields}
          primaryColor="#0052cc"
        />
      </div>
    </BaseLayout>
  );
};

export default MinhasSequencias;