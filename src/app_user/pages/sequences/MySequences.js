import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../../app/BaseLayout';
import Accordion from '../../../app/components/Accordion';
import Button from '../../../app/components/Button';
import Card from '../../../app/components/Card';
import FormMySequence from '../../../app/components/FormMySequence';
import { IoFlashOutline } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";


const MinhasSequencias = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderCardItems = (items) => {
    return items.map((item) => (
      <Card
        key={item.id}
        title={item.title}
        subtitle={item.subtitle}
        count={item.count}
      />
    ));
  };

  const sectionCards = {
    controladoria: [
      {
        id: 1,
        title: 'Solicitações de Suporte',
        subtitle: 'Controladoria',
        count: 46,
      },
    ],
    deploy: [{ id: 1, title: 'Vendas e Negociações', subtitle: 'Deploy e Testes', count: 12 }],
    desenvolvimento: [
      {
        id: 1,
        title: 'Demandas Marketing',
        subtitle: 'Desenvolvimento',
        count: 28,
      },
      { id: 2, title: 'Controle de Desenvolvimento', subtitle: 'Desenvolvimento', count: 34 },
    ],
    marketing: [
      { id: 1, title: 'Demandas Marketing', subtitle: 'Marketing', count: 15 },
    ],
  };

  const [sections, setSections] = useState([
    {
      id: 'controladoria',
      title: 'Controladoria',
      count: 1,
      expanded: false,
      items: renderCardItems(sectionCards.controladoria),
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
    },
    {
      id: 'deploy',
      title: 'Deploy e Testes',
      count: 1,
      expanded: false,
      items: renderCardItems(sectionCards.deploy),
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
    },
    {
      id: 'desenvolvimento',
      title: 'Desenvolvimento',
      count: 2,
      expanded: false,
      items: renderCardItems(sectionCards.desenvolvimento),
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
    },
    {
      id: 'marketing',
      title: 'Marketing',
      count: 1,
      expanded: false,
      items: renderCardItems(sectionCards.marketing),
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
    },
  ]);

  const toggleSection = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, expanded: !section.expanded }
          : section,
      ),
    );
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

  const automationIcon = (

    <IoFlashOutline size={16} />
  );

  const templateIcon = (
    <LuLayoutTemplate size={16} />
  );

  const FormMySequenceFields = [
    {
      id: 'departamento',
      label: 'Qual departamento?',
      type: 'select',
      options: [
        { value: 'controladoria', label: 'Controladoria' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'desenvolvimento', label: 'Desenvolvimento' },
        { value: 'deploy', label: 'Deploy e Testes' }
      ]
    },
    {
      id: 'nome',
      label: 'Nome da Sequência:',
      type: 'select',
      options: [
        { value: 'demandas-marketing', label: 'Demandas Marketing' },
        { value: 'solicitacoes-suporte', label: 'Solicitações de Suporte' },
        { value: 'controle-desenvolvimento', label: 'Controle de Desenvolvimento' },
        { value: 'vendas-negociacoes', label: 'Vendas e Negociações' }
      ]
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

  return (
    <BaseLayout title="Minhas Sequências">
      <div>
        <div className="mb-6 flex space-x-3">
          <Button
            variant="primary"
            className="text-sm py-[0.45rem] px-2 shadow-sm"
            icon={addIcon}
            onClick={() => setIsModalOpen(true)}
          >
            Nova Sequência
          </Button>

          <Button
            variant="outline"
            className="text-sm py-[0.45rem] px-2 shadow-sm"
            icon={automationIcon}
            onClick={() => navigate('/lista-automacoes')}
          >
            Automações
          </Button>

          <Button
            variant="outline"
            className="text-sm py-[0.45rem] px-2 shadow-sm"
            icon={templateIcon}
            onClick={() => navigate('/templates')}
          >
            Templates de Sequência
          </Button>
        </div>
        <Accordion
          sections={sections}
          onToggleSection={toggleSection}
          emptyStateMessage="Nenhum item configurado"
        />

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