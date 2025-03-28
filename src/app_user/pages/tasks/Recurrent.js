import React from 'react';
import BaseLayout from '../../../app/BaseLayout';

const Recorrentes = () => {
    return (
        <BaseLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-indigo-800 mb-4">
                    Olá, eu sou a tela de Recorrentes!
                </h1>
                <p className="text-gray-700">Aqui você pode configurar suas tarefas recorrentes.</p>
            </div>
        </BaseLayout>
    );
};

export default Recorrentes;