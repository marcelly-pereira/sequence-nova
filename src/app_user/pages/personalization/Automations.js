import React, { useState } from 'react';
import BaseLayout from '../../../app/BaseLayout';
import Accordion from '../../../app/components/Accordion';

const Automacoes = () => {
  const [sections, setSections] = useState([
    {
      id: 'departamentos',
      title: 'Departamentos',
      count: '4',
      expanded: false,
      icon: (
        <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      ),
      items: []
    },
    {
      id: 'colaboradores',
      title: 'Colaboradores',
      count: '10',
      expanded: false,
      icon: (
        <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      ),
      items: []
    },
    {
      id: 'regimes',
      title: 'Regimes Tributários',
      count: '1',
      expanded: false,
      icon: (
        <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      items: []
    },
    {
      id: 'obrigacoes',
      title: 'Obrigações',
      count: '1',
      expanded: false,
      icon: (
        <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      ),
      items: []
    }
  ]);

  const handleToggleSection = (sectionId) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  return (
    <BaseLayout title="Automações">
      <div className="mx-auto">
        <Accordion
          sections={sections}
          onToggleSection={handleToggleSection}
          emptyStateMessage="Nenhum item cadastrado"
          emptyStateSubMessage="Clique no botão + para adicionar"
        />
      </div>
    </BaseLayout>
  );
};
export default Automacoes;

