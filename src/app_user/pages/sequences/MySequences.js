import React, { useState } from 'react';
import BaseLayout from '../../../app/BaseLayout';
import Accordion from '../../../app/components/Accordion';
import Button from '../../../app/components/Button';
import Card from '../../../app/components/Card';

const MinhasSequencias = () => {
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
        d="M13 10V3L4 14h7v7l9-11h-7z"
      ></path>
    </svg>
  );

  const templateIcon = (
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
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
      ></path>
    </svg>
  );

  return (
    <BaseLayout>
      <div>
        <div className="mb-6 flex space-x-3">
          <Button
            variant="primary"
            className="p-1"
            icon={addIcon}
            onClick={() => console.log('Nova Sequência')}
          >
            Nova Sequência
          </Button>

          <Button
            variant="outline"
            className="p-1"
            icon={automationIcon}
            onClick={() => console.log('Automações')}
          >
            Automações
          </Button>

          <Button
            variant="outline"
            className="p-1"
            icon={templateIcon}
            onClick={() => console.log('Templates de Sequência')}
          >
            Templates de Sequência
          </Button>
        </div>
        <Accordion
          sections={sections}
          onToggleSection={toggleSection}
          emptyStateMessage="Nenhum item configurado"
        />
      </div>
    </BaseLayout>
  );
};

export default MinhasSequencias;
