import React, { useState, useEffect } from 'react';
import BaseLayout from '../../../app/BaseLayout';
import { FiSearch } from 'react-icons/fi';
import TemplateCard, { GridIcon, DocumentIcon } from '../../../app/components/TemplateCard';

const TemplatesSequencia = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [templates, setTemplates] = useState([
        {
            id: 1,
            title: "Solicitações de Suporte",
            icon: <DocumentIcon />,
            department: "Controladoria"
        },
        {
            id: 2,
            title: "Campanhas de Marketing",
            icon: <DocumentIcon />,
            department: "Marketing"
        },
        {
            id: 3,
            title: "Relatórios Contábeis",
            icon: <DocumentIcon />,
            department: "Contabil"
        },
        {
            id: 4,
            title: "Planejamento Comercial",
            icon: <DocumentIcon />,
            department: "Comercial"
        },
        {
            id: 5,
            title: "Análises Fiscais",
            icon: <DocumentIcon />,
            department: "Fiscal"
        },
        {
            id: 6,
            title: "Processos Legais",
            icon: <DocumentIcon />,
            department: "Legal"
        },
        {
            id: 7,
            title: "Gestão Administrativa",
            icon: <DocumentIcon />,
            department: "Administrativo"
        },
        {
            id: 8,
            title: "Projetos de Desenvolvimento",
            icon: <DocumentIcon />,
            department: "Desenvolvimento"
        },
        {
            id: 9,
            title: "Fluxo de Deploy e Testes",
            icon: <DocumentIcon />,
            department: "Deploy e Testes"
        }
    ]);

    const departments = [...new Set(templates.map(template => template.department))];
    
    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            template.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment ? template.department === selectedDepartment : true;
        
        return matchesSearch && matchesDepartment;
    });

    const departmentCounts = departments.reduce((acc, department) => {
        acc[department] = templates.filter(t => t.department === department).length;
        return acc;
    }, {});

    const handleCreateTemplate = () => {
        console.log('Criar novo template');
    };

    const handleUseTemplate = (templateName) => {
        console.log(`Usar template: ${templateName}`);
    };

    const handleDepartmentClick = (department) => {
        if (selectedDepartment === department) {
            setSelectedDepartment(null);
        } else {
            setSelectedDepartment(department);
        }
    };

    return (
        <BaseLayout title="Lista de Templates">
            <div className="p-3 bg-white rounded-2xl shadow-sm border-gray-200 min-h-screen">
                <div className="mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                        <div className="flex sm:mr-4 items-center w-full">
                            <input
                                type="text"
                                placeholder="Pesquisar templates ou departamentos"
                                className="text-sm px-4 py-2 border border-gray-300 rounded-md 
                                    focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                                    transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="ml-2 text-gray-500">
                                <FiSearch size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-56 mb-6 md:mb-0">
                            <div className="bg-white rounded-lg border p-2 w-full">
                                <h2 className="font-bold text-md text-gray-800 mb-4">Departamento</h2>
                                <div className="max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                    <ul>
                                        {departments.map((department, index) => (
                                            <li 
                                                key={index} 
                                                className={`py-3 ${index < departments.length - 1 ? 'border-b' : ''} 
                                                    flex justify-between items-center cursor-pointer
                                                    hover:bg-gray-50 transition-colors
                                                    ${selectedDepartment === department ? 'bg-blue-50' : ''}`}
                                                onClick={() => handleDepartmentClick(department)}
                                            >
                                                <span className={`text-sm ${selectedDepartment === department ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                                                    {department}
                                                </span>
                                                <span className={`text-sm ${selectedDepartment === department ? 'text-blue-500' : 'text-gray-500'}`}>
                                                    {departmentCounts[department]}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <TemplateCard
                                    title="Criar do zero"
                                    icon={<GridIcon />}
                                    isCreateTemplate={true}
                                    onClick={handleCreateTemplate}
                                />

                                {filteredTemplates.length > 0 ? (
                                    filteredTemplates.map((template) => (
                                        <TemplateCard
                                            key={template.id}
                                            title={template.title}
                                            icon={template.icon}
                                            department={template.department}
                                            onClick={() => handleUseTemplate(template.title)}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-8">
                                        <p className="text-gray-500">Nenhum template encontrado para os critérios selecionados.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default TemplatesSequencia;