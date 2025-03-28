import React from 'react';
import BaseLayout from '../../../app/BaseLayout';

const Cadastros = () => {
    return (
        <BaseLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-indigo-800 mb-4">
                    Olá, eu sou a tela de Cadastros!
                </h1>
                <p className="text-gray-700">Configure os cadastros do sistema aqui.</p>
            </div>
        </BaseLayout>
    );
};

export default Cadastros;