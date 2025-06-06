import React, { useState } from 'react';
import BaseLayout from '../app/BaseLayout';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiCalendar, FiTrendingUp, FiUser, FiSettings } from 'react-icons/fi';

const Home = () => {
    const [tasks, setTasks] = useState({
        segunda: [
            { id: 'seg-1', text: '', isPlaceholder: true },
            { id: 'seg-2', text: '', isPlaceholder: true },
        ],
        terca: [
            { id: 'ter-1', text: 'Tela de Recorrências', color: 'blue', isPlaceholder: false },
            { id: 'ter-2', text: '', isPlaceholder: true },
        ],
        quarta: [
            { id: 'qua-1', text: '', isPlaceholder: true },
            { id: 'qua-2', text: '', isPlaceholder: true },
        ],
        quinta: [
            { id: 'qui-1', text: 'Estilizar transição de botões', color: 'blue', isPlaceholder: false },
            { id: 'qui-2', text: '', isPlaceholder: true },
        ],
        sexta: [
            { id: 'sex-1', text: '', isPlaceholder: true },
            { id: 'sex-2', text: '', isPlaceholder: true },
        ],
    });
    
    const [availableTasks, setAvailableTasks] = useState([
        { id: 'task-1', text: 'Implementar autenticação', color: 'blue', isPlaceholder: false },
        { id: 'task-2', text: 'Revisar código de produção', color: 'orange', isPlaceholder: false },
        { id: 'task-3', text: 'Desenvolver nova tela', color: 'green', isPlaceholder: false },
        { id: 'task-4', text: 'Corrigir bugs na API', color: 'red', isPlaceholder: false },
    ]);
    
    const dayTitles = {
        segunda: "Seg",
        terca: "Ter",
        quarta: "Qua",
        quinta: "Qui",
        sexta: "Sex"
    };
    
    const dateMappings = {
        segunda: "14",
        terca: "15",
        quarta: "16",
        quinta: "17",
        sexta: "18"
    };
    
    return (
        <BaseLayout title='Dashboard'>
                <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                                <div className="text-sm text-gray-500">
                                    Sua visão geral de tarefas
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-600">
                                    22 Jan - 28 Fev 2025
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                    Exportar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-600">Tarefas Concluídas</h3>
                                <div className="text-green-600 text-sm font-medium">+5%</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">24</div>
                            <div className="text-xs text-gray-500 mt-1">+3% vs mês anterior</div>
                        </div>
    
                        <div className="bg-white p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-600">Em Progresso</h3>
                                <div className="text-blue-600 text-sm font-medium">+2%</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">8</div>
                            <div className="text-xs text-gray-500 mt-1">-2% vs mês anterior</div>
                        </div>
    
                        <div className="bg-white p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-600">Pendentes</h3>
                                <div className="text-orange-600 text-sm font-medium">-6%</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">12</div>
                            <div className="text-xs text-gray-500 mt-1">-4% vs mês anterior</div>
                        </div>
    
                        <div className="bg-white p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-600">Projetos</h3>
                                <div className="text-green-600 text-sm font-medium">+8%</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">6</div>
                            <div className="text-xs text-gray-500 mt-1">+1 novo projeto</div>
                        </div>
                    </div>
    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Weekly Overview */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">Planejamento Semanal</h2>
                                        <div className="flex items-center space-x-2">
                                            <select className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-white">
                                                <option>Esta semana</option>
                                                <option>Próxima semana</option>
                                            </select>
                                            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50">
                                                <FiRefreshCw className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
    
                                <div className="p-6">
                                    <div className="grid grid-cols-5 gap-4 mb-6">
                                        {Object.entries(dayTitles).map(([day, title]) => (
                                            <div key={day} className="text-center">
                                                <div className="text-xs font-medium text-gray-500 mb-1">{title}</div>
                                                <div className={`text-sm font-semibold ${day === 'terca' ? 'text-blue-600' : 'text-gray-900'}`}>
                                                    {dateMappings[day]}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
    
                                    <div className="grid grid-cols-5 gap-4">
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
                        </div>
    
                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Progress Card */}
                            <div className="bg-white rounded-lg border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso do Mês</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Desenvolvimento</span>
                                            <span className="font-medium">75%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Design</span>
                                            <span className="font-medium">60%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Testes</span>
                                            <span className="font-medium">40%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-orange-500 h-2 rounded-full" style={{width: '40%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            {/* Available Tasks */}
                            <div className="bg-white rounded-lg border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Tarefas Disponíveis</h3>
                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                        Ver todas
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {availableTasks.map(task => (
                                        <AvailableTaskCard key={task.id} task={task} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>

    );
};

const DayColumn = ({ day, tasks, setTasks, availableTasks, setAvailableTasks }) => {
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
                        text: '',
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
        <div className="space-y-2">
            <div
                className={`min-h-32 transition-colors rounded-lg ${
                    active 
                        ? 'bg-blue-50 border-2 border-dashed border-blue-200' 
                        : 'bg-gray-50'
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
            <div className="h-8 mb-2 bg-gray-100 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
        );
    }
    
    const colorClasses = {
        blue: 'bg-blue-100 border-blue-200 text-blue-800',
        green: 'bg-green-100 border-green-200 text-green-800',
        red: 'bg-red-100 border-red-200 text-red-800',
        orange: 'bg-orange-100 border-orange-200 text-orange-800'
    };
    
    return (
        <motion.div 
            layout
            layoutId={task.id}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, task, index)}
            className={`p-2 mb-2 rounded-md text-xs font-medium cursor-grab active:cursor-grabbing hover:shadow-sm transition-all border ${
                colorClasses[task.color] || 'bg-white border-gray-200 text-gray-700'
            }`}
        >
            {task.text}
        </motion.div>
    );
};

const AvailableTaskCard = ({ task }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.setData("taskType", "available");
    };
    
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        green: 'bg-green-50 text-green-700 border-green-200',
        red: 'bg-red-50 text-red-700 border-red-200',
        orange: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    
    return (
        <div
            draggable={true}
            onDragStart={handleDragStart}
            className={`p-3 rounded-lg text-sm font-medium cursor-grab active:cursor-grabbing hover:shadow-sm transition-all border ${
                colorClasses[task.color] || 'bg-gray-50 text-gray-700 border-gray-200'
            }`}
        >
            {task.text}
        </div>
    );
};

export default Home;