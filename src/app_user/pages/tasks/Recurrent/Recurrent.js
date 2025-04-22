import React, { useState, useEffect } from 'react';
import BaseLayout from '../../../../app/BaseLayout';
import { FiSearch, FiList, FiFilter } from 'react-icons/fi';
import Table from '../../../../app/components/Table';
import RecorrentOffCanvas from './RecorrentOffCanvas';
import obrigacoesService from '../../../../services/listObligations';
import Pagination from '../../../../app/components/Pagination';

const Recorrentes = () => {
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const colunas = [
        { campo: 'obrigacao_nome', titulo: 'TAREFA' },
        { campo: 'razao_social', titulo: 'EMPRESA' },
        { campo: 'prazo_legal', titulo: 'VENCIMENTO' },
        { campo: 'status', titulo: 'STATUS', tipo: 'status' },
        { campo: 'competencia', titulo: 'COMPETÊNCIA' },
        { campo: 'responsavel_nome', titulo: 'RESPONSÁVEL' },
        { campo: 'nome_departamento', titulo: 'DEPARTAMENTO' },
    ];

    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
    const [selectedTarefa, setSelectedTarefa] = useState(null);

    useEffect(() => {
        fetchTarefas();
    }, [currentPage, pageSize, searchTerm]);

    const fetchTarefas = async () => {
        setLoading(true);
        try {
            const response = await obrigacoesService.getObrigacoes({
                page: currentPage,
                pageSize,
                search: searchTerm
            });

            if (response.status === 'success') {
                setTarefas(response.results);
                setTotalCount(response.count);
                setError(null);
            } else {
                setError(response.message || 'Erro ao carregar dados');
                setTarefas([]);
            }
        } catch (err) {
            setError(`Erro na requisição: ${err.message}`);
            console.error('Erro ao buscar tarefas:', err);
            setTarefas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (item) => {
        console.log('Tarefa selecionada:', item);
        setSelectedTarefa(item);
        setIsOffCanvasOpen(true);
    };

    const closeOffCanvas = () => {
        setIsOffCanvasOpen(false);
        setSelectedTarefa(null);
        fetchTarefas();
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await obrigacoesService.updateStatus(id, newStatus);
            if (response.status === 'success') {
                const updatedTarefas = tarefas.map(tarefa =>
                    tarefa.id === id ? { ...tarefa, status: newStatus } : tarefa
                );
                setTarefas(updatedTarefas);

                if (selectedTarefa && selectedTarefa.id === id) {
                    setSelectedTarefa({ ...selectedTarefa, status: newStatus });
                }
            } else {
                console.error('Erro ao atualizar status:', response.message);
            }
        } catch (err) {
            console.error('Erro ao atualizar status:', err);
        }
    };

    const renderizarStatus = (status) => {
        if (status === 'Entregue') {
            return (
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Entregue
                </span>
            );
        } else if (status === 'Pendente') {
            return (
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pendente
                </span>
            );
        }
        return status;
    };

    const renderizarConteudo = (coluna, item) => {
        const getImageUrl = (url) => {
            if (url && url.startsWith('/')) {
                return `https://comercial.sequence.app.br${url}`;
            }
            return url;
        };
        
        if (coluna.campo === 'responsavel_nome') {
            const nomeResponsavel = item[coluna.campo] || '';
            const nomeSemId = nomeResponsavel.split('|')[0].trim();
            
            return (
                <div className="flex items-center">
                    <img 
                        src={item.responsavel_foto ? getImageUrl(item.responsavel_foto) : ''}
                        alt={nomeSemId}
                        className="h-6 w-6 rounded-full object-cover mr-2"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(nomeSemId) + '&background=random';
                        }}
                    />
                    <span>{nomeSemId}</span>
                </div>
            );
        } else if (coluna.tipo === 'status') {
            return renderizarStatus(item[coluna.campo]);
        } else if (coluna.campo === 'prazo_legal' || coluna.campo === 'competencia') {
            if (item[coluna.campo]) {
                if (coluna.campo === 'competencia') {
                    const data = new Date(item[coluna.campo]);
                    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
                    const ano = data.getFullYear();
                    return `${mes}/${ano}`;
                } else {
                    const [ano, mes, dia] = item[coluna.campo].split('-');
                    return `${dia}/${mes}/${ano}`;
                }
            }
        }
    
        return item[coluna.campo] || '—';
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <BaseLayout title="Tarefas Recorrentes">
            <div className="flex justify-between items-center pb-4">
                <div className="flex items-center flex-grow">
                    <input
                        type="text"
                        placeholder="Procurar..."
                        className="text-sm px-4 py-2 border border-gray-300 rounded-md 
                                    focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700
                                    transition-colors"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="ml-2 p-2 text-gray-400">
                        <FiSearch size={16} />
                    </div>
                </div>
                <div className="relative group">
                    <button className="flex items-center p-1 bg-white border border-gray-400 rounded-full text-gray-400 mr-2 w-6 h-6 justify-center">
                        <span className="text-gray-400 font-bold">?</span>
                    </button>
                    <div className="absolute z-10 w-32 p-2 mt-2 text-xs text-center text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none left-1/2 -translate-x-1/2 top-full">
                        Clique na Tarefa
                    </div>
                </div>
                <button className="flex items-center px-3 py-1 bg-white border border-gray-400 rounded-md text-sm mr-1 text-gray-400">
                    <FiList size={16} className="mr-2 text-gray-400" />
                    <span>Listas</span>
                </button>
                <button className="flex items-center px-3 py-1 bg-white border border-gray-400 rounded-md text-sm ml-1 text-gray-400">
                    <FiFilter size={16} className="mr-2 text-gray-400" />
                    <span>Filtrar</span>
                </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border-gray-200 p-3 sm:p-6">
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-4">{error}</div>
                ) : (
                    <div>
                        <div className="overflow-x-auto">
                            <Table
                                colunas={colunas}
                                dados={tarefas}
                                renderizarConteudo={renderizarConteudo}
                                onRowClick={handleRowClick}
                                className="cursor-pointer"
                            />
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            showPageNumbers={true}
                            maxPageNumbers={5}
                        />
                    </div>
                )}
            </div>

            {selectedTarefa && (
                <RecorrentOffCanvas
                    isOpen={isOffCanvasOpen}
                    onClose={closeOffCanvas}
                    item={selectedTarefa}
                    onStatusChange={handleStatusChange}
                />
            )}
        </BaseLayout>
    );
};

export default Recorrentes;