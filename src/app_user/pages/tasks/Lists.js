import React, { useState } from 'react';
import BaseLayout from '../../../app/BaseLayout';

const Listas = () => {
    const [sections, setSections] = useState([
        { id: 'hoje', title: 'Hoje', count: 0, expanded: false, tasks: [] },
        { id: 'vencidas', title: 'Vencidas', count: 0, expanded: false, tasks: [] },
        { id: 'avencer', title: 'A Vencer', count: 0, expanded: false, tasks: [] }
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

            <div className="bg-white rounded-lg shadow">
                {sections.map((section, index) => (
                    <div key={section.id} className={index > 0 ? "border-t border-gray-200" : ""}>
                        <div 
                            className="flex items-center p-3 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleSection(section.id)}
                        >
                            <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-2 ${
                                section.id === 'hoje' ? 'bg-cyan-500' : 
                                section.id === 'vencidas' ? 'bg-red-500' : 
                                'bg-yellow-500'
                            }`}>
                                {section.id === 'hoje' && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                )}
                                {section.id === 'vencidas' && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                )}
                                {section.id === 'avencer' && (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                )}
                            </div>
                            <span className="text-gray-800 font-medium">{section.title}</span>
                            <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{section.count}</span>
                            <div className="ml-auto">
                                <svg 
                                    className={`w-5 h-5 text-gray-400 transform transition-transform ${section.expanded ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                        
                        {section.expanded && (
                            <div className="p-6 border-t border-gray-100">
                                {section.tasks.length === 0 ? (
                                    <div className="text-center py-10">
                                        <p className="text-gray-700 font-medium mb-2">Nenhuma tarefas encontrada.</p>
                                        <p className="text-gray-600">Altere as datas de vencimento ou crie novas tarefas.</p>
                                    </div>
                                ) : (
                                    <ul>
                                        {section.tasks.map(task => (
                                            <li key={task.id}>{task.title}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </BaseLayout>
    );
};

export default Listas;