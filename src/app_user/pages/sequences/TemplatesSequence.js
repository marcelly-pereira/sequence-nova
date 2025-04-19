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
        // ... outros templates existentes
    ]);
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Buscar departamentos da API
    useEffect(() => {
        const fetchDepartamentos = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://comercial.sequence.app.br/api/listadepartamento/');
                
                if (!response.ok) {
                    throw new Error(`Erro ao buscar departamentos: ${response.status}`);
                }
                
                const data = await response.json();
                setDepartamentos(data);
                
                // Atualizar os templates para usar os nomes de departamentos da API quando possível
                setTemplates(prevTemplates => {
                    // Criar um mapa de departamentos disponíveis na API
                    const deptNames = new Set(data.map(dept => dept.nome));
                    
                    // Atualizar templates se o departamento existir na API
                    return prevTemplates.map(template => {
                        // Verificar se existe um departamento semelhante na API
                        // (ignorando maiúsculas/minúsculas e acentos para maior flexibilidade)
                        if (deptNames.has(template.department)) {
                            return template; // Já existe um match, manter como está
                        }
                        
                        // Tentar encontrar um match aproximado
                        const matchedDept = data.find(dept => 
                            dept.nome.toLowerCase() === template.department.toLowerCase()
                        );
                        
                        if (matchedDept) {
                            return {
                                ...template,
                                department: matchedDept.nome, // Usar o nome exato da API
                                departmentId: matchedDept.id  // Armazenar o ID para referência
                            };
                        }
                        
                        return template; // Manter o original se não encontrar correspondência
                    });
                });
                
                setLoading(false);
            } catch (error) {
                console.error("Falha ao carregar departamentos:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDepartamentos();
    }, []);

    // Extrair departamentos únicos da combinação de API e templates existentes
    const departments = loading 
        ? [] 
        : [...new Set([
            ...departamentos.map(dept => dept.nome),
            ...templates.map(template => template.department)
        ])];
    
    // Filtrar templates de acordo com a pesquisa e departamento selecionado
    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            template.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment ? template.department === selectedDepartment : true;
        
        return matchesSearch && matchesDepartment;
    });

    // Contar templates por departamento
    const departmentCounts = departments.reduce((acc, department) => {
        acc[department] = templates.filter(t => t.department === department).length;
        return acc;
    }, {});

    // Handlers
    const handleCreateTemplate = () => {
        console.log('Criar novo template');
    };

    const handleUseTemplate = (templateId, templateName) => {
        console.log(`Usar template: ${templateName} (ID: ${templateId})`);
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
                    {/* Input de pesquisa */}
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
                        {/* Lista de departamentos */}
                        <div className="w-full md:w-56 mb-6 md:mb-0">
                            <div className="bg-white rounded-lg border p-2 w-full">
                                <h2 className="font-bold text-md text-gray-800 mb-4">Departamento</h2>
                                <div className="max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                    {loading ? (
                                        <p className="text-center py-3 text-gray-500">Carregando departamentos...</p>
                                    ) : error ? (
                                        <p className="text-center py-3 text-red-500">{error}</p>
                                    ) : (
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
                                                        {departmentCounts[department] || 0}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Grid de templates */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <TemplateCard
                                    title="Criar do zero"
                                    icon={<GridIcon />}
                                    isCreateTemplate={true}
                                    onClick={handleCreateTemplate}
                                />

                                {loading ? (
                                    <div className="col-span-3 text-center py-8">
                                        <p className="text-gray-500">Carregando templates...</p>
                                    </div>
                                ) : filteredTemplates.length > 0 ? (
                                    filteredTemplates.map((template) => (
                                        <TemplateCard
                                            key={template.id}
                                            title={template.title}
                                            icon={template.icon}
                                            department={template.department}
                                            onClick={() => handleUseTemplate(template.id, template.title)}
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