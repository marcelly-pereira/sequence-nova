import React, { useState } from 'react';
import BaseLayout from '../../../../app/BaseLayout';
import { FiSearch, FiList, FiFilter, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import Table from '../../../../app/components/Table';
import OffCanvas from '../../../pages/tasks/Recurrent/OffCanvas';

const Recorrentes = () => {
    const tarefas = [
        { id: 1, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '06/04/2025', status: 'Entregue', competencia: '03/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 2, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '06/05/2025', status: 'Entregue', competencia: '04/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 3, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '05/06/2025', status: 'Entregue', competencia: '05/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 4, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '06/07/2025', status: 'Entregue', competencia: '06/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 5, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '06/08/2025', status: 'Entregue', competencia: '07/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 6, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '04/09/2025', status: 'Entregue', competencia: '08/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 7, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '06/10/2025', status: 'Entregue', competencia: '09/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 8, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '06/11/2025', status: 'Entregue', competencia: '10/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 9, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '04/12/2025', status: 'Entregue', competencia: '11/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
        { id: 10, tarefa: 'Folha de Pagamento', empresa: 'N/A', vencimento: '06/04/2025', status: 'Entregue', competencia: '03/2025', responsavel: 'Bruno Nunes', departamento: 'Administrativo' },
    ];

    const colunas = [
        { campo: 'tarefa', titulo: 'TAREFA' },
        { campo: 'empresa', titulo: 'EMPRESA' },
        { campo: 'vencimento', titulo: 'VENCIMENTO' },
        { campo: 'status', titulo: 'STATUS', tipo: 'status' },
        { campo: 'competencia', titulo: 'COMPETÊNCIA' },
        { campo: 'responsavel', titulo: 'RESPONSÁVEL' },
        { campo: 'departamento', titulo: 'DEPARTAMENTO' },
        { campo: 'acoes', titulo: 'AÇÕES', tipo: 'acoes', centralizado: true },
    ];

    const [paginaAtual, setPaginaAtual] = useState(1);
    const totalPaginas = 7;
    
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
    const [selectedTarefa, setSelectedTarefa] = useState(null);

    const handleAcaoClick = (item) => {
        console.log('Ação clicada:', item);
    };

    const handleRowClick = (item) => {
        setSelectedTarefa(item);
        setIsOffCanvasOpen(true);
    };

    const closeOffCanvas = () => {
        setIsOffCanvasOpen(false);
    };

    const renderizarAcoes = (item) => {
        return (
            <div className="flex items-center space-x-1">
                <button className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
                    <FiCheck size={12} />
                </button>
                <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                    <FiX size={12} />
                </button>
                <button className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                    <FiInfo size={12} />
                </button>
            </div>
        );
    };

    const renderizarStatus = (status) => {
        if (status === 'Entregue') {
            return (
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Entregue
                </span>
            );
        }
        return status;
    };

    const renderizarConteudo = (coluna, item) => {
        if (coluna.campo === 'acoes') {
            return renderizarAcoes(item);
        } else if (coluna.campo === 'responsavel') {
            return (
                <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-2">
                        BN
                    </div>
                    <span>{item[coluna.campo]}</span>
                </div>
            );
        } else if (coluna.tipo === 'status') {
            return renderizarStatus(item[coluna.campo]);
        }

        return item[coluna.campo] || '—';
    };

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
                <div className="overflow-x-auto">
                    <Table
                        colunas={colunas}
                        dados={tarefas}
                        onAcaoClick={handleAcaoClick}
                        renderizarStatus={renderizarStatus}
                        renderizarConteudo={renderizarConteudo}
                        onRowClick={handleRowClick}
                    />
                </div>
            </div>
            
            <OffCanvas 
                isOpen={isOffCanvasOpen} 
                onClose={closeOffCanvas} 
                item={selectedTarefa}
            />
        </BaseLayout>
    );
};

export default Recorrentes;