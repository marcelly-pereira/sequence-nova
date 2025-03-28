import React from 'react';
import BaseLayout from '../../../app/BaseLayout';

const MinhasSequencias = () => {
    return (
        <BaseLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-indigo-800 mb-4">
                    Olá, eu sou a tela de Minhas Sequências!
                </h1>
                <p className="text-gray-700">Aqui você pode gerenciar suas sequências personalizadas.</p>
            </div>
        </BaseLayout>
    );
};

export default MinhasSequencias;