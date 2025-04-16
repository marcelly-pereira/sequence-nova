import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import BaseLayout from '../app/BaseLayout';

const OffCanvas = ({ isOpen, onClose, title = 'Edição da Ação' }) => {
  const [sequencia, setSequencia] = useState('Solicitações de Suporte');
  const [fase, setFase] = useState('Caixa de entrada');
  const [showSequenciaOptions, setShowSequenciaOptions] = useState(false);
  const [showFaseOptions, setShowFaseOptions] = useState(false);

  const sequenciaOptions = [
    'Solicitações de Suporte',
    'Controle de Desenvolvimento',
    'Gerenciamento de Sucesso do Cliente',
    'Vendas e Negociações',
    'Implantação',
  ];

  const faseOptions = [
    'Caixa de entrada',
    'Sem Prioridade',
    'Avaliação',
    'Fazendo',
    'Concluídas',
    'Impedidas',
  ];

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-25"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="relative w-full max-w-md bg-gray-100 shadow-xl flex flex-col h-full rounded-l-2xl overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="flex justify-between items-center px-4 py-3 bg-white">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <h2 className="text-md font-medium">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Criar Card</h3>
                </div>

                <div className="mb-6">
                  <label className="block text-sm mb-2">Sequência</label>
                  <div className="relative">
                    <input
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      value={sequencia}
                      readOnly
                      onClick={() =>
                        setShowSequenciaOptions(!showSequenciaOptions)
                      }
                    />
                    {showSequenciaOptions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-y-auto">
                        {sequenciaOptions.map((option, index) => (
                          <div
                            key={index}
                            className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                              option === sequencia
                                ? 'bg-blue-600 text-white'
                                : ''
                            }`}
                            onClick={() => {
                              setSequencia(option);
                              setShowSequenciaOptions(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Selecionar a sequência que será executada para o ação.
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm mb-2">Fase</label>
                  <div className="relative">
                    <input
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      value={fase}
                      readOnly
                      onClick={() => setShowFaseOptions(!showFaseOptions)}
                    />
                    {showFaseOptions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-y-auto">
                        {faseOptions.map((option, index) => (
                          <div
                            key={index}
                            className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                              option === fase ? 'bg-blue-600 text-white' : ''
                            }`}
                            onClick={() => {
                              setFase(option);
                              setShowFaseOptions(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Selecionar a fase que será executada para o ação.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors flex items-center"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Salvar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DraggableCard = ({ title, subtitle, icon, initialPosition, onDrag }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = position.x;
    const startTop = position.y;

    setIsDragging(true);

    const handleMouseMove = (e) => {
      const newX = Math.round((startLeft + e.clientX - startX) / 10) * 10;
      const newY = Math.round((startTop + e.clientY - startY) / 10) * 10;

      setPosition({ x: newX, y: newY });
      if (onDrag) onDrag({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    e.preventDefault();
  };

  return (
    <div
      ref={cardRef}
      className={`absolute cursor-move bg-white rounded-lg shadow-md p-4 w-96 select-none ${
        isDragging ? 'shadow-lg z-50' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-start gap-2">
        <div className="mt-1 text-gray-500">{icon}</div>
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const AddButton = ({ initialPosition, onClick }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    if (e.target.closest('button')) {
      e.stopPropagation();
      onClick();
      return;
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = position.x;
    const startTop = position.y;

    setIsDragging(true);

    const handleMouseMove = (e) => {
      const newX = Math.round((startLeft + e.clientX - startX) / 10) * 10;
      const newY = Math.round((startTop + e.clientY - startY) / 10) * 10;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    e.preventDefault();
  };

  return (
    <div
      className="absolute cursor-move"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex flex-col items-center">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-400"></div>
        <button
          className="w-10 h-10 border-2 border-gray-400 border-dashed flex items-center justify-center rounded hover:bg-gray-100"
          onClick={onClick}
        >
          <span className="text-gray-400 text-xl">+</span>
        </button>
      </div>
    </div>
  );
};

const TimeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const KanbanBoard = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Criar card de implantação',
      subtitle:
        'Card Movido - Fase: Ganho - Assinar contrato em Vendas e Negociações',
      icon: <TimeIcon />,
      position: { x: 50, y: 50 },
    },
    {
      id: 2,
      title: 'Criar Card',
      subtitle: 'Implantação Gerenciamento de Sucesso do Cliente',
      icon: <TimeIcon />,
      position: { x: 50, y: 180 },
    },
  ]);

  const [offCanvasOpen, setOffCanvasOpen] = useState(false);

  const handleCardDrag = (id, newPosition) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, position: newPosition } : card,
      ),
    );
  };

  const handleAddCard = (cardData) => {
    const newId =
      cards.length > 0 ? Math.max(...cards.map((card) => card.id)) + 1 : 1;

    setCards([
      ...cards,
      {
        id: newId,
        ...cardData,
      },
    ]);

    setOffCanvasOpen(false);
  };

  return (
    <BaseLayout>
      <div className="relative w-full h-screen bg-gray-100 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle, #cbd5e0 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {cards.map((card) => (
          <DraggableCard
            key={card.id}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            initialPosition={card.position}
            onDrag={(newPos) => handleCardDrag(card.id, newPos)}
          />
        ))}

        <AddButton
          initialPosition={{ x: 232, y: 290 }}
          onClick={() => setOffCanvasOpen(true)}
        />

        <div className="absolute" style={{ left: '235px', top: '140px' }}>
          <div className="h-28 w-2 bg-gray-400 mx-auto"></div>
        </div>

        <div
          className="absolute text-gray-700 font-semibold"
          style={{ left: '30px', top: '145px' }}
        >
          Ação:
        </div>

        <OffCanvas
          isOpen={offCanvasOpen}
          onClose={() => {
            handleAddCard({
              title: 'Novo Card',
              subtitle: 'Descrição do novo card',
              icon: <TimeIcon />,
              position: { x: 100, y: 100 },
            });
          }}
          title="Edição da Ação"
        />
      </div>
    </BaseLayout>
  );
};

export default KanbanBoard;
