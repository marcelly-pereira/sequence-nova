import React, { useState, useRef } from 'react';
import BaseLayout from '../app/BaseLayout';
import OffCanvas from '../app/components/OffCanvas';
import BaseForm from '../app/components/BaseForm';
import Select from '../app/components/Select';

const ConnectionLine = ({ start, end }) => {
  if (!start || !end) return null;

  const controlPointOffset = 50;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const controlPoint1 = {
    x: start.x + dx / 2,
    y: start.y,
  };
  const controlPoint2 = {
    x: end.x - dx / 2,
    y: end.y,
  };

  const path = `M ${start.x} ${start.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${end.x} ${end.y}`;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <path
        d={path}
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="none"
      />
      <circle cx={end.x} cy={end.y} r="4" fill="#64748b" />
    </svg>
  );
};

const DraggableCard = ({ 
  id, 
  title, 
  subtitle, 
  icon, 
  initialPosition, 
  onDrag, 
  onClick, 
  isSelected, 
  onConnectClick, 
  connections 
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.connect-button')) {
      e.stopPropagation();
      return;
    }
    
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
      if (onDrag) onDrag(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (!isDragging) {
        onClick && onClick(id);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    e.preventDefault();
  };

  const getCenter = () => {
    if (!cardRef.current) return { x: position.x, y: position.y };
    
    const rect = cardRef.current.getBoundingClientRect();
    return {
      x: position.x + rect.width / 2,
      y: position.y + rect.height / 2
    };
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`absolute cursor-move bg-white rounded-lg shadow-md p-4 w-80 select-none ${
          isDragging ? 'shadow-lg z-50' : ''
        } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: isDragging ? 10 : 1,
        }}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          if (!isDragging && !e.target.closest('.connect-button')) {
            onClick && onClick(id);
          }
        }}
      >
        <div className="flex items-start gap-2">
          <div className="mt-1 text-gray-500">{icon}</div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <button 
            className="connect-button flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onConnectClick && onConnectClick(id);
            }}
            title="Conectar a outro card"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
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
        <button
          className="w-12 h-12 border-2 border-gray-400 border-dashed flex items-center justify-center rounded-full hover:bg-gray-100"
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

const OffCanvasAcao = ({ isOpen, onClose, onSave, title = 'Edição da Ação' }) => {
  const [sequencia, setSequencia] = useState('solicitacoes-suporte');
  const [fase, setFase] = useState('caixa-entrada');

  const sequenciaOptions = [
    { value: 'solicitacoes-suporte', label: 'Solicitações de Suporte' },
    { value: 'controle-desenvolvimento', label: 'Controle de Desenvolvimento' },
    { value: 'gerenciamento-sucesso', label: 'Gerenciamento de Sucesso do Cliente' },
    { value: 'vendas-negociacoes', label: 'Vendas e Negociações' },
    { value: 'implantacao', label: 'Implantação' },
  ];

  const faseOptions = [
    { value: 'caixa-entrada', label: 'Caixa de entrada' },
    { value: 'sem-prioridade', label: 'Sem Prioridade' },
    { value: 'avaliacao', label: 'Avaliação' },
    { value: 'fazendo', label: 'Fazendo' },
    { value: 'concluidas', label: 'Concluídas' },
    { value: 'impedidas', label: 'Impedidas' },
  ];

  const handleSequenciaChange = (e) => {
    setSequencia(e.target.value);
  };

  const handleFaseChange = (e) => {
    setFase(e.target.value);
  };

  const handleSave = () => {
    const sequenciaLabel = sequenciaOptions.find(option => option.value === sequencia)?.label;
    const faseLabel = faseOptions.find(option => option.value === fase)?.label;
    
    onSave && onSave({
      title: `Novo Card: ${sequenciaLabel}`,
      subtitle: `Fase: ${faseLabel}`,
      icon: <TimeIcon />,
      position: { x: 320, y: 140 },
    });
    onClose();
  };

  const headerIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  );

  return (
    <OffCanvas 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      headerIcon={headerIcon}
    >
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Criar Card</h3>
        </div>

        <Select
          id="sequencia"
          label="Sequência"
          value={sequencia}
          onChange={handleSequenciaChange}
          options={sequenciaOptions}
          placeholder="Selecione a sequência"
        />
        <p className="text-xs text-gray-500 mb-6">
          Selecionar a sequência que será executada para o ação.
        </p>

        <Select
          id="fase"
          label="Fase"
          value={fase}
          onChange={handleFaseChange}
          options={faseOptions}
          placeholder="Selecione a fase"
        />
        <p className="text-xs text-gray-500 mb-6">
          Selecionar a fase que será executada para o ação.
        </p>
      </div>

      <div className="p-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
    </OffCanvas>
  );
};

const ConnectionsMenuModal = ({ 
  isOpen, 
  onClose, 
  onConnect, 
  onDeleteConnection, 
  cards, 
  selectedCard, 
  connections 
}) => {
  const excludeId = selectedCard ? selectedCard.id : null;
  const availableCards = cards.filter(card => card.id !== excludeId);
  const activeConnections = connections ? connections.filter(
    conn => conn.source === selectedCard?.id || conn.target === selectedCard?.id
  ) : [];
  const [activeTab, setActiveTab] = useState(activeConnections.length > 0 ? 'existingConnections' : 'newConnection');

  const modalIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );

  const handleSubmit = () => {
    onClose();
  };

  return (
    <BaseForm 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      title="Gerenciar conexões"
      icon={modalIcon}
      primaryColor="#1526ff"
      submitButtonText="Fechar"
    >
      <div>
        <div className="flex border-b bg-white mb-4">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'newConnection'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('newConnection')}
          >
            Nova Conexão
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'existingConnections'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('existingConnections')}
            disabled={activeConnections.length === 0}
          >
            Conexões Existentes {activeConnections.length > 0 && `(${activeConnections.length})`}
          </button>
        </div>
        
        {activeTab === 'newConnection' && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Selecione um card para conectar com "{selectedCard?.title}"
            </p>
            
            <div className="max-h-64 overflow-y-auto">
              {availableCards.length > 0 ? (
                availableCards.map(card => (
                  <div 
                    key={card.id}
                    className="p-3 border border-gray-200 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => onConnect(selectedCard.id, card.id)}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-gray-500"><TimeIcon /></div>
                      <div>
                        <h4 className="font-medium text-gray-800">{card.title}</h4>
                        <p className="text-xs text-gray-500">{card.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Não há outros cards disponíveis para conectar
                </p>
              )}
            </div>
          </>
        )}
        
        {activeTab === 'existingConnections' && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Conexões atuais do card "{selectedCard?.title}"
            </p>
            
            <div className="max-h-64 overflow-y-auto">
              {activeConnections.length > 0 ? (
                activeConnections.map((conn, index) => {
                  const otherCardId = conn.source === selectedCard.id ? conn.target : conn.source;
                  const otherCard = cards.find(c => c.id === otherCardId);
                  
                  return (
                    <div 
                      key={index}
                      className="p-3 border border-gray-200 rounded-lg mb-2 bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-2">
                          <div className="mt-1 text-gray-500"><TimeIcon /></div>
                          <div>
                            <h4 className="font-medium text-gray-800">{otherCard?.title}</h4>
                            <p className="text-xs text-gray-500">{otherCard?.subtitle}</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          className="text-red-500 hover:text-red-700 p-1"
                          onClick={() => onDeleteConnection(conn)}
                          title="Remover conexão"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Este card não possui conexões
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </BaseForm>
  );
};

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

  const [connections, setConnections] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);
  const [connectMenuOpen, setConnectMenuOpen] = useState(false);

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
  
  const handleCardClick = (id) => {
    setSelectedCardId(id === selectedCardId ? null : id);
  };
  
  const handleConnectButtonClick = (id) => {
    setSelectedCardId(id);
    setConnectMenuOpen(true);
  };
  
  const handleConnectCards = (sourceId, targetId) => {
    setConnections([
      ...connections, 
      { 
        source: sourceId, 
        target: targetId 
      }
    ]);
    setConnectMenuOpen(false);
  };
  
  const handleDeleteConnection = (connection) => {
    setConnections(connections.filter(conn => 
      !(conn.source === connection.source && conn.target === connection.target)
    ));
  };
  
  const getConnectionPoints = () => {
    return connections.map(conn => {
      const sourceCard = cards.find(card => card.id === conn.source);
      const targetCard = cards.find(card => card.id === conn.target);
      
      if (!sourceCard || !targetCard) return null;
      
      const sourceRect = { 
        x: sourceCard.position.x, 
        y: sourceCard.position.y,
        width: 320, 
        height: 80 
      };
      
      const targetRect = { 
        x: targetCard.position.x, 
        y: targetCard.position.y,
        width: 320,
        height: 80
      };
      
      const sourceCenter = {
        x: sourceRect.x + sourceRect.width / 2,
        y: sourceRect.y + sourceRect.height / 2
      };
      
      const targetCenter = {
        x: targetRect.x + targetRect.width / 2,
        y: targetRect.y + targetRect.height / 2
      };
      
      return {
        start: sourceCenter,
        end: targetCenter
      };
    }).filter(conn => conn !== null);
  };
  
  const handleBoardClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedCardId(null);
    }
  };
  
  const selectedCard = cards.find(card => card.id === selectedCardId);
  
  return (
    <BaseLayout>
      <div 
        className="relative w-full h-screen bg-gray-100 overflow-hidden rounded-2xl"
        onClick={handleBoardClick}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle, #cbd5e0 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        
        {getConnectionPoints().map((conn, idx) => (
          <ConnectionLine 
            key={idx} 
            start={conn.start} 
            end={conn.end} 
          />
        ))}

        {cards.map((card) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            initialPosition={card.position}
            onDrag={handleCardDrag}
            onClick={handleCardClick}
            onConnectClick={handleConnectButtonClick}
            isSelected={selectedCardId === card.id}
            connections={connections.filter(
              conn => conn.source === card.id || conn.target === card.id
            )}
          />
        ))}

        <AddButton
          initialPosition={{ x: 232, y: 290 }}
          onClick={() => setOffCanvasOpen(true)}
        />

        <OffCanvasAcao
          isOpen={offCanvasOpen}
          onClose={() => setOffCanvasOpen(false)}
          title="Edição da Ação"
          onSave={handleAddCard}
        />
        
        <ConnectionsMenuModal
          isOpen={connectMenuOpen}
          onClose={() => setConnectMenuOpen(false)}
          onConnect={handleConnectCards}
          onDeleteConnection={handleDeleteConnection}
          cards={cards}
          selectedCard={selectedCard}
          connections={connections}
        />
      </div>
    </BaseLayout>
  );
};

export default KanbanBoard;