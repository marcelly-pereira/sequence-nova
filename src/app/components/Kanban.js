import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiMoreHorizontal, FiAlertCircle, FiZap, FiArrowUpCircle, FiClock } from 'react-icons/fi';
import { FiPlus, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DropIndicator = ({ beforeId, column }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="drop-indicator my-0.5 h-0.5 w-full bg-blue-400 opacity-0"
        />
    );
};

const TypeBadge = ({ type }) => {
    return (
        <span className="text-xs font-semibold text-white bg-blue-500 px-2 py-0.5 rounded-sm">
            {type}
        </span>
    );
};

const TimeIndicator = ({ days, isCompleted }) => {
    return (
        <div className="flex items-center mr-2">
            <span className={`inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${isCompleted ? "text-gray-400" : "text-amber-600"
                }`}>
                {isCompleted ? <FiCheckCircle size={14} /> : <FiClock size={14} />}
            </span>
            <span className="text-xs text-gray-500 ml-1">{days}d</span>
        </div>
    );
};

const KanbanBoard = () => {
    const [columns, setColumns] = useState([
        {
            id: 1,
            title: 'Backlog',
            count: 0,
            color: 'border-gray-300',
            cards: []
        },
        {
            id: 2,
            title: 'Em andamento',
            count: 0,
            color: 'border-blue-400',
            cards: []
        },
        {
            id: 3,
            title: 'Revisão/Aprovação',
            count: 0,
            color: 'border-purple-400',
            cards: []
        },
        {
            id: 4,
            title: 'Live',
            count: 0,
            color: 'border-green-500',
            icon: '',
            cards: []
        },
        {
            id: 5,
            title: 'Arquivado',
            count: 0,
            color: 'border-red-500',
            icon: '',
            cards: []
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentColumnId, setCurrentColumnId] = useState(null);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [newCardDescription, setNewCardDescription] = useState('');
    const [newCardType, setNewCardType] = useState('Front-End');
    const [newCardTag, setNewCardTag] = useState('');
    const [showTagSelector, setShowTagSelector] = useState(false);
    const [tagSearchTerm, setTagSearchTerm] = useState('');

    const [showPhaseModal, setShowPhaseModal] = useState(false);
    const [newPhaseTitle, setNewPhaseTitle] = useState('');
    const [newPhaseColor, setNewPhaseColor] = useState('border-gray-300');
    const [newPhaseIcon, setNewPhaseIcon] = useState('');

    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const updatedColumns = columns.map(column => ({
            ...column,
            count: column.cards.length
        }));
        setColumns(updatedColumns);
    }, [columns.map(col => col.cards.length).join(',')]);

    useEffect(() => {
        const preventScroll = (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        };

        document.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            document.removeEventListener('wheel', preventScroll);
        };
    }, [isDragging]);

    const openAddCardModal = (columnId) => {
        setCurrentColumnId(columnId);
        setNewCardTitle('');
        setNewCardDescription('');
        setNewCardType('Front-End');
        setNewCardTag('');
        setShowModal(true);
    };

    const addNewCard = () => {
        if (newCardTitle.trim() === '') return;

        setColumns(prevColumns => {
            return prevColumns.map(column => {
                if (column.id === currentColumnId) {
                    const updatedCards = [
                        ...column.cards,
                        {
                            id: Date.now(),
                            title: newCardTitle,
                            description: newCardDescription,
                            type: newCardType,
                            tag: newCardTag,
                            timeElapsed: '0d',
                            hasInfo: newCardDescription.trim() !== '',
                            additionalInfo: newCardDescription
                        }
                    ];

                    return {
                        ...column,
                        cards: updatedCards,
                        count: updatedCards.length
                    };
                }
                return column;
            });
        });

        setShowModal(false);
    };

    const openAddPhaseModal = () => {
        setNewPhaseTitle('');
        setNewPhaseColor('border-gray-300');
        setNewPhaseIcon('');
        setShowPhaseModal(true);
    };

    const addNewPhase = () => {
        if (newPhaseTitle.trim() === '') return;

        const newId = Math.max(...columns.map(column => column.id), 0) + 1;

        setColumns(prevColumns => [
            ...prevColumns,
            {
                id: newId,
                title: newPhaseTitle,
                count: 0,
                color: newPhaseColor,
                icon: newPhaseIcon,
                cards: []
            }
        ]);

        setShowPhaseModal(false);
    };

    const deletePhase = (phaseId) => {
        setColumns(prevColumns => prevColumns.filter(column => column.id !== phaseId));
    };

    const getIndicatorsByColumn = (columnId) => {
        return Array.from(document.querySelectorAll(`[data-column="${columnId}"]`));
    };

    const clearHighlights = (els) => {
        const indicators = els || Array.from(document.querySelectorAll('.drop-indicator'));
        indicators.forEach(i => {
            i.style.opacity = "0";
        });
    };

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const highlightIndicator = (e) => {
        const columnId = e.currentTarget.dataset.columnId;
        if (!columnId) return;

        const indicators = getIndicatorsByColumn(columnId);
        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    };

    const handleDragStart = (e, cardId, sourceColumnId) => {
        e.dataTransfer.setData('cardId', cardId);
        e.dataTransfer.setData('sourceColumnId', sourceColumnId);

        setIsDragging(true);

        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehavior = 'none';
    };

    const handleDragEnd = () => {
        setIsDragging(false);

        document.body.style.overflow = '';
        document.body.style.overscrollBehavior = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);
    };

    const handleDragLeave = () => {
        clearHighlights();
    };

    const handleDrop = (e, targetColumnId) => {
        const cardId = parseInt(e.dataTransfer.getData('cardId'));
        const sourceColumnId = parseInt(e.dataTransfer.getData('sourceColumnId'));


        if (!cardId || isNaN(cardId) || !sourceColumnId || isNaN(sourceColumnId)) {
            clearHighlights();
            return;
        }

        if (sourceColumnId === targetColumnId) return;

        clearHighlights();

        const indicators = getIndicatorsByColumn(targetColumnId);
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        const sourceColumn = columns.find(col => col.id === sourceColumnId);

        if (!sourceColumn) {
            console.error("Coluna de origem não encontrada:", sourceColumnId);
            return;
        }

        const card = sourceColumn.cards.find(c => c.id === cardId);
        if (!card) {
            console.error("Card não encontrado:", cardId);
            return;
        }

        const updatedColumns = columns.map(column => {
            if (column.id === sourceColumnId) {
                const updatedCards = column.cards.filter(c => c.id !== cardId);
                return {
                    ...column,
                    cards: updatedCards,
                    count: updatedCards.length
                };
            }

            if (column.id === targetColumnId) {
                const newCards = [...column.cards];

                if (before === "-1") {
                    newCards.push(card);
                } else {
                    const insertIndex = newCards.findIndex(c => c.id === parseInt(before));
                    if (insertIndex !== -1) {
                        newCards.splice(insertIndex, 0, card);
                    } else {
                        newCards.push(card);
                    }
                }

                return {
                    ...column,
                    cards: newCards,
                    count: newCards.length
                };
            }

            return column;
        });

        setColumns(updatedColumns);

        handleDragEnd();
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            <div
                className="flex-1 p-0 overflow-x-auto"
                style={{ overscrollBehavior: isDragging ? 'none' : 'auto' }}
            >
                <div className="flex gap-2 h-full p-1 items-start">
                    {columns.map(column => (
                        <div
                            key={column.id}
                            className={`flex-shrink-0 flex flex-col bg-[#f3f4f6] rounded-md w-72 border-t-4 ${column.color} column-container`}
                            data-column-id={column.id}
                        >
                            <div className="p-2 font-medium text-gray-700 flex items-center justify-between border-b">
                                <div className="flex items-center">
                                    {column.icon && <span className="mr-1">{column.icon}</span>}
                                    <h2 className="font-bold">{column.title}</h2>
                                    <span className="ml-2 text-gray-700 text-xs font-medium px-1">
                                        {column.count}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="text-gray-500 hover:text-gray-700 p-1"
                                        onClick={() => openAddCardModal(column.id)}
                                        title="Adicionar card"
                                    >
                                        <FiPlus size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, column.id)}
                            >
                                {column.cards.length === 0 && (
                                    <div className="p-2 text-sm text-gray-500 text-center">
                                        {column.id === 5 ? "Tasks não finalizadas" : "Nenhum card ainda"}
                                    </div>
                                )}

                                {column.cards.map(card => (
                                    <React.Fragment key={card.id}>
                                        <DropIndicator beforeId={card.id} column={column.id} />
                                        <motion.div
                                            layout
                                            layoutId={card.id.toString()}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                                            onDragEnd={handleDragEnd}
                                            className="border-b border-gray-200 bg-white cursor-grab active:cursor-grabbing"
                                        >
                                            <div className="p-2">
                                                <div className="mb-1">
                                                    <TypeBadge type={card.type} />
                                                    {card.tag && (
                                                        <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-sm">
                                                            {card.tag}
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-sm font-medium text-gray-800 mb-1">{card.title}</h3>

                                                {card.hasInfo && (
                                                    <div className="flex items-center text-xs text-gray-500 mb-1">
                                                        <span className="inline-flex items-center">
                                                            <span className="mr-1">MAIS INFORMAÇÕES</span>
                                                        </span>
                                                    </div>
                                                )}

                                                {card.additionalInfo && (
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        {card.additionalInfo}
                                                    </p>
                                                )}

                                                {card.statusMessage && (
                                                    <p className="text-xs text-gray-500 mb-1 italic">
                                                        {card.statusMessage}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-start mt-1">
                                                    <TimeIndicator days={card.timeElapsed.replace('d', '')} isCompleted={card.completed} />
                                                    {card.completed && (
                                                        <span className="text-xs text-green-500 flex items-center">
                                                            <FiCheckCircle size={12} className="mr-1" />
                                                            {card.timeCompleted || '3d'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </React.Fragment>
                                ))}
                                <DropIndicator beforeId={null} column={column.id} />
                            </div>

                            <div className="p-2">
                                <motion.button
                                    layout
                                    className="w-full flex items-center justify-center py-2 px-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                                    onClick={() => openAddCardModal(column.id)}
                                >
                                    <FiPlusCircle className="w-4 h-4 mr-1" />
                                    Adicionar Card
                                </motion.button>
                            </div>
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-72 h-12 flex items-center justify-center border border-dashed border-gray-300 bg-[#f3f4f6] rounded-md cursor-pointer hover:bg-gray-100"
                        onClick={openAddPhaseModal}>
                        <div className="flex items-center text-gray-500">
                            <FiPlus size={20} className="mr-2" />
                            <span>Nova fase</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-4">
                <button
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md"
                    onClick={() => openAddCardModal(1)} // Abre o modal para adicionar um novo card no Backlog
                >
                    <FiPlusCircle className="w-4 h-4 mr-2" />
                    Nova solicitação
                </button>
            </div>
           
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        className="bg-white rounded-lg shadow-lg w-full max-w-md"
                    >
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center">
                                <button className="p-2 rounded-full hover:bg-gray-100 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                    </svg>
                                </button>
                                <span className="text-gray-500 text-md">Compartilhar formulário</span>
                            </div>
                            <div className="flex items-center">
                                <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md flex items-center mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                    Editar
                                </button>
                                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                </button>
                                <button
                                    className="ml-2 text-gray-500 hover:bg-gray-100 p-2 rounded-full"
                                    onClick={() => setShowModal(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex items-center mb-5">
                                <div className="w-6 h-6 border border-green-500 rounded mr-2 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                                </div>
                                <h2 className="text-xl font-medium">Nova solicitação</h2>
                            </div>

                            <div className="mb-5">
                                <div className="flex items-center mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <label className="font-medium">Vencimento</label>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="block font-medium mb-2">
                                    O que deve ser feito?
                                </label>
                                <input
                                    type="text"
                                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                          transition-colors"
                                    value={newCardTitle}
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                    placeholder="Digite aqui ..."
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block font-medium mb-2">
                                    Responsável
                                </label>
                                <button className="text-blue-500 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Adicionar responsável
                                </button>
                            </div>

                            <div className="mb-5">
                                <label className="block font-medium mb-2">
                                    Estimativa
                                </label>
                                <p className="text-sm text-gray-500 mb-2">Forneça uma estimativa de esforço em horas ou pontos</p>
                                <input
                                    type="text"
                                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                          transition-colors"
                                    placeholder="Digite aqui ..."
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block font-medium mb-2">
                                    Tipo
                                </label>
                                <button
                                    className="text-blue-500 flex items-center"
                                    onClick={() => setShowTagSelector(!showTagSelector)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    {newCardTag ? newCardTag : "Adicionar etiqueta"}
                                </button>

                                {showTagSelector && (
                                    <div className="mt-2 bg-gray-50 rounded-lg p-3 shadow-md">
                                        <div className="relative mb-3">
                                            <input
                                                type="text"
                                                className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 transition-colors"
                                                placeholder="Pesquisar etiquetas"
                                                value={tagSearchTerm}
                                                onChange={(e) => setTagSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-2.5">
                                            <div
                                                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                                                onClick={() => {
                                                    setNewCardTag('Alteração');
                                                    setShowTagSelector(false);
                                                }}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-gray-400 mr-3"></div>
                                                <span>Alteração</span>
                                            </div>
                                            <div
                                                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                                                onClick={() => {
                                                    setNewCardTag('Back-End');
                                                    setShowTagSelector(false);
                                                }}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-teal-500 mr-3"></div>
                                                <span>Back-End</span>
                                            </div>
                                            <div
                                                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                                                onClick={() => {
                                                    setNewCardTag('Bug');
                                                    setShowTagSelector(false);
                                                }}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-orange-500 mr-3"></div>
                                                <span>Bug</span>
                                            </div>
                                            <div
                                                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                                                onClick={() => {
                                                    setNewCardTag('Conteúdo Rico');
                                                    setShowTagSelector(false);
                                                }}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-indigo-700 mr-3"></div>
                                                <span>Conteúdo Rico</span>
                                            </div>
                                            <div
                                                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                                                onClick={() => {
                                                    setNewCardTag('Front-End');
                                                    setShowTagSelector(false);
                                                }}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                                                <span>Front-End</span>
                                            </div>
                                            <div
                                                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                                                onClick={() => {
                                                    setNewCardTag('Mudança Estrutural');
                                                    setShowTagSelector(false);
                                                }}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-amber-500 mr-3"></div>
                                                <span>Mudança Estrutural</span>
                                            </div>
                                            <div
                                                className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                                                onClick={() => {
                                                    setNewCardTag('Sugestão');
                                                    setShowTagSelector(false);
                                                }}
                                            >
                                                <div className="w-4 h-4 rounded-full bg-red-600 mr-3"></div>
                                                <span>Sugestão</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-5">
                                <label className="block font-medium mb-2">
                                    Anexos
                                </label>
                                <button className="border border-gray-300 text-gray-600 rounded-md py-2 px-3 flex items-center hover:bg-gray-50 w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Anexar arquivo
                                </button>
                            </div>
                        </div>

                        <div className="p-4 flex justify-center">
                            <button
                                className="w-full px-4 py-3 text-white font-medium bg-blue-600 rounded-md hover:bg-blue-700"
                                onClick={addNewCard}
                            >
                                Nova solicitação
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {showPhaseModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        className="bg-white rounded-lg shadow-lg w-full max-w-md"
                    >
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium">Adicionar Nova Fase</h2>
                        </div>

                        <div className="p-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Título da Fase
                                </label>
                                <input
                                    type="text"
                                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                          transition-colors"
                                    value={newPhaseTitle}
                                    onChange={(e) => setNewPhaseTitle(e.target.value)}
                                    placeholder="Digite o título da fase"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cor
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newPhaseColor}
                                    onChange={(e) => setNewPhaseColor(e.target.value)}
                                >
                                    <option value="border-gray-300">Cinza</option>
                                    <option value="border-blue-400">Azul</option>
                                    <option value="border-green-500">Verde</option>
                                    <option value="border-red-500">Vermelho</option>
                                    <option value="border-purple-400">Roxo</option>
                                    <option value="border-yellow-400">Amarelo</option>
                                    <option value="border-indigo-500">Índigo</option>
                                    <option value="border-pink-500">Rosa</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ícone (opcional)
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={newPhaseIcon}
                                    onChange={(e) => setNewPhaseIcon(e.target.value)}
                                >
                                    <option value="">Nenhum</option>
                                    <option value="🟢">🟢 Verde</option>
                                    <option value="🔴">🔴 Vermelho</option>
                                    <option value="🔵">🔵 Azul</option>
                                    <option value="⭐">⭐ Estrela</option>
                                    <option value="🚩">🚩 Bandeira</option>
                                    <option value="⚠️">⚠️ Atenção</option>
                                    <option value="✅">✅ Verificado</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                                onClick={() => setShowPhaseModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={addNewPhase}
                            >
                                Adicionar Fase
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default KanbanBoard;