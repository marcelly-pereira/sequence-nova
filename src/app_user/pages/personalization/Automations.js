import React from 'react';
import { FiPlus } from 'react-icons/fi';
import BaseLayout from '../../../app/BaseLayout';
import Button from '../../../app/components/Button';
import Kanban from '../../../app/components/Kanban';

const Automacoes = () => {
  return (
    <BaseLayout title="Automações">
      <div className="min-h-screen">
        <div className="mb-6">
          <Button
            variant="primary"
            className="text-sm py-[0.45rem] px-2 shadow-sm"
            icon={<FiPlus size={18} />}
          >
            Criar Nova
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border-gray-200">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-700 font-medium mb-1">
              Nenhuma automação encontrada.
            </p>
            <p className="text-gray-600">
              Crie uma nova usando as Sequências disponíveis.
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
export default Automacoes;