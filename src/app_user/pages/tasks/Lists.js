import React, { useState } from 'react';
import BaseLayout from '../../../app/BaseLayout';
import Accordion from '../../../app/components/Accordion';

const Listas = () => {
    const [sections, setSections] = useState([
        { 
            id: 'hoje', 
            title: 'Hoje', 
            count: 2, 
            expanded: false, 
            items: [],
            icon: (
                <div className="w-7 h-7 bg-cyan-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
            )
        },
        { 
            id: 'vencidas', 
            title: 'Vencidas', 
            count: 0, 
            expanded: false, 
            items: [],
            icon: (
                <div className="w-7 h-7 bg-red-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            )
        },
        { 
            id: 'avencer', 
            title: 'A Vencer', 
            count: 2, 
            expanded: false, 
            items: [],
            icon: (
                <div className="w-7 h-7 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            )
        }
    ]);

    const toggleSection = (id) => {
        setSections(sections.map(section => 
            section.id === id 
                ? { ...section, expanded: !section.expanded } 
                : section
        ));
    };

    return (
        <BaseLayout>
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-[1.10rem]">Listas</h4>
                <div className="text-sm">
                    <span className="text-gray-600">Sequence</span>
                    <span className="mx-2 text-gray-600">&gt;</span>
                    <span className="text-gray-600">Tarefas</span>
                    <span className="mx-2 text-gray-600">&gt;</span>
                    <span className="text-gray-600">Listas</span>
                </div>
            </div>

            <Accordion 
                sections={sections} 
                onToggleSection={toggleSection} 
                emptyStateMessage="Nenhuma tarefa encontrada." 
                emptyStateSubMessage="Altere as datas de vencimento ou crie novas tarefas." 
            />
        </BaseLayout>
    );
};

export default Listas;