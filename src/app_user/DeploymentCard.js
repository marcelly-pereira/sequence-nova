import React, { useState } from 'react';
import Table from '../app/components/Table';
import BaseLayout from '../app/BaseLayout';
import { AnimatedExpandingButton } from '../app/components/Button'; // Ajuste o caminho de importação conforme necessário

const DeploymentCard = () => {
    const [deployments, setDeployments] = useState([
        { id: 1, hora: '4 Apr 10:16:09', descricao: 'Card KPTAL CONTABILIDADE E SOLUCOES CORPORATIVAS LTDA criado automaticamente. movido de para por', status: 'Sucesso' },
        { id: 2, hora: '4 Apr 10:16:11', descricao: 'Card MHUB SOLUCOES EMPRESARIAIS LTDA criado automaticamente. movido de para por', status: 'Sucesso' },
        { id: 3, hora: '4 Apr 10:16:11', descricao: 'Card GENIUS CONTABILIDADE criado automaticamente. movido de para por', status: 'Sucesso' },
        { id: 4, hora: '4 Apr 10:18:14', descricao: 'Card GENIUS CONTABILIDADE criado automaticamente. movido de para por', status: 'Sucesso' },
        { id: 5, hora: '4 Apr 10:18:15', descricao: 'Card KPTAL CONTABILIDADE E SOLUCOES CORPORATIVAS LTDA criado automaticamente. movido de para por', status: 'Sucesso' },
        { id: 6, hora: '4 Apr 10:18:15', descricao: 'Card MHUB SOLUCOES EMPRESARIAIS LTDA criado automaticamente. movido de para por', status: 'Sucesso' },
        { id: 7, hora: '4 Apr 16:58:04', descricao: 'Card AJE-MA criado automaticamente. movido de para por', status: 'Sucesso' },
    ]);

    const colunas = [
        {
            campo: 'hora',
            titulo: 'HORA (GMT-3)',
        },
        {
            campo: 'descricao',
            titulo: 'DESCRIÇÃO',
        },
        {
            campo: 'status',
            titulo: 'STATUS',
            tipo: 'status',
        },
    ];

    const renderizarStatus = (status) => {
        if (status === 'Sucesso') {
            return (
                <div className="flex justify-start">
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800">
                        Sucesso
                    </span>
                </div>
            );
        }
        return <span>{status}</span>;
    };

    const handleEdit = () => {
        console.log('Editar clicado');
        // Implementar a lógica de edição aqui
    };

    const handleStopAutomation = () => {
        console.log('Parar Automação clicado');
        // Implementar a lógica para parar a automação aqui
    };

    // Ícone de edição SVG
    const editIcon = (
        <svg
            className="w-full h-full fill-white transition-all duration-200 ease-in-out group-hover:fill-[#312e81]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
    );

    // Ícone de parar (stop) SVG
    const stopIcon = (
        <svg
            className="w-full h-full fill-white transition-all duration-200 ease-in-out group-hover:bg-[#BC0003]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M6 6h12v12H6z" />
        </svg>
    );

    return (
        <BaseLayout title="Sequence">
            <div className="flex items-center justify-between mb-4 px-3">
                <div className="flex-1">
                    <h2 className="text-md font-medium text-gray-900">Criar card de implantação</h2>
                    <p className="text-sm text-gray-500">Iniciada em 7 de Abril de 2025 às 10:15</p>
                </div>
                <div className="flex items-center gap-2">
                    <AnimatedExpandingButton
                        onClick={handleEdit}
                        text="Editar"
                        className="border-[1px] border-[#312e81] bg-[#312e81] hover:bg-white"
                        icon={editIcon}
                        textColor="text-[#312e81]"
                    />

                    <AnimatedExpandingButton
                        onClick={handleStopAutomation}
                        text="Parar"
                        className="bg-[#BC0003] border-[1px] border-[#BC0003] hover:bg-[#BC0003]"
                        icon={stopIcon}
                        textColor="text-[#BC0003]"
                    />
                </div>
            </div>
            <div className="bg-white shadow rounded-2xl">
                <div className="overflow-hidden border-b border-gray-200 rounded-2xl p-3 sm:p-6">
                    <Table
                        colunas={colunas}
                        dados={deployments}
                        renderizarStatus={renderizarStatus}
                    />
                </div>
            </div>
        </BaseLayout>
    );
}

export default DeploymentCard;