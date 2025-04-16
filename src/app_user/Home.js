import React, { useState } from 'react';
import BaseLayout from '../app/BaseLayout';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

const Home = () => {
    const [tasks, setTasks] = useState({
        segunda: [
            { id: 'seg-1', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'seg-2', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'seg-3', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'seg-4', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'seg-5', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
        ],
        terca: [
            { id: 'ter-1', text: 'Tela de Recorrências', color: 'blue', isPlaceholder: false },
            { id: 'ter-2', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'ter-3', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'ter-4', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'ter-5', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
        ],
        quarta: [
            { id: 'qua-1', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'qua-2', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'qua-3', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'qua-4', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'qua-5', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
        ],
        quinta: [
            { id: 'qui-1', text: 'Estilizar transição de botões', color: 'blue', isPlaceholder: false },
            { id: 'qui-2', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'qui-3', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'qui-4', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'qui-5', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
        ],
        sexta: [
            { id: 'sex-1', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'sex-2', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'sex-3', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'sex-4', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
            { id: 'sex-5', text: 'Arraste uma tarefa para aqui', isPlaceholder: true },
        ],
    });
    
    const [availableTasks, setAvailableTasks] = useState([
        { id: 'task-1', text: 'Implementar autenticação', color: 'green', isPlaceholder: false },
        { id: 'task-2', text: 'Revisar código de produção', color: 'red', isPlaceholder: false },
        { id: 'task-3', text: 'Desenvolver nova tela', color: 'blue', isPlaceholder: false },
        { id: 'task-4', text: 'Corrigir bugs na API', color: 'yellow', isPlaceholder: false },
    ]);
    
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
                <div className="mb-8 flex flex-wrap md:flex-nowrap items-start justify-between gap-6">
                    <div className="flex-grow">
                        <p className="text-gray-500 text-sm">Olá,</p>
                        <h1 className="text-3xl font-bold text-gray-800">Marcelly Pereira</h1>
                        <p className="text-sm text-gray-600 mt-1">terça-feira, 15 de abril de 2025 às 18:01</p>
                        
                        <div className="mt-4 p-4 bg-white rounded-xl shadow-sm w-fit">
                            <div className="flex items-center">
                                <span className="text-blue-500 mr-2">✨</span>
                                <span className="text-gray-600 text-sm">Um passo de cada vez, sempre em frente!</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Pontos de atenção</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Base de clientes</h3>
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
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Tarefas Pendentes</h3>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-gray-800">0</span>
                                <div className="flex justify-between mt-4 text-xs">
                                    <div className="text-center">
                                        <div className="w-8 h-1 bg-red-500 mx-auto mb-1 rounded-full"></div>
                                        <span className="text-gray-500">0 vencidas</span>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-8 h-1 bg-cyan-500 mx-auto mb-1 rounded-full"></div>
                                        <span className="text-gray-500">0 hoje</span>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-8 h-1 bg-yellow-500 mx-auto mb-1 rounded-full"></div>
                                        <span className="text-gray-500">0 a vencer</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Prioridades</h3>
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Tarefas que geram multas:</span>
                                    <span className="text-gray-800 font-medium">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Tarefas atrasadas:</span>
                                    <span className="text-gray-800 font-medium">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">E-mails com falha:</span>
                                    <span className="text-gray-800 font-medium">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Tarefas para a semana</h2>
                    
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex mb-6 space-x-4">
                            {Object.entries(dayTitles).map(([day, title]) => (
                                <div className="flex-1" key={day}>
                                    <div className={`${day === 'terca' ? 'bg-indigo-900' : 'bg-indigo-700'} text-white p-3 rounded-xl flex justify-between items-center`}>
                                        <span className="font-medium">{title}</span>
                                        <span className={`text-xs bg-white ${day === 'terca' ? 'text-indigo-900' : 'text-indigo-700'} px-2 py-1 rounded-full font-medium`}>{dateMappings[day]}</span>
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
                                    availableTasks={availableTasks}
                                    setAvailableTasks={setAvailableTasks}
                                />
                            ))}
                        </div>
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
                                <FiRefreshCw className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="border-b border-gray-100">
                            <div className="flex justify-between items-center p-4">
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700">Controle de Desenvolvimento</span>
                                    <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded">Não categorizado</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="border-b border-gray-100">
                            <div className="flex justify-between items-center p-4">
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-700">Solicitações de Suporte</span>
                                    <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded">Não categorizado</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

const DayColumn = ({ day, dayTitle, tasks, setTasks, availableTasks, setAvailableTasks }) => {
    const [active, setActive] = useState(false);
    
    const handleDragStart = (e, task, index) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.setData("sourceDay", day);
        e.dataTransfer.setData("sourceIndex", index);
        e.dataTransfer.setData("taskType", "column");
    };
        
    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };
    
    const handleDragLeave = () => {
        setActive(false);
    };
    
    const handleDrop = (e, slotIndex) => {
        e.preventDefault();
        
        const taskId = e.dataTransfer.getData("taskId");
        const taskType = e.dataTransfer.getData("taskType");
        const sourceDay = e.dataTransfer.getData("sourceDay");
        const sourceIndex = e.dataTransfer.getData("sourceIndex");
        
        setActive(false);
        
        let updatedTasks = { ...tasks };
        let updatedAvailableTasks = [...availableTasks];
        
        if (taskType === "available") {
            const taskToMove = updatedAvailableTasks.find(t => t.id === taskId);
            
            if (!taskToMove) return;
            
            if (updatedTasks[day][slotIndex].isPlaceholder) {
                const placeholderId = updatedTasks[day][slotIndex].id;
                
                updatedTasks[day][slotIndex] = {
                    ...taskToMove,
                    id: placeholderId 
                };
                
                updatedAvailableTasks = updatedAvailableTasks.filter(t => t.id !== taskId);
                
                setTasks(updatedTasks);
                setAvailableTasks(updatedAvailableTasks);
            }
        } 
        else if (taskType === "column") {
            if (sourceDay !== day || parseInt(sourceIndex) !== slotIndex) {
                const sourceTask = { ...updatedTasks[sourceDay][parseInt(sourceIndex)] };
                
                if (updatedTasks[day][slotIndex].isPlaceholder) {
                    const placeholderId = updatedTasks[day][slotIndex].id;
                    const sourceId = sourceTask.id;
                    
                    updatedTasks[day][slotIndex] = {
                        ...sourceTask,
                        id: placeholderId 
                    };
                    
                    updatedTasks[sourceDay][parseInt(sourceIndex)] = {
                        id: sourceId,
                        text: 'Arraste uma tarefa para aqui',
                        isPlaceholder: true
                    };
                } 
                else {
                    const temp = { ...updatedTasks[day][slotIndex] };
                    updatedTasks[day][slotIndex] = sourceTask;
                    updatedTasks[sourceDay][parseInt(sourceIndex)] = temp;
                }
                
                setTasks(updatedTasks);
            }
        }
    };
    
    const dayTasks = tasks[day];
    
    return (
        <div className="space-y-1">
            <div
                className={`min-h-40 overflow-y-auto overflow-x-hidden transition-colors ${
                    active 
                        ? 'bg-blue-50/50 border border-dashed border-blue-200 rounded-lg' 
                        : 'bg-gray-50/0'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {dayTasks.map((task, index) => (
                    <div 
                        key={task.id}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <TaskCard 
                            task={task} 
                            day={day}
                            index={index}
                            handleDragStart={handleDragStart} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const TaskCard = ({ task, day, index, handleDragStart }) => {
    if (task.isPlaceholder) {
        return (
            <motion.div 
                layout
                layoutId={task.id}
                className="p-3 my-2 bg-gray-50 border border-dashed border-gray-200 rounded-lg text-center text-gray-400 text-sm"
            >
                <div className="flex items-center justify-center">
                    <span>Tarefa</span>
                </div>
            </motion.div>
        );
    }
    return (
        <motion.div 
            layout
            layoutId={task.id}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, task, index)}
            className={`p-3 my-2 z-10 ${
                task.color === 'blue' 
                    ? 'bg-blue-50 border border-blue-100 text-blue-800 font-medium' 
                    : task.color === 'green'
                    ? 'bg-green-50 border border-green-100 text-green-800 font-medium'
                    : task.color === 'red'
                    ? 'bg-red-50 border border-red-100 text-red-800 font-medium'
                    : task.color === 'yellow'
                    ? 'bg-yellow-50 border border-yellow-100 text-yellow-800 font-medium'
                    : 'bg-white border border-gray-100 text-gray-700'
            } rounded-lg cursor-grab active:cursor-grabbing hover:shadow-md transition-all`}
            style={{ position: 'relative' }}
        >
            <div className="flex items-center justify-center">
                <span className="text-sm text-center">{task.text}</span>
            </div>
        </motion.div>
    );
};

export default Home;