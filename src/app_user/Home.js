import React, { useState } from 'react';
import BaseLayout from '../app/BaseLayout';
import FlipClock from '../app/components/FlipClock';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

const Home = () => {
    const [tasks, setTasks] = useState({
        segunda: [
            { id: 'seg-1', text: 'Tarefa', color: 'gray' },
            { id: 'seg-2', text: 'Tarefa', color: 'gray' },
            { id: 'seg-3', text: 'Tarefa', color: 'gray' },
            { id: 'seg-4', text: 'Tarefa', color: 'gray' }
        ],
        terca: [
            { id: 'ter-1', text: 'Tela de Recorrências', color: 'blue' },
            { id: 'ter-2', text: 'Tarefa', color: 'gray' },
            { id: 'ter-3', text: 'Tarefa', color: 'gray' },
            { id: 'ter-4', text: 'Tarefa', color: 'gray' }
        ],
        quarta: [
            { id: 'qua-1', text: 'Tarefa', color: 'gray' },
            { id: 'qua-2', text: 'Tarefa', color: 'gray' },
            { id: 'qua-3', text: 'Tarefa', color: 'gray' },
            { id: 'qua-4', text: 'Tarefa', color: 'gray' }
        ],
        quinta: [
            { id: 'qui-1', text: 'Estilizar transição de botões', color: 'blue' },
            { id: 'qui-2', text: 'Tarefa', color: 'gray' },
            { id: 'qui-3', text: 'Tarefa', color: 'gray' },
            { id: 'qui-4', text: 'Tarefa', color: 'gray' }
        ],
        sexta: [
            { id: 'sex-1', text: 'Tarefa', color: 'gray' },
            { id: 'sex-2', text: 'Tarefa', color: 'gray' },
            { id: 'sex-3', text: 'Tarefa', color: 'gray' },
            { id: 'sex-4', text: 'Tarefa', color: 'gray' }
        ]
    });
    
    const dayTitles = {
        segunda: "Segunda",
        terca: "Terça",
        quarta: "Quarta",
        quinta: "Quinta",
        sexta: "Sexta"
    };
    
    const dateMappings = {
        segunda: "14/Abr",
        terca: "15/Abr",
        quarta: "16/Abr",
        quinta: "17/Abr",
        sexta: "18/Abr"
    };
    
    return (
        <BaseLayout title='Sequence'>
            <div className="min-h-screen">
                {/* Cabeçalho */}
                <div className="mb-8 flex flex-wrap md:flex-nowrap items-start justify-between gap-6">
                    <div className="flex-grow">
                        <p className="text-gray-500 text-sm">Olá,</p>
                        <h1 className="text-3xl font-bold text-gray-800">Marcelly Pereira</h1>
                        <p className="text-sm text-gray-600 mt-1">segunda-feira, 14 de abril de 2025</p>
                        
                        <div className="mt-4 p-4 bg-white rounded-xl shadow-sm w-fit">
                            <div className="flex items-center">
                                <span className="text-blue-500 mr-2">✨</span>
                                <span className="text-gray-600 text-sm">Planeje, execute, avalie, melhore - o ciclo do sucesso!</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-auto mt-4 md:mt-0">
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <FlipClock />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Pontos de atenção</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Card Base de Clientes */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-700">Base de Clientes</h3>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-gray-800">0</span>
                                <div className="flex items-center mt-4">
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full w-0"></div>
                                    </div>
                                    <span className="ml-2 text-xs text-gray-500">+0 / -0</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-700">Tarefas Pendentes</h3>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-gray-800">2</span>
                                <div className="mt-4 flex justify-between gap-2">
                                    <div className="flex flex-col items-center">
                                        <div className="h-16 w-full bg-red-500 rounded-lg"></div>
                                        <p className="text-xs mt-1 text-gray-600">2 vencidas</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="h-4 w-full bg-blue-100 rounded-lg"></div>
                                        <p className="text-xs mt-1 text-gray-600">0 hoje</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="h-8 w-full bg-yellow-100 rounded-lg"></div>
                                        <p className="text-xs mt-1 text-gray-600">0 a vencer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-700">Prioridades</h3>
                            </div>
                            <div className="flex flex-col space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-700">Tarefas que geram multas:</span>
                                    <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm text-sm font-semibold">0</div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-700">Tarefas atrasadas:</span>
                                    <div className="flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 rounded-full shadow-sm text-sm font-semibold">2</div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-700">E-mails com falha:</span>
                                    <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm text-sm font-semibold">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Tarefas para a semana</h2>
                    
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex mb-6 space-x-4">
                            {Object.entries(dayTitles).map(([day, title], index) => (
                                <div className="flex-1" key={day}>
                                    <div className={`${day === 'terca' ? 'bg-blue-900' : 'bg-blue-600'} text-white p-3 rounded-xl flex justify-between items-center`}>
                                        <span className="font-medium">{title}</span>
                                        <span className={`text-xs bg-white ${day === 'terca' ? 'text-blue-900' : 'text-blue-600'} px-2 py-1 rounded-full font-medium`}>{dateMappings[day]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-5 gap-3">
                            {Object.keys(tasks).map(day => (
                                <DayColumn 
                                    key={day} 
                                    day={day}
                                    dayTitle={dayTitles[day]}
                                    tasks={tasks}
                                    setTasks={setTasks}
                                />
                            ))}
                        </div>
                        
                        <BurnBarrel setTasks={setTasks} />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Sequências favoritas</h2>
                        <div className="flex items-center">
                            <select className="bg-white border-0 shadow-sm rounded-lg p-2 text-sm">
                                <option>Todos</option>
                            </select>
                            <button className="ml-2 p-2 bg-white border-0 shadow-sm rounded-full hover:bg-blue-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 font-medium">Controle de Desenvolvimento</span>
                                <span className="ml-2 text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">Não categorizado</span>
                            </div>
                            <button className="p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 font-medium">Solicitações de Suporte</span>
                                <span className="ml-2 text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">Não categorizado</span>
                            </div>
                            <button className="p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

const DayColumn = ({ day, dayTitle, tasks, setTasks }) => {
    const [active, setActive] = useState(false);
    
    const handleDragStart = (e, task) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.setData("sourceDay", day);
    };
    
    const handleDragEnd = (e) => {
        const taskId = e.dataTransfer.getData("taskId");
        const sourceDay = e.dataTransfer.getData("sourceDay");
        
        setActive(false);
        clearHighlights();
        
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);
        
        const before = element.dataset.before || "-1";
        
        if (before !== taskId) {
            let copy = { ...tasks };
            
            const taskToTransfer = { ...copy[sourceDay].find(t => t.id === taskId) };
            
            if (!taskToTransfer) return;
            
            copy[sourceDay] = copy[sourceDay].filter(t => t.id !== taskId);
            
            const targetDayTasks = [...copy[day]];
            
            if (before === "-1") {
                targetDayTasks.push(taskToTransfer);
            } else {
                const insertAtIndex = targetDayTasks.findIndex(t => t.id === before);
                if (insertAtIndex === -1) {
                    targetDayTasks.push(taskToTransfer);
                } else {
                    targetDayTasks.splice(insertAtIndex, 0, taskToTransfer);
                }
            }
            
            copy[day] = targetDayTasks;
            setTasks(copy);
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    };
    
    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };
    
    const clearHighlights = (els) => {
        const indicators = els || getIndicators();
        indicators.forEach(i => {
            i.style.opacity = "0";
        });
    };
    
    const highlightIndicator = (e) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
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
                element: indicators[indicators.length - 1]
            }
        );
        
        return el;
    };
    
    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-day="${day}"]`));
    };
    
    const filteredTasks = tasks[day];
    
    return (
        <div className="space-y-1">
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`min-h-40 transition-colors ${
                    active 
                        ? 'bg-blue-50/50 border border-dashed border-blue-200 rounded-lg' 
                        : 'bg-gray-50/0'
                }`}
            >
                {filteredTasks.map((task) => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        day={day} 
                        handleDragStart={handleDragStart} 
                    />
                ))}
                <DropIndicator beforeId={null} day={day} />
                <AddTask day={day} setTasks={setTasks} />
            </div>
        </div>
    );
};

const TaskCard = ({ task, day, handleDragStart }) => {
    return (
        <>
            <DropIndicator beforeId={task.id} day={day} />
            <motion.div 
                layout
                layoutId={task.id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, task)}
                className={`p-3 my-2 ${
                    task.color === 'blue' 
                        ? 'bg-blue-50 border border-blue-100 text-blue-800 font-medium' 
                        : 'bg-white border border-gray-100 text-gray-700'
                } rounded-lg hover:shadow-md cursor-grab active:cursor-grabbing transition-all`}
            >
                <div className="flex items-center justify-between">
                    <span className={`w-2 h-2 ${task.color === 'blue' ? 'bg-blue-500' : 'bg-gray-300'} rounded-full`}></span>
                    <span className="flex-1 mx-2 text-sm text-center">{task.text}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </div>
            </motion.div>
        </>
    );
};

const DropIndicator = ({ beforeId, day }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-day={day}
            className="my-0.5 h-0.5 w-full bg-blue-400 opacity-0"
        />
    );
};

const AddTask = ({ day, setTasks }) => {
    const [adding, setAdding] = useState(false);
    const [text, setText] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!text.trim().length) return;
        
        const newTask = {
            id: `${day}-${Date.now()}`,
            text: text.trim(),
            color: 'gray'
        };
        
        setTasks(prev => ({
            ...prev,
            [day]: [...prev[day], newTask]
        }));
        
        setText('');
        setAdding(false);
    };
    
    return (
        <>
            {adding ? (
                <motion.form layout onSubmit={handleSubmit} className="mt-2">
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder="Adicionar nova tarefa..."
                        className="w-full rounded border border-blue-300 bg-blue-50 p-3 text-sm text-gray-700 placeholder-blue-300 focus:outline-0 focus:ring-1 focus:ring-blue-400"
                        rows={2}
                        value={text}
                    />
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                            type="button"
                            onClick={() => setAdding(false)}
                            className="px-3 py-1.5 text-xs text-gray-500 transition-colors hover:text-gray-700"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 rounded bg-blue-500 px-3 py-1.5 text-xs text-white transition-colors hover:bg-blue-600"
                        >
                            <span>Adicionar</span>
                            <FiPlus />
                        </button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className="flex w-full items-center justify-center gap-1.5 px-3 py-2 text-xs text-gray-500 transition-colors hover:text-blue-600 mt-2 rounded-lg border border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                >
                    <span>Adicionar tarefa</span>
                    <FiPlus />
                </motion.button>
            )}
        </>
    );
};

const BurnBarrel = ({ setTasks }) => {
    const [active, setActive] = useState(false);
    
    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };
    
    const handleDragLeave = () => {
        setActive(false);
    };
    
    const handleDrop = (e) => {
        const taskId = e.dataTransfer.getData("taskId");
        const sourceDay = e.dataTransfer.getData("sourceDay");
        
        setTasks(prev => ({
            ...prev,
            [sourceDay]: prev[sourceDay].filter(task => task.id !== taskId)
        }));
        
        setActive(false);
    };
    
    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-6 flex items-center justify-center rounded-lg border py-4 text-xl transition-colors ${
                active
                    ? 'border-red-800 bg-red-100/20 text-red-500'
                    : 'border-gray-200 bg-gray-50/20 text-gray-400'
            }`}
        >
            <div className="flex items-center gap-3">
                {active ? (
                    <>
                        <FaFire className="animate-bounce" />
                        <span className="text-sm font-medium">Soltar para excluir</span>
                    </>
                ) : (
                    <>
                        <FiTrash />
                        <span className="text-sm font-medium">Arraste tarefas aqui para excluir</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;