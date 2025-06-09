import React, { useState } from 'react';
import BaseLayout from '../app/BaseLayout';
import { motion } from 'framer-motion';
import {
  FiRefreshCw,
  FiCalendar,
  FiTrendingUp,
  FiUser,
  FiSettings,
  FiPlus,
  FiTarget,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiAlertTriangle,
  FiActivity,
} from 'react-icons/fi';

const Home = () => {
  const [tasks, setTasks] = useState({
    segunda: [
      { id: 'seg-1', text: '', isPlaceholder: true },
      { id: 'seg-2', text: '', isPlaceholder: true },
    ],
    terca: [
      {
        id: 'ter-1',
        text: 'Tela de Recorrências',
        color: 'blue',
        isPlaceholder: false,
      },
      { id: 'ter-2', text: '', isPlaceholder: true },
    ],
    quarta: [
      { id: 'qua-1', text: '', isPlaceholder: true },
      { id: 'qua-2', text: '', isPlaceholder: true },
    ],
    quinta: [
      {
        id: 'qui-1',
        text: 'Estilizar transição de botões',
        color: 'blue',
        isPlaceholder: false,
      },
      { id: 'qui-2', text: '', isPlaceholder: true },
    ],
    sexta: [
      { id: 'sex-1', text: '', isPlaceholder: true },
      { id: 'sex-2', text: '', isPlaceholder: true },
    ],
  });

  const [availableTasks, setAvailableTasks] = useState([
    {
      id: 'task-1',
      text: 'Implementar autenticação',
      color: 'blue',
      isPlaceholder: false,
    },
    {
      id: 'task-2',
      text: 'Revisar código de produção',
      color: 'orange',
      isPlaceholder: false,
    },
    {
      id: 'task-3',
      text: 'Desenvolver nova tela',
      color: 'green',
      isPlaceholder: false,
    },
    {
      id: 'task-4',
      text: 'Corrigir bugs na API',
      color: 'red',
      isPlaceholder: false,
    },
  ]);

  const dayTitles = {
    segunda: 'Seg',
    terca: 'Ter',
    quarta: 'Qua',
    quinta: 'Qui',
    sexta: 'Sex',
  };

  const dateMappings = {
    segunda: '14',
    terca: '15',
    quarta: '16',
    quinta: '17',
    sexta: '18',
  };

  // Dados para os gráficos
  const clientsData = [520, 580, 620, 590, 640, 651];
  const maxClients = Math.max(...clientsData);

  const tasksData = [
    { name: 'Vencidas', value: 572, color: 'bg-red-500' },
    { name: 'Hoje', value: 0, color: 'bg-blue-500' },
    { name: 'A Vencer', value: 1109, color: 'bg-orange-500' },
  ];
  const maxTasks = Math.max(...tasksData.map((t) => t.value));

  const priorityData = [
    { name: 'Alta', value: 15, color: 'bg-red-400' },
    { name: 'Média', value: 28, color: 'bg-orange-400' },
    { name: 'Baixa', value: 45, color: 'bg-green-400' },
    { name: 'Sem Prioridade', value: 12, color: 'bg-gray-400' },
  ];
  const totalPriority = priorityData.reduce((sum, item) => sum + item.value, 0);

  return (
    <BaseLayout title="Dashboard">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Charts Grid Minimalistas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Base de Clientes */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: '#22c55e' }}
                    className="p-2 rounded-lg"
                  >
                    <FiUsers className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-sm font-medium">
                      Base de Clientes
                    </h3>
                    <div className="text-2xl font-bold text-gray-900">651</div>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                  +5.2%
                </div>
              </div>

              {/* Gráfico de linha minimalista */}
              <div className="h-12 relative">
                <svg width="100%" height="100%" className="overflow-visible">
                  <motion.polyline
                    points={clientsData
                      .map(
                        (value, index) =>
                          `${(index / (clientsData.length - 1)) * 100},${
                            100 - (value / maxClients) * 100
                          }`,
                      )
                      .join(' ')}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Pontos na linha */}
                  {clientsData.map((value, index) => (
                    <motion.circle
                      key={index}
                      cx={`${(index / (clientsData.length - 1)) * 100}%`}
                      cy={`${100 - (value / maxClients) * 100}%`}
                      r="2"
                      fill="#22c55e"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    />
                  ))}
                </svg>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Jan</span>
                <span>Jun</span>
              </div>
            </div>

            {/* Tarefas Pendentes */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: '#3b82f6' }}
                    className="p-2 rounded-lg"
                  >
                    <FiCalendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-sm font-medium">
                      Tarefas Pendentes
                    </h3>
                    <div className="text-2xl font-bold text-gray-900">1681</div>
                  </div>
                </div>
              </div>

              {/* Barras de tarefas */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Vencidas</span>
                    <span className="text-sm font-bold text-gray-900">572</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '70%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-2 rounded-full bg-red-500"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Hoje</span>
                    <span className="text-sm font-bold text-gray-900">0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-blue-500 w-0"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">A Vencer</span>
                    <span className="text-sm font-bold text-gray-900">
                      1109
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-2 rounded-full bg-orange-500"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prioridades */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: '#3C0F55' }}
                    className="p-2 rounded-lg"
                  >
                    <FiTarget className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 text-sm font-medium">
                      Prioridades
                    </h3>
                    <div className="text-2xl font-bold text-gray-900">100</div>
                  </div>
                </div>
              </div>

              {/* Grid de prioridades 2x2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-red-600">15</span>
                  </div>
                  <div className="text-xs text-gray-600">Alta</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">
                      28
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">Média</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">45</span>
                  </div>
                  <div className="text-xs text-gray-600">Baixa</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">12</span>
                  </div>
                  <div className="text-xs text-gray-600">Sem Prioridade</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Overview Minimalista */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">
                      Planejamento Semanal
                    </h2>
                    <div className="flex items-center space-x-3">
                      <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Esta semana</option>
                        <option>Próxima semana</option>
                      </select>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                        <FiRefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    {Object.entries(dayTitles).map(([day, title]) => (
                      <div key={day} className="text-center">
                        <div className="text-xs font-medium text-gray-500 mb-2">
                          {title}
                        </div>
                        <div
                          className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                            day === 'terca'
                              ? 'text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          style={
                            day === 'terca'
                              ? { backgroundColor: '#3C0F55' }
                              : {}
                          }
                        >
                          {dateMappings[day]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {Object.keys(tasks).map((day) => (
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

            {/* Sidebar Minimalista */}
            <div className="space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Progresso do Mês
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">
                        Desenvolvimento
                      </span>
                      <span className="font-bold text-gray-900">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ backgroundColor: '#3C0F55' }}
                        className="h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">Design</span>
                      <span className="font-bold text-gray-900">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="bg-green-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">Testes</span>
                      <span className="font-bold text-gray-900">40%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '40%' }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="bg-orange-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Tasks */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Tarefas Disponíveis
                  </h3>
                  <button
                    style={{ color: '#3C0F55' }}
                    className="text-sm hover:opacity-70 font-semibold flex items-center gap-1 transition-colors"
                  >
                    + Ver todas
                  </button>
                </div>
                <div className="space-y-3">
                  {availableTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <AvailableTaskCard task={task} />
                    </motion.div>
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

const DayColumn = ({
  day,
  tasks,
  setTasks,
  availableTasks,
  setAvailableTasks,
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, task, index) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('sourceDay', day);
    e.dataTransfer.setData('sourceIndex', index);
    e.dataTransfer.setData('taskType', 'column');
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

    const taskId = e.dataTransfer.getData('taskId');
    const taskType = e.dataTransfer.getData('taskType');
    const sourceDay = e.dataTransfer.getData('sourceDay');
    const sourceIndex = e.dataTransfer.getData('sourceIndex');

    setActive(false);

    let updatedTasks = { ...tasks };
    let updatedAvailableTasks = [...availableTasks];

    if (taskType === 'available') {
      const taskToMove = updatedAvailableTasks.find((t) => t.id === taskId);

      if (!taskToMove) return;

      if (updatedTasks[day][slotIndex].isPlaceholder) {
        const placeholderId = updatedTasks[day][slotIndex].id;

        updatedTasks[day][slotIndex] = {
          ...taskToMove,
          id: placeholderId,
        };

        updatedAvailableTasks = updatedAvailableTasks.filter(
          (t) => t.id !== taskId,
        );

        setTasks(updatedTasks);
        setAvailableTasks(updatedAvailableTasks);
      }
    } else if (taskType === 'column') {
      if (sourceDay !== day || parseInt(sourceIndex) !== slotIndex) {
        const sourceTask = {
          ...updatedTasks[sourceDay][parseInt(sourceIndex)],
        };

        if (updatedTasks[day][slotIndex].isPlaceholder) {
          const placeholderId = updatedTasks[day][slotIndex].id;
          const sourceId = sourceTask.id;

          updatedTasks[day][slotIndex] = {
            ...sourceTask,
            id: placeholderId,
          };

          updatedTasks[sourceDay][parseInt(sourceIndex)] = {
            id: sourceId,
            text: '',
            isPlaceholder: true,
          };
        } else {
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
    <div className="space-y-3">
      <div
        className={`min-h-40 p-3 transition-all duration-300 rounded-xl ${
          active
            ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-300 shadow-lg'
            : 'bg-slate-50/50 border border-slate-200'
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
      <div className="h-10 mb-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center group hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
        <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-blue-400 transition-colors"></div>
      </div>
    );
  }

  const colorClasses = {
    blue: 'text-white shadow-sm hover:shadow-md',
    green: 'bg-green-500 text-white shadow-sm hover:shadow-md',
    red: 'bg-red-500 text-white shadow-sm hover:shadow-md',
    orange: 'bg-orange-500 text-white shadow-sm hover:shadow-md',
  };

  return (
    <motion.div
      layout
      layoutId={task.id}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, task, index)}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 0.95, rotate: 2 }}
      className={`p-3 mb-3 rounded-lg text-sm font-medium cursor-grab active:cursor-grabbing transition-all duration-200 ${
        colorClasses[task.color] ||
        'bg-white border border-gray-200 text-gray-700 shadow-sm hover:shadow-md'
      }`}
      style={task.color === 'blue' ? { backgroundColor: '#3C0F55' } : {}}
    >
      {task.text}
    </motion.div>
  );
};

const AvailableTaskCard = ({ task }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('taskType', 'available');
  };

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    red: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
    orange:
      'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
  };

  return (
    <motion.div
      draggable={true}
      onDragStart={handleDragStart}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 0.95 }}
      className={`p-3 rounded-lg text-sm font-medium cursor-grab active:cursor-grabbing transition-all duration-200 border ${
        colorClasses[task.color] ||
        'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
      }`}
    >
      {task.text}
    </motion.div>
  );
};

export default Home;
