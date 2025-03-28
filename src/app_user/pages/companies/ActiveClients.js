import React from 'react';
import BaseLayout from '../../../app/BaseLayout';

const ClientesAtivos = () => {
    return (
        <BaseLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-indigo-800 mb-4">
                    Olá, eu sou a tela de Clientes Ativos!
                </h1>
                <p className="text-gray-700">Visualize e gerencie seus clientes ativos.</p>
            </div>
        </BaseLayout>
    );
};

export default ClientesAtivos;